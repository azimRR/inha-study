#include <stdio.h>
#include <signal.h>
#include <unistd.h>
static volatile sig_atomic_t n = 0;
static void h(int s) { (void)s; n++; }
int main(void) {
    signal(SIGUSR1, h);                 /* plain signal(): BSD or System V semantics? */
    raise(SIGUSR1); raise(SIGUSR1);     /* SysV semantics would reset to SIG_DFL -> 2nd raise kills us */
    struct sigaction cur; sigaction(SIGUSR1, NULL, &cur);
    printf("handler ran %d times; still installed=%d; SA_RESTART set=%d\n",
           (int)n, cur.sa_handler == h, (cur.sa_flags & SA_RESTART) != 0);
    return 0;
}
