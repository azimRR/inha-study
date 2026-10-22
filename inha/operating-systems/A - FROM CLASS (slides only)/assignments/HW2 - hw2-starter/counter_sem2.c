/* counter_sem2.c — the same counter, protected by a semaphore */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"

#define N 1000000

struct shared {
    sem_t lock;                        /* the padlock ...            */
    long  counter;                     /* ... and what it protects   */
};

int main(void) {
    struct shared *s = shared_alloc(sizeof(struct shared));
    s->counter = 0;
    sem_init(&s->lock, 1, 1);          /* 1: shared by processes, 1: open */

    pid_t pid = fork();

    for (int i = 0; i < N; i++) {
        sem_wait(&s->lock);            /* take the key, or sleep         */
        s->counter++;                  /* critical section               */
        sem_post(&s->lock);            /* give the key back              */
    }

    if (pid == 0) exit(0);
    wait(NULL);
    printf("expected %d, got %ld\n", 2 * N, s->counter);
    sem_destroy(&s->lock);
    return 0;
}
