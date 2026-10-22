#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv) {
    int chain = (argc > 1 && strcmp(argv[1], "chain") == 0);
    int i;
    for (i = 0; i < 3; i++) {
        pid_t p = fork();
        if (chain ? (p != 0) : (p == 0)) break;   /* fan: child breaks; chain: parent breaks */
    }
    while (wait(NULL) > 0) ;
    printf("i=%d pid=%d ppid=%d\n", i, (int)getpid(), (int)getppid());
    return 0;
}
