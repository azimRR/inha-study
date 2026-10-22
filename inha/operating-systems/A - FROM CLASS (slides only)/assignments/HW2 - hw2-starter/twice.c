/* twice.c — what does fork do to text that printf has not printed yet? */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    /* setvbuf(stdout, NULL, _IONBF, 0); */   /* Part 1.3: delete the first slash-star and star-slash */
    printf("hello ");                         /* no '\n' */
    if (fork() == 0) {
        printf("world\n");
        exit(0);
    }
    wait(NULL);
    printf("world\n");
    return 0;
}
