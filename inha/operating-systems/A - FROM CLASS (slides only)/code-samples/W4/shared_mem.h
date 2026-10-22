/* shared_mem.h — the course's shared memory in ONE call.
   Read it once; you never need to memorise it.
   Call shared_alloc() BEFORE fork(): parent and children then see the same bytes. */
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

static void *shared_alloc(size_t size) {
    void *p = mmap(NULL, size, PROT_READ | PROT_WRITE,
                   MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (p == MAP_FAILED) { perror("mmap"); exit(EXIT_FAILURE); }
    return p;
}
