/* Tiny economics chart renderer: turns a chart spec (see lessons/BRIEF.md) into an SVG string. */
function renderChart(c) {
  if (!c) return "";
  const W = 600, H = 400, L = 62, R = 30, T = 22, B = 52;
  const pw = W - L - R, ph = H - T - B;
  const xmax = c.xmax || 10, ymax = c.ymax || 10;
  // auto-zoom: when all curves/points sit far from 0, start the axis near the data instead of at 0
  const data = [...(c.lines || []).flatMap((l) => l.pts), ...(c.points || []).map((p) => [p.x, p.y])];
  const lo = (i, max) => {
    if (!data.length) return 0;
    const m = Math.min(...data.map((d) => d[i]));
    return m > 0.35 * max ? Math.max(0, m - 0.12 * (max - m)) : 0;
  };
  const xmin = c.xmin ?? lo(0, xmax), ymin = c.ymin ?? lo(1, ymax);
  const cx = (x) => Math.min(Math.max(x, xmin), xmax), cy = (y) => Math.min(Math.max(y, ymin), ymax);
  const X = (x) => L + ((cx(x) - xmin) / (xmax - xmin)) * pw, Y = (y) => T + ph - ((cy(y) - ymin) / (ymax - ymin)) * ph;
  const esc = (s) => String(s ?? "").replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;");
  const fmt = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : String(+v.toFixed(2)));
  let g = "";

  // ticks + grid
  for (const t of (c.xticks || []).filter((t) => t >= xmin)) {
    g += `<line class="cg" x1="${X(t)}" y1="${T}" x2="${X(t)}" y2="${T + ph}"/><text class="ct" x="${X(t)}" y="${T + ph + 18}" text-anchor="middle">${fmt(t)}</text>`;
  }
  for (const t of (c.yticks || []).filter((t) => t >= ymin)) {
    g += `<line class="cg" x1="${L}" y1="${Y(t)}" x2="${L + pw}" y2="${Y(t)}"/><text class="ct" x="${L - 8}" y="${Y(t) + 4}" text-anchor="end">${fmt(t)}</text>`;
  }

  // areas
  for (const a of c.areas || []) {
    const pts = a.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ");
    g += `<polygon class="ca a-${a.role || "other"}" points="${pts}"/>`;
    if (a.label) {
      const cx = a.pts.reduce((s, p) => s + p[0], 0) / a.pts.length, cy = a.pts.reduce((s, p) => s + p[1], 0) / a.pts.length;
      g += `<text class="cal" x="${X(cx)}" y="${Y(cy) + 4}" text-anchor="middle">${esc(a.label)}</text>`;
    }
  }

  // smooth path through points (Catmull-Rom → Bézier)
  const path = (pts) => {
    const P = pts.map(([x, y]) => [X(x), Y(y)]);
    if (P.length < 3) return `M${P.map((p) => p.join(",")).join(" L")}`;
    let d = `M${P[0][0]},${P[0][1]}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
    }
    return d;
  };

  // policy lines
  for (const h of c.hlines || []) {
    g += `<line class="cl r-${h.role || "policy"}" x1="${L}" y1="${Y(h.y)}" x2="${L + pw}" y2="${Y(h.y)}"/>`;
    if (h.label) g += `<text class="clab r-${h.role || "policy"}-t" x="${L + pw - 4}" y="${Y(h.y) - 7}" text-anchor="end">${esc(h.label)}</text>`;
  }
  for (const v of c.vlines || []) {
    g += `<line class="cl r-${v.role || "policy"}" x1="${X(v.x)}" y1="${T}" x2="${X(v.x)}" y2="${T + ph}"/>`;
    if (v.label) g += `<text class="clab r-${v.role || "policy"}-t" x="${X(v.x) + 6}" y="${T + 14}">${esc(v.label)}</text>`;
  }

  // curves
  for (const l of c.lines || []) {
    const role = l.role || "other";
    g += `<path class="cl r-${role}${/2$/.test(role) ? " dash" : ""}" d="${path(l.pts)}"/>`;
    if (l.label) {
      const [lx, ly] = l.pts[l.pts.length - 1];
      const nearTop = Y(ly) < T + 16;
      const nearBottom = Y(ly) > T + ph - 14;
      const ty = nearTop ? Y(ly) + 16 : nearBottom ? Y(ly) - 14 : Y(ly) - 4;
      g += `<text class="clab r-${role.replace(/2$/, "")}-t" x="${Math.min(X(lx) + 6, W - 4)}" y="${ty}" ${X(lx) > W - 40 ? 'text-anchor="end"' : ""}>${esc(l.label)}</text>`;
    }
  }

  // arrows
  for (const a of c.arrows || []) {
    g += `<line class="carr" x1="${X(a.from[0])}" y1="${Y(a.from[1])}" x2="${X(a.to[0])}" y2="${Y(a.to[1])}" marker-end="url(#ah)"/>`;
    if (a.label) g += `<text class="ct" x="${(X(a.from[0]) + X(a.to[0])) / 2}" y="${(Y(a.from[1]) + Y(a.to[1])) / 2 - 8}" text-anchor="middle">${esc(a.label)}</text>`;
  }

  // points
  for (const p of c.points || []) {
    if (p.guides) {
      g += `<polyline class="cgd" points="${X(xmin)},${Y(p.y)} ${X(p.x)},${Y(p.y)} ${X(p.x)},${Y(ymin)}"/>`;
      if (p.show) g += `<text class="ct strong" x="${L - 8}" y="${Y(p.y) + 4}" text-anchor="end">${fmt(p.y)}</text><text class="ct strong" x="${X(p.x)}" y="${T + ph + 18}" text-anchor="middle">${fmt(p.x)}</text>`;
    }
    g += `<circle class="cp" cx="${X(p.x)}" cy="${Y(p.y)}" r="5"/>`;
    if (p.label) g += `<text class="cpl" x="${X(p.x) + 9}" y="${Y(p.y) - 9}">${esc(p.label)}</text>`;
  }

  // axes (zig-zag break mark when an axis does not start at 0)
  if (xmin > 0) g += `<polyline class="cax" fill="none" points="${L + 10},${T + ph + 5} ${L + 14},${T + ph - 5} ${L + 18},${T + ph + 5} ${L + 22},${T + ph - 5}"/>`;
  if (ymin > 0) g += `<polyline class="cax" fill="none" points="${L - 5},${T + ph - 10} ${L + 5},${T + ph - 14} ${L - 5},${T + ph - 18} ${L + 5},${T + ph - 22}"/>`;
  g += `<line class="cax" x1="${L}" y1="${T + ph}" x2="${L + pw + 10}" y2="${T + ph}" marker-end="url(#ax)"/>
        <line class="cax" x1="${L}" y1="${T + ph}" x2="${L}" y2="${T - 10}" marker-end="url(#ax)"/>
        <text class="cxl" x="${L + pw}" y="${H - 10}" text-anchor="end">${esc(c.x || "Quantity")}</text>
        <text class="cxl" transform="translate(16 ${T + ph / 2}) rotate(-90)" text-anchor="middle">${esc(c.y || "Price")}</text>`;

  const defs = `<defs>
    <marker id="ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="cmk"/></marker>
    <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="cmk2"/></marker></defs>`;
  return `<figure class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.caption || "economics graph")}">${defs}${g}</svg>${c.caption ? `<figcaption>${esc(c.caption)}</figcaption>` : ""}</figure>`;
}
