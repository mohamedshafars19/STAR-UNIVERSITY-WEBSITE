/* ============================================
   STAR UNIVERSITY — SHARED GLOBAL JS
   ============================================ */

// ── Page Loader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

// ── Custom Cursor ──
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.innerWidth > 768) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button,.btn,.social-icon,.nav-logo').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(104,186,127,0.9)';
      dot.style.transform = 'translate(-50%,-50%) scale(0)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(104,186,127,0.6)';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ── Navbar Scroll ──
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  if (progressBar) {
    const doc  = document.documentElement;
    const scrolled = doc.scrollTop;
    const total    = doc.scrollHeight - doc.clientHeight;
    progressBar.style.transform = `scaleX(${scrolled / total})`;
  }
});

// ── Hamburger / Mobile Nav ──
const burger    = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}

// ── Active Nav Link ──
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
const currentPage = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
  const href = link.getAttribute('href') || '';
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Reveal on Scroll ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0) * 1);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Counter Animation ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current).toLocaleString();
  }, 16);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ── AI Chat Widget ──
const chatBtn    = document.querySelector('.ai-chat-btn');
const chatWidget = document.querySelector('.ai-chat-widget');
const chatInput  = document.querySelector('.chat-input');
const chatSend   = document.querySelector('.chat-send');
const chatMsgs   = document.querySelector('.chat-messages');

const botReplies = [
  "Welcome to Star University! How can I assist you today?",
  "Our admissions are open for 2025-26. Would you like more information?",
  "Star University offers 350+ courses across Engineering, Arts, Commerce and more!",
  "Our placement rate is 99% — companies like Google, Amazon & Tesla recruit here.",
  "You can reach us at admissions@staruniversity.edu for personalized guidance.",
  "Our campus features AI Labs, Smart Library, and world-class sports facilities.",
];

let botIndex = 0;

if (chatBtn && chatWidget) {
  // Store original icon (assumes chatBtn initially contains 🤖)
  chatBtn.innerHTML = '<i class="fas fa-robot"></i>'; // or fa-comment-dots

  chatBtn.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    const isOpen = chatWidget.classList.contains('open');
    chatBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-robot"></i>';
  });
}
function addMsg(text, type) {
  if (!chatMsgs) return;
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  msg.textContent = text;
  chatMsgs.appendChild(msg);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function sendMessage() {
  const text = chatInput?.value?.trim();
  if (!text) return;
  addMsg(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    addMsg(botReplies[botIndex % botReplies.length], 'bot');
    botIndex++;
  }, 800);
}

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ── Tilt Effect ──
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateY(${x * 0.012}deg) rotateX(${-y * 0.012}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Floating Blob Follow Mouse ──
const followBlob = document.querySelector('.follow-blob');
if (followBlob) {
  document.addEventListener('mousemove', e => {
    followBlob.style.left = e.clientX - 200 + 'px';
    followBlob.style.top  = e.clientY - 200 + 'px';
  });
}

// ── Magnetic Buttons ──
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
