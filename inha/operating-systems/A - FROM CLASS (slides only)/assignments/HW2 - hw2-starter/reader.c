/* reader.c — receives everything until the writer closes (from Slide 7) */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

#define FIFO_PATH "/tmp/demo_fifo"

int main(void)
{
    printf("reader: waiting for a writer (open blocks)...\n");
    int fd = open(FIFO_PATH, O_RDONLY);          /* <- blocks here */
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    printf("reader: writer arrived\n");
    char buf[256];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) > 0)
        write(STDOUT_FILENO, buf, n);
    /* n == 0 -> all writers closed (EOF) */
    printf("reader: EOF, done\n");
    close(fd);
    return 0;
}
