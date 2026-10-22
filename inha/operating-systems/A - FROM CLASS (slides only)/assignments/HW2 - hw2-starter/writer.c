/* writer.c — creates the FIFO and sends one message (from Slide 7) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>

#define FIFO_PATH "/tmp/demo_fifo"

int main(void)
{
    if (mkfifo(FIFO_PATH, 0666) == -1 && errno != EEXIST) {
        perror("mkfifo");
        exit(EXIT_FAILURE);
    }
    printf("writer: waiting for a reader (open blocks)...\n");
    int fd = open(FIFO_PATH, O_WRONLY);          /* <- blocks here */
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    printf("writer: reader arrived, sending\n");
    char *msg = "hello over FIFO\n";
    if (write(fd, msg, strlen(msg)) == -1) perror("write");
    close(fd);
    return 0;
}
