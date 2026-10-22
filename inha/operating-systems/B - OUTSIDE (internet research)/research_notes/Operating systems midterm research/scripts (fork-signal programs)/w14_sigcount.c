#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
volatile sig_atomic_t counter = 0;
static void handler(int sig) { (void)sig; counter++; }
int main(void) {
    struct sigaction sa;
    sa.sa_handler = handler; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART;
    sigaction(SIGUSR1, &sa, NULL);
    pid_t pid = fork();
    if (pid == 0) {
        for (int i = 0; i < 5; i++)
            kill(getppid(), SIGUSR1);
        exit(0);
    }
    while (wait(NULL) < 0) ;   /* (SA_RESTART makes wait restart anyway) */
    printf("counter = %d\n", (int)counter);
    return 0;
}
