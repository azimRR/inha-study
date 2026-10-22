/* client.c — sends one message to the server and prints the answer.
   Usage: ./client <host> <message>        e.g.  ./client localhost hello */
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "net.h"

int main(int argc, char *argv[]) {
    if (argc != 3) { printf("usage: %s <host> <message>\n", argv[0]); return 1; }

    int c = client_connect(argv[1], 5000);      /* dial the number */

    write(c, argv[2], strlen(argv[2]));         /* say something   */
    write(c, "\n", 1);                          /* end of message  */

    char reply[100];
    read_line(c, reply, sizeof reply);          /* listen          */
    printf("client: the server said \"%s\"\n", reply);

    close(c);                                   /* hang up         */
    return 0;
}
