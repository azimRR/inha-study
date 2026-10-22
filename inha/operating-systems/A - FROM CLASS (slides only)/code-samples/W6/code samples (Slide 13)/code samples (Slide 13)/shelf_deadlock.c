/* shelf_deadlock.c — shelf.c with the cook's two waits swapped, 1-plate shelf */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"

#define N 1                            /* the shelf has room for 1 plate */
struct shelf {
    sem_t empty, full, mutex;          /* free slots, plates waiting, the key */
    int in, out;                       /* next slot to fill / to empty        */
    int slot[N];                       /* each slot holds one plate number    */
};
struct shelf *s; int *seen;            /* seen[p] = times plate p was served */

void cook(int first, int last) {       /* cooks plates first ... last */
    for (int p = first; p <= last; p++) {
        sem_wait(&s->mutex);           /* BUG: take the key first ...  */
        sem_wait(&s->empty);           /* ... then sleep holding it    */
        s->slot[s->in] = p;            /* put the plate             */
        s->in = (s->in + 1) % N;       /* ring: after N-1 comes 0   */
        sem_post(&s->mutex);           /* give the key back         */
        sem_post(&s->full);            /* one more plate is waiting */
    }
}

void waiter(int plates) {              /* serves this many plates */
    for (int i = 0; i < plates; i++) {
        sem_wait(&s->full);            /* wait for a plate          */
        sem_wait(&s->mutex);           /* take the key              */
        int p = s->slot[s->out];       /* take the plate            */
        s->out = (s->out + 1) % N;
        sem_post(&s->mutex);           /* give the key back         */
        sem_post(&s->empty);           /* one more free slot        */
        seen[p]++;                     /* tick plate p on the list  */
    }
}

int main(int argc, char *argv[]) {     /* ./shelf NPLATES [COOKS WAITERS] */
    int n       = argc > 1 ? atoi(argv[1]) : 100000;   /* atoi: "100" -> 100 */
    int cooks   = argc > 2 ? atoi(argv[2]) : 1;
    int waiters = argc > 3 ? atoi(argv[3]) : 1;
    s = shared_alloc(sizeof(struct shelf));      /* before fork: all see it */
    seen = shared_alloc((n + 1) * sizeof(int));  /* all 0 at the start */
    sem_init(&s->empty, 1, N);         /* N free slots              */
    sem_init(&s->full,  1, 0);         /* no plate yet              */
    sem_init(&s->mutex, 1, 1);         /* the key is on its hook    */
    for (int k = 0; k < cooks; k++)    /* cook k: his own plate numbers */
        if (fork() == 0) { cook(k*n/cooks + 1, (k+1)*n/cooks); exit(0); }
    for (int j = 0; j < waiters; j++)  /* waiter j: his share of the n plates */
        if (fork() == 0) { waiter((j+1)*n/waiters - j*n/waiters); exit(0); }
    for (int i = 0; i < cooks + waiters; i++) wait(NULL);
    int served = 0, lost = 0, dup = 0;
    for (int p = 1; p <= n; p++)       /* seen 0 times: lost; 2+: duplicated */
        if (seen[p] == 0) lost++; else if (seen[p] == 1) served++; else dup++;
    printf("cooked %d, served %d, lost %d, duplicated %d\n", n, served, lost, dup);
    sem_destroy(&s->empty); sem_destroy(&s->full); sem_destroy(&s->mutex);
    return 0;
}
