#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    printf("A ");                          /* stays in the user-space stdio buffer */
    if (fork() == 0) {
        execlp("echo", "echo", "B", (char *)NULL);
        printf("C\n");                     /* runs only if exec FAILED */
        return 1;
    }
    wait(NULL);
    printf("D\n");
    return 0;
}
