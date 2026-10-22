/* echo_server.c — sends back whatever a client says. One client at a time. */
#include <stdio.h>
#include <unistd.h>
#include "net.h"

int main(void) {
    int L = server_listen(5000);            /* the reception phone */
    printf("server: waiting on port 5000\n");

    while (1) {
        int c = server_accept(L);           /* sleeps until a client calls */
        printf("server: a client connected\n");

        char buf[100];
        ssize_t n;
        while ((n = read(c, buf, sizeof buf)) > 0)   /* 0 = client hung up */
            write(c, buf, n);                        /* send it back        */

        printf("server: the client left\n");
        close(c);                           /* hang up this call */
    }
}
