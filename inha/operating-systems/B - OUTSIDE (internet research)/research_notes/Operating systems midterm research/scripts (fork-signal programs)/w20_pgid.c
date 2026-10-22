#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    pid_t c = fork();
    printf("%s pid=%d ppid=%d pgid=%d sid=%d\n", c ? "parent" : "child ",
           (int)getpid(), (int)getppid(), (int)getpgrp(), (int)getsid(0));
    if (c == 0) {
        setpgid(0, 0);   /* child makes itself leader of a new group (what shells do per job) */
        printf("child  after setpgid(0,0): pgid=%d\n", (int)getpgrp());
        return 0;
    }
    wait(NULL);
    return 0;
}
