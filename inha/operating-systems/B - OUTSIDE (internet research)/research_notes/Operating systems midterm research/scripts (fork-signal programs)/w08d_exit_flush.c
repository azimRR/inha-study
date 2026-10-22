#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    printf("X");                 /* buffered, no newline */
    pid_t pid = fork();
    if (pid == 0)
        exit(0);                 /* child: _exit does NOT flush stdio -> child's copy of "X" vanishes */
    wait(NULL);
    printf("Y\n");               /* parent's buffer: "XY\n" */
    return 0;
}
