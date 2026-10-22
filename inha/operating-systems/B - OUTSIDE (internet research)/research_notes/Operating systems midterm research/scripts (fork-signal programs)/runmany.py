import subprocess, sys, collections
def run_tty(cmd, n):
    c = collections.Counter()
    for _ in range(n):
        out = subprocess.run(['script', '-q', '/dev/null', 'sh', '-c', cmd + '; sleep 0.03'],
                             capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout
        out = out.replace('\r', '').replace('^D', '').replace('\x08', '')
        c[' '.join(l for l in out.split('\n') if l.strip())] += 1
    return c
def run_pipe(cmd, n):
    c = collections.Counter()
    for _ in range(n):
        out = subprocess.run(['sh', '-c', cmd + ' | cat'], capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout
        c[' '.join(l for l in out.split('\n') if l.strip())] += 1
    return c
if __name__ == '__main__':
    mode, n, cmd = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    res = run_tty(cmd, n) if mode == 'tty' else run_pipe(cmd, n)
    print(f'## {cmd} [{mode}] x{n}: {len(res)} distinct')
    for k, v in res.most_common():
        print(f'   {v:4d}  {k}')
