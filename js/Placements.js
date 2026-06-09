// Placements.js — Star University

// ── Package Bar Chart (fixed for transform scaleY animation) ──
const chartData = [
  { label: 'Engg. & CS', avg: 95, color: 'linear-gradient(to top,#2E6F40,#68BA7F)' },
  { label: 'MBA / Commerce', avg: 80, color: 'linear-gradient(to top,#2E6F40,#68c4ba)' },
  { label: 'Arts & Design', avg: 55, color: 'linear-gradient(to top,#253D2C,#a0c878)' },
  { label: 'Pure Sciences', avg: 70, color: 'linear-gradient(to top,#253D2C,#5ba89a)' },
  { label: 'Health & Med', avg: 88, color: 'linear-gradient(to top,#1a3d2a,#3d7a6e)' },
];

const chartEl = document.getElementById('pkgChart');
if (chartEl) {
  // Clear any existing content
  chartEl.innerHTML = '';

  chartData.forEach(d => {
    const group = document.createElement('div');
    group.className = 'pkg-bar-group';
    const targetScale = d.avg / 100; // 0 to 1

    group.innerHTML = `
      <div class="pkg-bar-val">$${Math.round(d.avg * 0.9)}K</div>
      <div class="pkg-bar" data-scale="${targetScale}" style="height: 180px; background: ${d.color}; transform: scaleY(0); transform-origin: bottom;"></div>
      <div class="pkg-bar-label">${d.label}</div>
    `;
    chartEl.appendChild(group);
  });

  // Intersection Observer to animate bars when visible
  const barObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const bars = document.querySelectorAll('.pkg-bar');
      bars.forEach((bar, idx) => {
        const scale = parseFloat(bar.getAttribute('data-scale'));
        setTimeout(() => {
          bar.style.transform = `scaleY(${scale})`;
          bar.classList.add('animated'); // optional, for any additional styling
        }, idx * 120);
      });
      barObs.disconnect();
    }
  }, { threshold: 0.3 });
  barObs.observe(chartEl);
}

// ── Particle canvas for hero (unchanged, only runs if canvas exists) ──
(function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(104,186,127,0.8)';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();