#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
static void h(int s) { (void)s; write(1, "  [SIGALRM handler]\n", 20); }
int main(int argc, char **argv) {
    int restart = (argc > 1);
    struct sigaction sa = {0};
    sa.sa_handler = h; sigemptyset(&sa.sa_mask);
    sa.sa_flags = restart ? SA_RESTART : 0;
    sigaction(SIGALRM, &sa, NULL);
    int p[2]; pipe(p);
    if (fork() == 0) { close(p[0]); sleep(2); write(p[1], "x", 1); _exit(0); }
    close(p[1]);
    alarm(1);                                   /* SIGALRM at t=1s; data arrives at t=2s */
    char c; ssize_t n = read(p[0], &c, 1);      /* blocks on an empty pipe ("slow" device) */
    if (n < 0) printf("%s: read returned -1, errno=%s\n", restart ? "SA_RESTART" : "no SA_RESTART", strerror(errno));
    else       printf("%s: read returned %zd byte ('%c')\n", restart ? "SA_RESTART" : "no SA_RESTART", n, c);
    wait(NULL);
    return 0;
}
