#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv) {
    int waits = (argc == 1);           /* E1 with waits; E2 (any arg) without */
    printf("A\n");
    if (fork() == 0) {
        printf("B\n");
        if (fork() == 0)
            printf("C\n");
        else if (waits)
            wait(NULL);
    } else if (waits)
        wait(NULL);
    printf("D\n");
    return 0;
}
