#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
static void report(const char *what, int st) {
    if (WIFEXITED(st))        printf("%-14s -> exited, WEXITSTATUS=%d\n", what, WEXITSTATUS(st));
    else if (WIFSIGNALED(st)) printf("%-14s -> killed, WTERMSIG=%d\n", what, WTERMSIG(st));
}
int main(void) {
    int st; pid_t c;
    if (fork() == 0) exit(300);           wait(&st); report("exit(300)", st);
    if (fork() == 0) exit(-1);            wait(&st); report("exit(-1)", st);
    if (fork() == 0) return 7;            wait(&st); report("return 7", st);
    if ((c = fork()) == 0) { pause(); _exit(0); }
    kill(c, SIGKILL); waitpid(c, &st, 0); report("SIGKILL", st);
    if ((c = fork()) == 0) { pause(); _exit(0); }
    kill(c, SIGTERM); waitpid(c, &st, 0); report("SIGTERM", st);
    if (fork() == 0) { int *p = NULL; return *(volatile int *)p; }
    wait(&st); report("NULL deref", st);
    printf("wait with no children: %d\n", (int)wait(&st));
    return 0;
}
