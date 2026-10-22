#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
#define N 10
static volatile sig_atomic_t reaped = 0;
static int use_loop;
static void h(int s) {
    (void)s;
    int saved = errno;                        /* G2: save/restore errno */
    if (use_loop) {
        while (waitpid(-1, NULL, WNOHANG) > 0) reaped++;   /* correct: reap ALL that are ready */
    } else {
        if (waitpid(-1, NULL, WNOHANG) > 0) reaped++;      /* BUG: one reap per signal */
    }
    errno = saved;
}
int main(int argc, char **argv) {
    use_loop = (argc > 1);
    struct sigaction sa = {0};
    sa.sa_handler = h; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART;
    sigaction(SIGCHLD, &sa, NULL);
    for (int i = 0; i < N; i++)
        if (fork() == 0) _exit(0);            /* children die almost simultaneously */
    sleep(1); sleep(1);                        /* give signals time to arrive (sleep may return early) */
    int zombies = 0;
    while (waitpid(-1, NULL, WNOHANG) > 0) zombies++;  /* clean up leftovers */
    printf("%s handler: reaped in handler = %d, left as zombies = %d\n",
           use_loop ? "loop" : "buggy", (int)reaped, zombies);
    return 0;
}
