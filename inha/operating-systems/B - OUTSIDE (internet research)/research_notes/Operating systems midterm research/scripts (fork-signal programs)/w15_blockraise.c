#include <stdio.h>
#include <signal.h>
#include <unistd.h>
static volatile sig_atomic_t hits = 0;
static void h(int s) { (void)s; hits++; }
int main(void) {
    struct sigaction sa = {0};
    sa.sa_handler = h; sigemptyset(&sa.sa_mask);
    sigaction(SIGINT, &sa, NULL);
    sigset_t m, old, pend;
    sigemptyset(&m); sigaddset(&m, SIGINT);
    sigprocmask(SIG_BLOCK, &m, &old);
    raise(SIGINT); raise(SIGINT); raise(SIGINT);   /* 3 sends while blocked */
    sigpending(&pend);
    printf("pending? %d  hits so far = %d\n", sigismember(&pend, SIGINT), (int)hits);
    sigprocmask(SIG_SETMASK, &old, NULL);          /* unblock: delivered ONCE, before sigprocmask returns */
    printf("hits after unblock = %d\n", (int)hits);
    return 0;
}
