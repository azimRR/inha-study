/* net.h — the course's networking in three calls.
   Read it once; you never need to memorise it.

   Server:  int L = server_listen(5000);     open a "reception phone" on port 5000
            int c = server_accept(L);        wait for a client; returns a NEW descriptor
   Client:  int c = client_connect("localhost", 5000);

   After that, c is an ordinary file descriptor: read(), write(), close().
   read_line() reads one whole line (one message) from it.                  */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>

/* Server side: create a socket, give it a port number, start listening. */
static inline int server_listen(int port) {
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    if (fd == -1) { perror("socket"); exit(EXIT_FAILURE); }

    int yes = 1;       /* lets you restart the server at once on the same port */
    setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof addr);
    addr.sin_family      = AF_INET;
    addr.sin_addr.s_addr = htonl(INADDR_ANY);     /* any address of this machine */
    addr.sin_port        = htons(port);
    if (bind(fd, (struct sockaddr *)&addr, sizeof addr) == -1) {
        perror("bind"); exit(EXIT_FAILURE);
    }
    if (listen(fd, 16) == -1) { perror("listen"); exit(EXIT_FAILURE); }
    return fd;
}

/* Server side: sleep until a client connects; return the connection. */
static inline int server_accept(int listen_fd) {
    int fd = accept(listen_fd, NULL, NULL);
    if (fd == -1) { perror("accept"); exit(EXIT_FAILURE); }
    return fd;
}

/* Client side: connect to host ("localhost", "192.168.1.7", ...) and port. */
static inline int client_connect(const char *host, int port) {
    char portstr[16];
    snprintf(portstr, sizeof portstr, "%d", port);

    struct addrinfo hints, *res;
    memset(&hints, 0, sizeof hints);
    hints.ai_family   = AF_INET;
    hints.ai_socktype = SOCK_STREAM;
    if (getaddrinfo(host, portstr, &hints, &res) != 0) {
        fprintf(stderr, "client_connect: unknown host %s\n", host);
        exit(EXIT_FAILURE);
    }
    int fd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
    if (fd == -1) { perror("socket"); exit(EXIT_FAILURE); }
    if (connect(fd, res->ai_addr, res->ai_addrlen) == -1) {
        perror("connect"); exit(EXIT_FAILURE);
    }
    freeaddrinfo(res);
    return fd;
}

/* Read one line (one message) into buf. The '\n' is removed.
   Returns 0 when the other side has closed (end of file), otherwise a positive number. */
static inline int read_line(int fd, char *buf, int size) {
    int n = 0;
    char ch;
    while (n < size - 1 && read(fd, &ch, 1) == 1) {
        if (ch == '\n') { buf[n] = '\0'; return n == 0 ? 1 : n; }
        buf[n++] = ch;
    }
    buf[n] = '\0';
    return n;
}
