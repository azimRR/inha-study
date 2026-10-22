#!/usr/bin/env python3
"""Render an eclass (Coursemos ubdoc) slide deck to PNGs + a PDF + raw text.

Usage:  python3 fetch_slides.py "<doc.html viewer URL>" "<Week N - Title>"
Get the viewer URL by opening mod/ubfile/viewer.php?id=<id> in a logged-in browser and
copying the iframe request to https://doc.coursemos.co.kr/view/v1/viewer/doc.html?fn=...&rs=...
The converted pages on doc.coursemos.co.kr are public, so no login is needed after that.
PDF bundling needs PyMuPDF (pip install pymupdf); everything else is stdlib + Google Chrome.
"""
import concurrent.futures as cf, html, os, re, shutil, subprocess, sys, tempfile, time, urllib.parse, urllib.request

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "A - FROM CLASS (slides only)")

def fetch(url):
    for a in range(8):
        try:
            return urllib.request.urlopen(url, timeout=60).read().decode("utf-8", "replace")
        except Exception as e:
            last = e; time.sleep(3 * (a + 1))
    raise last

def to_text(x):
    b = x[x.find("<body"):]
    b = re.sub(r"(?s)<script.*?</script>|<style.*?</style>", "", b)
    b = re.sub(r"(?i)<br\s*/?>", "\n", b)
    b = re.sub(r"(?i)</p>|</tr>|</li>|</h\d>", "\n", b)
    b = re.sub(r"(?i)</td>", " | ", b)
    b = html.unescape(re.sub(r"<[^>]+>", "", b)).replace("\xa0", " ")
    out = []
    for l in (re.sub(r"[ \t]+", " ", l).strip(" |") for l in b.split("\n")):
        if l or (out and out[-1]): out.append(l)
    return "\n".join(out).strip()

def render(job):
    url, png = job
    if os.path.exists(png) and os.path.getsize(png) > 5000: return png, "cached"
    prof = tempfile.mkdtemp()
    try:
        p = subprocess.Popen([CHROME, "--headless=new", f"--user-data-dir={prof}", "--no-first-run", "--disable-gpu",
                              "--hide-scrollbars", "--window-size=1280,960", "--virtual-time-budget=8000",
                              f"--screenshot={png}", url], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try: p.wait(timeout=90)
        except subprocess.TimeoutExpired: p.kill()
    finally:
        shutil.rmtree(prof, ignore_errors=True)
    return png, "ok" if os.path.exists(png) else "FAIL"

def main(viewer_url, name):
    q = urllib.parse.parse_qs(urllib.parse.urlparse(viewer_url).query)
    h, rs, orig = q["fn"][0], q["rs"][0], q.get("rmn", ["?"])[0]
    base = f"https://doc.coursemos.co.kr{rs}"
    xml = fetch(f"{base}/{h}.xml")
    n = int(re.search(r"<slide_cnt>(\d+)", xml).group(1))
    titles = [html.unescape(t) for t in re.findall(r"<title><!\[CDATA\[(.*?)\]\]></title>", xml)]
    imgdir = os.path.join(A, "slide-images", name); os.makedirs(imgdir, exist_ok=True)
    md, jobs = [f"# {name} — raw slide text (verbatim from class slides)\n", f"Source file: {orig} · {n} slides\n"], []
    for i in range(n):
        url = f"{base}/{h}.files/{h}_{i:05d}.xhtml"
        t = titles[i] if i < len(titles) else f"Slide {i+1}"
        md.append(f"\n---\n\n## Slide {i+1}: {t}\n\n{to_text(fetch(url)) or '(no text — image/graph only, see image)'}\n")
        jobs.append((url, os.path.join(imgdir, f"slide-{i+1:02d}.png")))
    os.makedirs(os.path.join(A, "slide-text"), exist_ok=True)
    open(os.path.join(A, "slide-text", f"{name}.md"), "w", encoding="utf-8").write("".join(md))
    for attempt in range(2):
        with cf.ThreadPoolExecutor(4) as ex: res = list(ex.map(render, jobs))
    print(f"{n} slides, failed: {[p for p, s in res if s == 'FAIL']}")
    try:
        import fitz
        doc = fitz.open()
        for _, png in jobs:
            if os.path.exists(png):
                pg = doc.new_page(width=720, height=540); pg.insert_image(pg.rect, filename=png)
        os.makedirs(os.path.join(A, "slides-pdf"), exist_ok=True)
        doc.save(os.path.join(A, "slides-pdf", f"{name}.pdf"), deflate=True)
    except ImportError:
        print("PyMuPDF not installed — skipped PDF")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
