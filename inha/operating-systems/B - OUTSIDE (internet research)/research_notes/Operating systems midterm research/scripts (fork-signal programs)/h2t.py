import sys, re, html
for fn in sys.argv[1:]:
    s = open(fn, encoding='utf-8', errors='replace').read()
    # keep only the <pre> man content if present
    s = re.sub(r'(?is)<script.*?</script>|<style.*?</style>', '', s)
    s = re.sub(r'(?i)<br\s*/?>', '\n', s)
    s = re.sub(r'(?i)</(p|div|h[1-6]|li|tr|dt|dd)>', '\n', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    s = re.sub(r'\n{3,}', '\n\n', s)
    open(fn.rsplit('.html',1)[0] + '.txt', 'w').write(s)
