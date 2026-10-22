#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv) {
    if (argc > 1) {                       /* ORPHAN demo */
        if (fork() == 0) {
            printf("child: my parent is %d\n", (int)getppid());
            fflush(stdout);
            sleep(2);                     /* parent exits meanwhile */
            printf("child: after parent exit, my parent is %d\n", (int)getppid());
            return 0;
        }
        sleep(1);
        printf("parent %d exiting without wait\n", (int)getpid());
        return 0;
    }
    pid_t c = fork();                     /* ZOMBIE demo */
    if (c == 0) _exit(0);
    sleep(1);
    char cmd[64]; snprintf(cmd, sizeof cmd, "ps -o pid,ppid,stat,comm -p %d", (int)c);
    system(cmd);                          /* child shows state Z (zombie) */
    waitpid(c, NULL, 0);                  /* reap */
    system(cmd);                          /* now gone */
    return 0;
}
