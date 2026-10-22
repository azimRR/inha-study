#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    /* Case 1: open BEFORE fork -> one open file description, shared offset */
    int fd = open("shared.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fork() == 0) { write(fd, "child\n", 6); _exit(0); }
    wait(NULL);
    write(fd, "parent\n", 7);
    close(fd);
    /* Case 2: open AFTER fork -> two open file descriptions, two offsets (both start at 0) */
    pid_t c = fork();
    int fd2 = open("separate.txt", O_WRONLY | O_CREAT | (c ? 0 : O_TRUNC), 0644);
    if (c == 0) { write(fd2, "child\n", 6); _exit(0); }
    wait(NULL);
    write(fd2, "PARENT\n", 7);   /* overwrites from offset 0 */
    close(fd2);
    return 0;
}
