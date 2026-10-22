/* server_pool.c — a fixed team of POOL processes, created once */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include "net.h"

#define POOL 2

void serve(int c) {
    char name[100], reply[120];
    read_line(c, name, sizeof name);
    sleep(2);
    write(c, "done ", 5);
    write(c, name, strlen(name));
    write(c, "\n", 1);
}

int main(void) {
    int L = server_listen(5000);
    for (int i = 0; i < POOL; i++) {
        if (fork() == 0) {              /* each worker runs the same loop */
            while (1) {
                int c = server_accept(L);   /* the OS gives each caller to ONE worker */
                serve(c);
                close(c);
            }
        }
    }
    while (wait(NULL) > 0) { }          /* the parent only waits */
    return 0;
}
