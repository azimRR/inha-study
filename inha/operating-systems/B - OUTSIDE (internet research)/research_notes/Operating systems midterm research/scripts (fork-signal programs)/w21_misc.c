#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
static void alrm(int s) { (void)s; }
static volatile sig_atomic_t got_pid = 0, got_status = -1;
static void chld(int s, siginfo_t *si, void *ctx) { (void)s; (void)ctx; got_pid = si->si_pid; got_status = si->si_status; }
int main(void) {
    /* 1. alarm() returns seconds left on the previous alarm */
    alarm(5); sleep(1);
    printf("alarm(0) after 1s returned %u (seconds left on old alarm)\n", alarm(0));
    /* 2. pause() returns -1/EINTR only after a handler runs */
    signal(SIGALRM, alrm); alarm(1);
    int r = pause();
    printf("pause() returned %d, errno=%s\n", r, strerror(errno));
    /* 3. SA_SIGINFO: handler learns which child and its exit status */
    struct sigaction sa = {0};
    sa.sa_sigaction = chld; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_SIGINFO | SA_RESTART;
    sigaction(SIGCHLD, &sa, NULL);
    pid_t c = fork(); if (c == 0) _exit(42);
    sleep(1);
    printf("SA_SIGINFO: child pid %d, si_pid=%d, si_status=%d\n", (int)c, (int)got_pid, (int)got_status);
    waitpid(c, NULL, 0);
    /* 4. SIGCHLD = SIG_IGN -> children are auto-reaped (no zombies); wait() fails with ECHILD */
    signal(SIGCHLD, SIG_IGN);
    c = fork(); if (c == 0) _exit(0);
    sleep(1);
    char cmd[80]; snprintf(cmd, sizeof cmd, "ps -o pid,stat,comm -p %d | tail -n +2 | wc -l", (int)c);
    printf("SIG_IGN: zombie rows for child in ps = "); fflush(stdout); system(cmd);
    signal(SIGCHLD, SIG_IGN);  /* (system() restores dispositions; re-assert) */
    r = wait(NULL);
    printf("SIG_IGN: wait() returned %d, errno=%s\n", r, strerror(errno));
    return 0;
}
