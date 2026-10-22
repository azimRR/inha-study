#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    printf("hello\n");   /* flushed at once on a terminal; still buffered if stdout is a pipe/file */
    if (fork() == 0) {
        printf("child\n");
        return 0;
    }
    wait(NULL);
    printf("parent\n");
    return 0;
}
