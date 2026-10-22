#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("1\n");
    } else {
        printf("2\n");
        wait(NULL);
        printf("3\n");
    }
    printf("4\n");
    return 0;
}
