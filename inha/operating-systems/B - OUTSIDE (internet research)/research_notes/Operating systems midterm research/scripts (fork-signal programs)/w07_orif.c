#include <stdio.h>
#include <unistd.h>
int main(void) {
    if (fork() || fork())
        fork();
    printf("1\n");
    return 0;
}
