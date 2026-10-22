/* pipe_eof.c — the child writes three lines into a pipe and exits;
   the parent reads until read() returns 0 (end of file).            */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    setvbuf(stdout, NULL, _IONBF, 0);
     /* Turn OFF printf's buffer, before anything is printed.
     *
     * printf does not send your text to the screen at once. It first
     * puts it into a buffer (a waiting area inside YOUR process) and
     * sends the whole buffer later - when it sees '\n' on a terminal,
     * when the buffer is full, or when the program exits.
     *
     * That is a problem with fork(): the child gets a COPY of the
     * whole process, including the buffer. If "hello " is still
     * waiting in the buffer at the moment of fork(), both processes
     * now hold it, and both print it when they exit - you see
     * "hello " twice, although printf ran only once.
     *
     * setvbuf(stdout, NULL, _IONBF, 0) means:
     *   stdout  - the stream printf writes to
     *   NULL    - no buffer of our own (let the library handle it)
     *   _IONBF  - "I/O No BuFfering": every printf goes out at once
     *   0       - buffer size: none
     *
     * After this line, what printf prints is already on the screen
     * before fork() runs, so nothing can be copied or printed twice.
     * We put this line first in EVERY program that uses fork().  just something to copy paste 
     no need to memorize    */

    int p[2];
    pipe(p);

    if (fork() == 0) {                       /* child: the writer */
        close(p[0]);
        char *lines[3] = { "one\n", "two\n", "three\n" };
        for (int i = 0; i < 3; i++)
            write(p[1], lines[i], strlen(lines[i]));
        close(p[1]);
        exit(0);
    }

//    close(p[1]);                             /* parent: THE line of Part 1.2 */

    char buf[100];
    ssize_t n;
    while ((n = read(p[0], buf, sizeof buf)) > 0) {
        printf("parent: read returned %zd bytes: ", n);
        write(1, buf, n);
    }
    printf("parent: read returned 0 - end of file\n");
    close(p[0]);
    wait(NULL);
    return 0;
}
