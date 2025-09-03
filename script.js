// ——— Theme toggle with localStorage ———
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const THEME_KEY = 'portfolio-theme';
const saved = localStorage.getItem(THEME_KEY);
if (saved === 'light') { 
  document.body.classList.add('light'); 
}
toggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem(
    THEME_KEY, 
    document.body.classList.contains('light') ? 'light' : 'dark'
  );
});

// ——— Dynamic year ———
document.getElementById('year').textContent = new Date().getFullYear();

// ——— Reveal on scroll ———
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('in'); 
      observer.unobserve(e.target); 
    } 
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ——— Animated grid (subtle techy background) ———
const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
let w, h, t = 0;
function resize() { 
  w = canvas.width = innerWidth * devicePixelRatio; 
  h = canvas.height = innerHeight * devicePixelRatio; 
}
addEventListener('resize', resize, { passive: true });
resize();
function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1 * devicePixelRatio;
  const gap = 36 * devicePixelRatio;
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
  // moving diagonal lines
  const offset = (Math.sin(t / 7000) * gap);
  for (let x = -gap * 2; x < w + gap * 2; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, h);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.08)';
  for (let y = -gap * 2; y < h + gap * 2; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(w, y + offset);
    ctx.stroke();
  }
  t += 16; // ~60fps
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// ——— Basic form success handler (for Formspree) ———
const form = document.querySelector('form.contact');
form?.addEventListener('submit', async (e) => {
  // If using Formspree, this fetch helps show inline success without page leave
  if (form.action.includes('formspree.io')) {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch(form.action, { 
      method: 'POST', 
      body: data, 
      headers: { 'Accept': 'application/json' } 
    });
    if (res.ok) {
      form.reset();
      alert('Thanks! Your message has been sent.');
    } else {
      alert('Oops, something went wrong. You can email me instead.');
    }
  }
});
