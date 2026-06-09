// Gallery.js — Star University

// ── Gallery Filter ──
const filterBtns = document.querySelectorAll('[data-gal]');
const galItems   = document.querySelectorAll('.gal-item[data-gal]');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.gal;
    galItems.forEach(item => {
      const match = cat === 'all' || item.dataset.gal === cat;
      if (match) { item.classList.remove('hidden'); item.style.display = ''; }
      else        { item.classList.add('hidden'); setTimeout(() => { if(item.classList.contains('hidden')) item.style.display='none'; },400); }
    });
  });
});

// ── Lightbox ──
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbCounter = document.getElementById('lbCounter');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');

let currentIndex = 0;
let visibleItems = [];

function openLightbox(index) {
  visibleItems = Array.from(galItems).filter(i => !i.classList.contains('hidden') && i.style.display !== 'none');
  currentIndex = index;
  showImage(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showImage(i) {
  const item = visibleItems[i];
  if (!item) return;
  lbImg.classList.add('loading');
  setTimeout(() => {
    lbImg.src = item.dataset.src || item.querySelector('img')?.src;
    lbCaption.textContent = item.dataset.caption || '';
    lbCounter.textContent = `${i + 1} / ${visibleItems.length}`;
    lbImg.onload = () => lbImg.classList.remove('loading');
  }, 150);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 400);
}

// Attach click to each gallery item
galItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    visibleItems = Array.from(galItems).filter(i => !i.classList.contains('hidden') && i.style.display !== 'none');
    const visIdx = visibleItems.indexOf(item);
    openLightbox(visIdx >= 0 ? visIdx : idx);
  });
});

lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

lbPrev?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showImage(currentIndex);
});

lbNext?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImage(currentIndex);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { currentIndex=(currentIndex-1+visibleItems.length)%visibleItems.length; showImage(currentIndex); }
  if (e.key === 'ArrowRight') { currentIndex=(currentIndex+1)%visibleItems.length; showImage(currentIndex); }
});

// Touch swipe
let touchStartX = 0;
lightbox?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
lightbox?.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx < 0) { currentIndex=(currentIndex+1)%visibleItems.length; }
    else        { currentIndex=(currentIndex-1+visibleItems.length)%visibleItems.length; }
    showImage(currentIndex);
  }
});
