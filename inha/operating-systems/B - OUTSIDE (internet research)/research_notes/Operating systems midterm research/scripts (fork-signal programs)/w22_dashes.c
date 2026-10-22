#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv) {
    const char *s = (argc > 1) ? "-\n" : "-";
    for (int i = 0; i < 2; i++) {
        fork();
        printf("%s", s);
    }
    while (wait(NULL) > 0) ;   /* keep output together */
    return 0;
}
