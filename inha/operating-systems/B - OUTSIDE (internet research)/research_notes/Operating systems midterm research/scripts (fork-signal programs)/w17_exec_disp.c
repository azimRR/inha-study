#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
static void h(int s) { (void)s; }
int main(int argc, char **argv) {
    int ignore = (argc > 1 && strcmp(argv[1], "ign") == 0);
    if (ignore) signal(SIGINT, SIG_IGN);   /* ignored disposition survives exec */
    else        signal(SIGINT, h);         /* caught disposition is reset to SIG_DFL by exec */
    pid_t c = fork();
    if (c == 0) {
        execlp("sh", "sh", "-c", "kill -INT $$; echo survived SIGINT", (char *)NULL);
        _exit(127);
    }
    int st; waitpid(c, &st, 0);
    if (WIFSIGNALED(st)) printf("[%s] child killed by signal %d\n", ignore ? "SIG_IGN" : "handler", WTERMSIG(st));
    else                 printf("[%s] child exited %d\n", ignore ? "SIG_IGN" : "handler", WEXITSTATUS(st));
    return 0;
}
