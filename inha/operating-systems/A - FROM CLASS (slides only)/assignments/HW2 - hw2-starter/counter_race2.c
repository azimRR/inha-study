/* counter_race2.c — two processes, one shared counter, NO lock */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include "shared_mem.h"

#define N 1000000

int main(void) {
    long *counter = shared_alloc(sizeof(long));  /* seen by parent AND child */
    *counter = 0;

    pid_t pid = fork();

    for (int i = 0; i < N; i++)
        (*counter)++;                  /* BOTH processes run this loop */

    if (pid == 0) exit(0);             /* child: done */
    wait(NULL);                        /* parent: wait for the child */
    printf("expected %d, got %ld\n", 2 * N, *counter);
    return 0;
}
