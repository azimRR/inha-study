/* server_one.c — one client at a time; every request takes 2 seconds of work */
#include <stdio.h>
#include <unistd.h>
#include "net.h"

void serve(int c) {                     /* talk to ONE client */
    char name[100], reply[120];
    read_line(c, name, sizeof name);
    sleep(2);                           /* 2 seconds of "work" */
    snprintf(reply, sizeof reply, "done %s\n", name);
    write(c, reply, strlen(reply));
}

int main(void) {
    int L = server_listen(5000);
    while (1) {
        int c = server_accept(L);
        serve(c);                       /* nobody else is served meanwhile */
        close(c);
    }
}
