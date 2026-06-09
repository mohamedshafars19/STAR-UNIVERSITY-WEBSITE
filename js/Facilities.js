// Facilities.js — Star University

// Particle background for facility cards
document.querySelectorAll('.fac-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `
      radial-gradient(circle 250px at ${x}px ${y}px, rgba(104,186,127,0.07), transparent 60%),
      rgba(255,255,255,0.05)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});
