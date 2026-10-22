#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#define N 3
int main(int argc, char **argv) {
    pid_t pid[N]; int st;
    int specific = (argc > 1);
    for (int i = 0; i < N; i++)
        if ((pid[i] = fork()) == 0)
            exit(100 + i);
    for (int i = N - 1; i >= 0; i--) {
        pid_t w = specific ? waitpid(pid[i], &st, 0) : wait(&st);
        int idx = -1;
        for (int k = 0; k < N; k++) if (pid[k] == w) idx = k;
        printf("reaped child #%d status %d\n", idx, WEXITSTATUS(st));
    }
    return 0;
}
