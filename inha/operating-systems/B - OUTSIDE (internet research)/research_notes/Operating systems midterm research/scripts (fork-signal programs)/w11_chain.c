#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    int x = 0;
    for (int i = 0; i < 3; i++) {
        if (fork() == 0) {
            x++;              /* child continues the loop */
        } else {
            wait(NULL);       /* parent waits for its one child, then stops looping */
            break;
        }
    }
    printf("%d\n", x);
    return 0;
}
