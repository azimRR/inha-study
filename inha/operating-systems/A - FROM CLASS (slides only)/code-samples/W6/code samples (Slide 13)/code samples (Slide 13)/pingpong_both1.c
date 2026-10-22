/* pingpong_both1.c — the same, but BOTH semaphores start at 1 (broken) */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"

#define ROUNDS 1000                    /* 1000 PING + 1000 PONG = 2000 lines */

struct shared { sem_t ping; sem_t pong; };

int main(void) {
    setvbuf(stdout, NULL, _IOLBF, 0);  /* line buffered: one printed line = one write, so lines never tear */
    struct shared *s = shared_alloc(sizeof(struct shared));
    sem_init(&s->ping, 1, 1);          /* child may go first  */
    sem_init(&s->pong, 1, 1);          /* BUG: parent may go first too */

    if (fork() == 0) {                 /* child */
        for (int i = 0; i < ROUNDS; i++) {
            sem_wait(&s->ping);
            printf("PING\n");
            sem_post(&s->pong);        /* your turn, parent   */
        }
        exit(0);
    }
    for (int i = 0; i < ROUNDS; i++) { /* parent */
        sem_wait(&s->pong);
        printf("    PONG\n");
        sem_post(&s->ping);            /* your turn, child    */
    }
    wait(NULL);
    return 0;
}
