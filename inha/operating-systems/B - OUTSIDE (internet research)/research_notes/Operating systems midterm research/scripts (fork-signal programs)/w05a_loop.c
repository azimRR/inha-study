#include <stdio.h>
#include <unistd.h>
int main(void) {
    for (int i = 0; i < 3; i++)
        fork();
    printf("hi\n");
    return 0;
}
