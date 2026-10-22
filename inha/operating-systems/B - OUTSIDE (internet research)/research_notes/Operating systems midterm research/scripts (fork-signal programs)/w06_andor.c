#include <stdio.h>
#include <unistd.h>
int main(void) {
    (void)(fork() && fork() || fork());
    printf("x\n");
    return 0;
}
