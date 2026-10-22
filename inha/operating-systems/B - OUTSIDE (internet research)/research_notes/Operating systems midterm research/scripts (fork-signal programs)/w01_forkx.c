#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main(void) {
    int x = 1;
    pid_t pid = fork();
    if (pid == 0) {                 /* child */
        printf("child : x=%d\n", ++x);
        exit(0);
    }
    printf("parent: x=%d\n", --x);  /* parent */
    exit(0);
}
