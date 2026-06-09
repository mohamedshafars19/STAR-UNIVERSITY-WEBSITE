// Courses.js — Star University

// ── Course Filter System ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.course-card');
const noResults = document.getElementById('noResults');

function filterCourses(category) {
  let visible = 0;

  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    if (match) {
      card.classList.remove('hidden');
      card.style.display = '';
      visible++;
    } else {
      card.classList.add('hidden');
      setTimeout(() => {
        if (card.classList.contains('hidden')) card.style.display = 'none';
      }, 400);
    }
  });

  noResults.style.display = visible === 0 ? 'block' : 'none';
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCourses(btn.dataset.filter);
  });
});

// ── Spotlight Hover on Cards ──
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `
      radial-gradient(circle 200px at ${x}px ${y}px, rgba(104,186,127,0.08), transparent 60%),
      rgba(255,255,255,0.05)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});
