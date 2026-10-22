/* stools.c — five customers, three stools: the limit pattern */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"

int main(void) {
    setvbuf(stdout, NULL, _IOLBF, 0);  /* line buffered: one printed line = one write, so lines never tear */
    sem_t *stools = shared_alloc(sizeof(sem_t));
    sem_init(stools, 1, 3);            /* 3 free stools at the counter */

    for (int k = 1; k <= 5; k++)
        if (fork() == 0) {             /* customer Ck */
            sem_wait(stools);          /* take a stool, or wait standing */
            printf("C%d sits\n", k);
            sleep(1);                  /* eat */
            printf("C%d leaves\n", k);
            sem_post(stools);          /* the stool is free again */
            exit(0);
        }
    for (int k = 1; k <= 5; k++)
        wait(NULL);                    /* the café closes when all have left */
    sem_destroy(stools);
    return 0;
}
