const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const button = document.querySelector('#motion');
let paused = reduced.matches;
let phase = 0;
let previous = 0;
function state() { button.textContent = paused ? 'Play motion' : 'Pause motion'; button.setAttribute('aria-pressed', String(paused)); }
button.addEventListener('click', () => { paused = !paused; state(); });
reduced.addEventListener('change', e => { paused = e.matches; state(); });
function animate(time) {
  const dt = Math.min((time - previous) / 1000, .05); previous = time;
  if (!paused && !document.hidden) {
    phase += dt * .65;
    const a = -2.15 + .22 * Math.sin(phase), b = -.6 + .3 * Math.cos(phase);
    const x = 250 + 137 * Math.cos(a), y = 320 + 137 * Math.sin(a);
    const tx = x + 137 * Math.cos(b), ty = y + 137 * Math.sin(b);
    document.querySelector('#arm').setAttribute('d', `M250 320L${x} ${y}L${tx} ${ty}`);
    for (const [id, cx, cy] of [['elbow', x, y], ['tip', tx, ty]]) { const el = document.getElementById(id); el.setAttribute('cx', cx); el.setAttribute('cy', cy); }
    document.querySelector('#target').setAttribute('transform', `translate(${tx + 30} ${ty})`);
  }
  requestAnimationFrame(animate);
}
state(); requestAnimationFrame(animate);
