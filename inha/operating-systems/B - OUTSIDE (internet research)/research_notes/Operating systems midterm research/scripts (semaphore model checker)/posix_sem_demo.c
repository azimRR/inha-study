/* Producer (parent process) / consumer (child process) bounded buffer using
   POSIX NAMED semaphores + an anonymous shared mapping inherited across fork().
   Also probes whether unnamed semaphores (sem_init) work on this OS. */
#include <semaphore.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/wait.h>

#define N 4          /* buffer slots   */
#define ITEMS 20     /* items to pass  */

struct shared { int buf[N]; int fill, use; };

int main(void) {
    /* 1. probe unnamed semaphores */
    sem_t local;
    int r = sem_init(&local, 0, 1);
    printf("sem_init(pshared=0) -> %d%s%s\n", r, r ? " errno=" : "", r ? strerror(errno) : "");
    sem_t *shsem = mmap(NULL, sizeof(sem_t), PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANON, -1, 0);
    r = sem_init(shsem, 1, 0);
    printf("sem_init(pshared=1, in MAP_SHARED memory) -> %d%s%s\n", r, r ? " errno=" : "", r ? strerror(errno) : "");

    /* 2. named semaphores: create fresh ones */
    sem_unlink("/pc_mutex"); sem_unlink("/pc_items"); sem_unlink("/pc_spaces");
    sem_t *mutex  = sem_open("/pc_mutex",  O_CREAT | O_EXCL, 0600, 1);
    sem_t *items  = sem_open("/pc_items",  O_CREAT | O_EXCL, 0600, 0);
    sem_t *spaces = sem_open("/pc_spaces", O_CREAT | O_EXCL, 0600, N);
    if (mutex == SEM_FAILED || items == SEM_FAILED || spaces == SEM_FAILED) { perror("sem_open"); return 1; }

    struct shared *sh = mmap(NULL, sizeof *sh, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANON, -1, 0);
    if (sh == MAP_FAILED) { perror("mmap"); return 1; }
    sh->fill = sh->use = 0;

    fflush(stdout);                       /* avoid duplicating buffered output in the child */
    pid_t pid = fork();
    if (pid == 0) {                       /* child = consumer */
        long sum = 0;
        for (int i = 0; i < ITEMS; i++) {
            sem_wait(items);              /* wait for an item   */
            sem_wait(mutex);
            int x = sh->buf[sh->use]; sh->use = (sh->use + 1) % N;
            sem_post(mutex);
            sem_post(spaces);             /* one more free slot */
            sum += x;
        }
        printf("consumer (pid %d): consumed %d items, sum = %ld (expected %d)\n", getpid(), ITEMS, sum, ITEMS * (ITEMS + 1) / 2);
        fflush(stdout);
        _exit(0);
    }
    for (int i = 1; i <= ITEMS; i++) {    /* parent = producer */
        sem_wait(spaces);                 /* wait for a free slot */
        sem_wait(mutex);
        sh->buf[sh->fill] = i; sh->fill = (sh->fill + 1) % N;
        sem_post(mutex);
        sem_post(items);                  /* announce an item */
    }
    waitpid(pid, NULL, 0);
    sem_close(mutex); sem_close(items); sem_close(spaces);
    sem_unlink("/pc_mutex"); sem_unlink("/pc_items"); sem_unlink("/pc_spaces");
    printf("producer (pid %d): done, named semaphores unlinked\n", getpid());
    return 0;
}
