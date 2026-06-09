// Contact.js — Star University

// ── Contact Form Validation ──
const contactForm = document.getElementById('contactForm');

function showErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErr() {
  ['cNameErr','cEmailErr','cSubjectErr','cMsgErr'].forEach(id => showErr(id, ''));
  document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
}

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  clearErr();
  let valid = true;

  const name    = document.getElementById('cName');
  const email   = document.getElementById('cEmail');
  const subject = document.getElementById('cSubject');
  const msg     = document.getElementById('cMsg');

  if (!name?.value.trim() || name.value.trim().length < 2) {
    showErr('cNameErr', 'Please enter your full name.');
    name?.classList.add('error');
    valid = false;
  }

  if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showErr('cEmailErr', 'Please enter a valid email address.');
    email?.classList.add('error');
    valid = false;
  }

  if (!subject?.value.trim() || subject.value.trim().length < 3) {
    showErr('cSubjectErr', 'Please enter a subject (min 3 characters).');
    subject?.classList.add('error');
    valid = false;
  }

  if (!msg?.value.trim() || msg.value.trim().length < 10) {
    showErr('cMsgErr', 'Please write a message (min 10 characters).');
    msg?.classList.add('error');
    valid = false;
  }

  if (valid) {
    // Simulate submit
    const btn = contactForm.querySelector('.contact-submit');
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }

    setTimeout(() => {
      contactForm.reset();
      if (btn) {
        btn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>';
        btn.disabled = false;
      }
      showToast();
    }, 1200);
  }
});

// ── Toast Notification ──
function showToast() {
  const toast = document.getElementById('contactToast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── FAQ Accordion ──
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ── Interactive Globe Canvas ──
(function () {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;

  const ctx   = canvas.getContext('2d');
  const W     = canvas.offsetWidth  || 260;
  const H     = canvas.offsetHeight || 260;
  canvas.width  = W;
  canvas.height = H;

  const cx = W / 2;
  const cy = H / 2;
  const R  = W  / 2 - 8;

  // Dot positions representing global presence (lat/lon → projected)
  const cities = [
    [40.7,  -74.0],  // New York
    [51.5,  -0.12],  // London
    [48.8,   2.35],  // Paris
    [55.7,  37.6 ],  // Moscow
    [35.6, 139.7 ],  // Tokyo
    [39.9, 116.4 ],  // Beijing
    [28.6,  77.2 ],  // New Delhi
    [19.0,  72.8 ],  // Mumbai
    [-33.8, 151.2],  // Sydney
    [-23.5, -46.6],  // São Paulo
    [37.7, -122.4],  // San Francisco
    [1.35,  103.8],  // Singapore
    [25.2,  55.3 ],  // Dubai
    [52.5,  13.4 ],  // Berlin
    [41.9,  12.5 ],  // Rome
    [-26.2,  28.0],  // Johannesburg
    [30.0,  31.2 ],  // Cairo
    [43.7,  -79.4],  // Toronto
    [34.0, -118.2],  // Los Angeles
    [60.2,  24.9 ],  // Helsinki
  ];

  let angle = 0;

  function latLonToXY(lat, lon, rotY) {
    const phi   = (90 - lat) * (Math.PI / 180);
    const theta = (lon + rotY) * (Math.PI / 180);
    const x3 = R * Math.sin(phi) * Math.cos(theta);
    const y3 = R * Math.cos(phi);
    const z3 = R * Math.sin(phi) * Math.sin(theta);
    return { x: cx + x3, y: cy - y3, z: z3 };
  }

  function drawGlobe() {
    ctx.clearRect(0, 0, W, H);

    // Globe base sphere gradient
    const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
    grad.addColorStop(0, 'rgba(46,111,64,0.25)');
    grad.addColorStop(1, 'rgba(16,33,23,0.8)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Rim glow
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(104,186,127,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = latLonToXY(lat, lon, angle);
        if (p.z >= 0) {
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
          first = false;
        } else {
          first = true;
        }
      }
      ctx.strokeStyle = 'rgba(104,186,127,0.12)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = latLonToXY(lat, lon, angle);
        if (p.z >= 0) {
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
          first = false;
        } else {
          first = true;
        }
      }
      ctx.strokeStyle = 'rgba(104,186,127,0.12)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // City dots
    cities.forEach(([lat, lon]) => {
      const p = latLonToXY(lat, lon, angle);
      if (p.z < 0) return; // hidden side

      const alpha = Math.min(1, p.z / R + 0.2);
      const size  = 2 + (p.z / R) * 3;

      // Glow ring
      ctx.beginPath();
      ctx.arc(p.x, p.y, size + 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(104,186,127,${alpha * 0.15})`;
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(104,186,127,${alpha * 0.9})`;
      ctx.fill();
    });

    // Shine overlay
    const shine = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, R * 0.05, cx, cy, R);
    shine.addColorStop(0, 'rgba(207,255,220,0.07)');
    shine.addColorStop(0.5, 'transparent');
    shine.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = shine;
    ctx.fill();

    angle += 0.25;
    requestAnimationFrame(drawGlobe);
  }

  drawGlobe();
})();

// ── Spotlight on contact info cards ──
document.querySelectorAll('.contact-info-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `
      radial-gradient(circle 180px at ${x}px ${y}px, rgba(104,186,127,0.08), transparent 60%),
      rgba(255,255,255,0.05)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});