/* timed_client.c — like client.c, but also prints how long it waited. */
#include <stdio.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include "net.h"

int main(int argc, char *argv[]) {
    if (argc != 3) { printf("usage: %s <host> <name>\n", argv[0]); return 1; }
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0); // no need to memorize! just some helper function

    int c = client_connect(argv[1], 5000);
    write(c, argv[2], strlen(argv[2]));
    write(c, "\n", 1);
    char reply[100];
    read_line(c, reply, sizeof reply);

    clock_gettime(CLOCK_MONOTONIC, &t1);// no need to memorize! just some helper function
    double s = (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9;
    printf("client %s: got \"%s\" after %.0f s\n", argv[2], reply, s);
    close(c);
    return 0;
}
