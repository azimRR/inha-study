#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    printf("A");          /* no newline: sits in the stdio buffer */
    if (fork() == 0) {
        printf("B\n");
        return 0;
    }
    wait(NULL);
    printf("C\n");
    return 0;
}
