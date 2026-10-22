#include <stdio.h>
#include <errno.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
#define N 10
static volatile sig_atomic_t reaped = 0, calls = 0;
static int use_loop;
static void h(int s) {
    (void)s; int saved = errno; calls++;
    if (use_loop) { while (waitpid(-1, NULL, WNOHANG) > 0) reaped++; }
    else          { if (waitpid(-1, NULL, WNOHANG) > 0) reaped++; }
    errno = saved;
}
int main(int argc, char **argv) {
    use_loop = (argc > 1);
    struct sigaction sa = {0};
    sa.sa_handler = h; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART;
    sigaction(SIGCHLD, &sa, NULL);
    sigset_t m, old; sigemptyset(&m); sigaddset(&m, SIGCHLD);
    sigprocmask(SIG_BLOCK, &m, &old);           /* SIGCHLD blocked while children die */
    for (int i = 0; i < N; i++) if (fork() == 0) _exit(0);
    sleep(1);                                   /* all 10 have exited -> 10 SIGCHLDs -> ONE pending bit */
    sigprocmask(SIG_SETMASK, &old, NULL);       /* handler runs exactly once here */
    int zombies = 0; while (waitpid(-1, NULL, WNOHANG) > 0) zombies++;
    printf("%s: handler calls=%d reaped=%d zombies left=%d\n", use_loop ? "loop " : "buggy", (int)calls, (int)reaped, zombies);
    return 0;
}
