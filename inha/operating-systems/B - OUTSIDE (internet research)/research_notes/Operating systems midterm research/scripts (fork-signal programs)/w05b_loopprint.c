#include <stdio.h>
#include <unistd.h>
int main(void) {
    for (int i = 0; i < 3; i++) {
        fork();
        printf("%d\n", i);
    }
    return 0;
}
