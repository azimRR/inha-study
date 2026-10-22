#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv) {
    int forget = (argc > 1);
    int fd[2]; pipe(fd);
    if (fork() == 0) {                 /* child = writer */
        close(fd[0]);
        write(fd[1], "hello\n", 6);
        _exit(0);                       /* exit closes child's write end */
    }
    if (!forget) close(fd[1]);          /* parent MUST close its copy of the write end */
    char buf[64]; ssize_t n; size_t total = 0;
    while ((n = read(fd[0], buf, sizeof buf)) > 0) total += n;   /* EOF only when ALL write ends closed */
    printf("parent read %zu bytes, then EOF\n", total);
    wait(NULL);
    return 0;
}
