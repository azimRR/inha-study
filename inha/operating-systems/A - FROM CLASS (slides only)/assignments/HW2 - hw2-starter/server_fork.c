/* server_fork.c — one new process per client */
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
#include "net.h"

void serve(int c) {                     /* talk to ONE client */
    char name[100], reply[120];
    read_line(c, name, sizeof name);
    sleep(2);                           /* 2 seconds of "work" */
 
    write(c, "done ", 5);
    write(c, name, strlen(name));
    write(c, "\n", 1);
}

void reap(int sig) {                    /* Week 1: no zombies */
    (void)sig;
    while (waitpid(-1, NULL, WNOHANG) > 0) { }
}

int main(void) {
    struct sigaction sa;
    sa.sa_handler = reap;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    sigaction(SIGCHLD, &sa, NULL);

    int L = server_listen(5000);
    while (1) {
        int c = server_accept(L);
        if (fork() == 0) {              /* child: this client's own operator */
            close(L);                   /* the child never accepts          */
            serve(c);
            close(c);
            exit(0);
        }
        close(c);                       /* parent: the child has this call  */
    }
}
