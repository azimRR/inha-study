/* pingpong.c — two semaphores force two processes to take turns */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"

struct shared { sem_t ping; sem_t pong; };

int main(void) {
    setvbuf(stdout, NULL, _IONBF, 0);
    struct shared *s = shared_alloc(sizeof(struct shared));
    sem_init(&s->ping, 1, 1);          /* child may go first  */
    sem_init(&s->pong, 1, 0);          /* parent must wait    */

    if (fork() == 0) {                 /* child */
        for (int i = 0; i < 3; i++) {
            sem_wait(&s->ping);
            printf("PING\n");
            sem_post(&s->pong);        /* your turn, parent   */
        }
        exit(0);
    }
    for (int i = 0; i < 3; i++) {      /* parent */
        sem_wait(&s->pong);
        printf("    PONG\n");
        sem_post(&s->ping);            /* your turn, child    */
    }
    wait(NULL);
    return 0;
}
