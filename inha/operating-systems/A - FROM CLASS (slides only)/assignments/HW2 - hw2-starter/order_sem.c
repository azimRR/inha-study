/* order_sem.c — a semaphore that starts at 0 makes B wait for A */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"

int main(void) {
    setvbuf(stdout, NULL, _IONBF, 0);
    sem_t *a_done = shared_alloc(sizeof(sem_t));
    sem_init(a_done, 1, 0);            /* 0: nothing has happened yet */

    if (fork() == 0) {
        sem_wait(a_done);              /* sleep until A is done */
        printf("child:  B (I must come second)\n");
        exit(0);
    }
    sleep(1);                          /* A takes a while to do */
    printf("parent: A (I must come first)\n");
    sem_post(a_done);                  /* A is done: wake B */
    wait(NULL);
    return 0;
}
