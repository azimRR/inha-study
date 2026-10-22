#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
static void h(int s) { (void)s; }
int main(int argc, char **argv) {
    if (argc > 1 && argv[1][0] == '3') { (void)(fork() || fork()); printf("A\n"); while (wait(NULL) > 0) {} return 0; }
    if (argc > 1 && argv[1][0] == '4') { if (fork() && fork()) fork(); printf("B\n"); while (wait(NULL) > 0) {} return 0; }
    struct sigaction sa = {0}; sa.sa_handler = h; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART;
    sigaction(SIGALRM, &sa, NULL);
    alarm(3);
    unsigned left = sleep(10);       /* sleep is never restarted, even with SA_RESTART */
    printf("sleep(10) interrupted at ~3s returned %u\n", left);
    return 0;
}
