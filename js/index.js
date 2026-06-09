/* ============================================
   HOME PAGE — Home.js
   ============================================ */

// ── Neural Network Canvas ──
(function() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const nodes = [];
  const NODE_COUNT = 60;

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
    });
  }

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;

  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(104,186,127,${0.25 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Mouse connections
      const mdx = nodes[i].x - mouseX;
      const mdy = nodes[i].y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 200) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(104,186,127,${0.5 * (1 - mdist / 200)})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(104,186,127,0.7)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

// ── Typing Animation ──
(function() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const texts = [
    'Pioneering AI-Powered Education',
    'Shaping Global Leaders Since 1950',
    'Where Innovation Meets Excellence',
    'Ranked #1 in the World — 2025',
    'Building the Future, One Mind at a Time',
  ];

  let textIndex = 0;
  let charIndex  = 0;
  let deleting   = false;

  function type() {
    const current = texts[textIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 40 : 70);
  }

  setTimeout(type, 2200);
})();

// ── Parallax Hero ──
(function() {
  const heroImg = document.querySelector('.hero-img');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroImg) {
      heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.25}px)`;
    }
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = `${1 - scrolled / 600}`;
    }
  });
})();

// ── Testimonial Slider ──
(function() {
  const track  = document.getElementById('testiTrack');
  const dots   = document.querySelectorAll('.testi-dot');
  const prev   = document.getElementById('testiPrev');
  const next   = document.getElementById('testiNext');
  if (!track) return;

  const cards = track.querySelectorAll('.testi-card');
  const total = cards.length;
  let current = 0;
  let autoTimer;

  function getVisible() {
    return window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1;
  }

  function go(index) {
    const visible = getVisible();
    const max = total - visible;
    current = Math.max(0, Math.min(index, max));
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prev?.addEventListener('click', () => { go(current - 1); resetAuto(); });
  next?.addEventListener('click', () => { go(current + 1); resetAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); resetAuto(); }));

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      const visible = getVisible();
      go(current + 1 > total - visible ? 0 : current + 1);
    }, 4000);
  }

  resetAuto();
  window.addEventListener('resize', () => go(current));
})();

// ── Mouse Reactive Spotlight ──
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--spotlight-x', x + '%');
    hero.style.setProperty('--spotlight-y', y + '%');
  });
})();
