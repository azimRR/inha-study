/* sem_shm.h — the Week 6 and Week 7 toolkit: semaphores that work BETWEEN PROCESSES.
 *
 * Why this header exists.  Every textbook prints
 *
 *     sem_init(&s, 0, 1);          <-- that 0 is pshared
 *
 * and that lock locks NOTHING between processes: pshared 0 means "threads of one
 * process only", and after fork() each child gets its own private copy of the
 * semaphore.  This course does the process edition, so every semaphore here is
 *
 *     sem_init(s, 1, value);       <-- pshared 1, in shared memory
 *
 * and it must live in memory that fork() shares instead of copying.  That is what
 * shm_alloc() provides: one anonymous MAP_SHARED mapping, inherited by every child.
 *
 * Build:  gcc -Wall -Wextra -std=gnu11 -o prog prog.c -lrt -pthread
 * Linux only: macOS does not implement unnamed POSIX semaphores (sem_init fails
 * with ENOSYS), so all of Weeks 6 and 7 runs in the course container.
 */
#ifndef SEM_SHM_H
#define SEM_SHM_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <time.h>
#include <unistd.h>
#include <semaphore.h>
#include <sys/mman.h>
#include <sys/wait.h>

/* die — one-line fatal error, so the demos stay short. */
#define die(msg) do { perror(msg); exit(EXIT_FAILURE); } while (0)

/* unbuffer — a forked child inherits a COPY of the stdout buffer, which duplicates
 * buffered lines and hides interleaving.  Every demo calls this first. */
static inline void unbuffer(void) { setvbuf(stdout, NULL, _IONBF, 0); }

/* nap_ms — sleep for that many milliseconds.  The course does not use usleep(3):
 * POSIX removed it in 2008.  Short naps widen a race window so a bug is visible. */
static inline void nap_ms(long ms)
{
    struct timespec t = { .tv_sec = ms / 1000, .tv_nsec = (ms % 1000) * 1000000L };
    nanosleep(&t, NULL);
}

/* shm_alloc — n bytes of memory that fork() SHARES instead of copying.
 * MAP_ANONYMOUS: no file behind it.  MAP_SHARED: writes are visible to children. */
static inline void *shm_alloc(size_t n)
{
    void *p = mmap(NULL, n, PROT_READ | PROT_WRITE,
                   MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (p == MAP_FAILED) die("mmap");
    memset(p, 0, n);
    return p;
}

/* sem_new — one process-shared semaphore, in shared memory, initial value `value`. */
static inline sem_t *sem_new(unsigned value)
{
    sem_t *s = shm_alloc(sizeof *s);
    if (sem_init(s, 1, value) == -1) die("sem_init");   /* 1 = shared between processes */
    return s;
}

/* sem_wait_r — sem_wait is NOT restarted by SA_RESTART: a stray signal makes it
 * return -1/EINTR, which looks exactly like a broken program.  Always use this. */
static inline void sem_wait_r(sem_t *s)
{
    while (sem_wait(s) == -1) {
        if (errno != EINTR) die("sem_wait");
    }
}
static inline void sem_post_c(sem_t *s) { if (sem_post(s) == -1) die("sem_post"); }

/* A barrier for processes: nobody passes until all n have arrived.
 * Built from the course's own pieces — a mutex, a counter and a turnstile — because
 * that is the pattern (Week 6), not because a library was unavailable. */
typedef struct { sem_t *mutex, *turnstile; int *count; int n; } barrier_t;

static inline barrier_t *barrier_new(int n)
{
    barrier_t *b = shm_alloc(sizeof *b);
    b->mutex = sem_new(1);
    b->turnstile = sem_new(0);
    b->count = shm_alloc(sizeof *b->count);
    b->n = n;
    return b;
}

static inline void barrier_wait(barrier_t *b)
{
    sem_wait_r(b->mutex);
    (*b->count)++;
    int last = (*b->count == b->n);
    sem_post_c(b->mutex);

    if (last)                                   /* the last arrival opens the gate */
        for (int i = 0; i < b->n; i++) sem_post_c(b->turnstile);
    sem_wait_r(b->turnstile);                   /* everyone waits here */
}

/* reap_all — wait for every child; returns how many were reaped. */
static inline int reap_all(void)
{
    int n = 0;
    while (wait(NULL) > 0) n++;
    return n;
}

#endif /* SEM_SHM_H */
