// Initialize AOS animations
AOS.init({ once: true, duration: 700 });

// Newsletter dummy handler
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const newsForm = document.getElementById('newsletterForm');
  if (newsForm) newsForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks for subscribing! (Demo)');
    newsForm.reset();
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    contactForm.reset();
  });

  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks for registering! (Demo)');
    registerForm.reset();
  });

  // Fun fact counters (animate on scroll into view)
  const counters = document.querySelectorAll('.counter');
  const animateCounter = el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let curr = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const tick = () => {
      curr += step;
      if (curr >= target) { el.textContent = target; return; }
      el.textContent = curr;
      requestAnimationFrame(tick);
    };
    tick();
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .6 });
  counters.forEach(c => io.observe(c));

  // Simple client-side search demo
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  const qEl = document.getElementById('query');
  const res = document.getElementById('results');
  if (qEl && res) {
    qEl.textContent = q || '';
    const items = [
      { title:'Education Programs', img:'assets/img/blog1.jpg', link:'blog-post.html' },
      { title:'Health Camp Highlights', img:'assets/img/blog2.jpg', link:'blog-post.html' },
      { title:'Trees for Tomorrow', img:'assets/img/blog3.jpg', link:'blog-post.html' },
    ];
    const filtered = q ? items.filter(i => i.title.toLowerCase().includes(q.toLowerCase())) : items;
    res.innerHTML = filtered.map(i => `
      <div class="col-md-4">
        <div class="card h-100 hover-lift border-0 shadow-sm rounded-4">
          <img src="${i.img}" class="card-img-top rounded-top-4" alt="${i.title}">
          <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <a href="${i.link}" class="stretched-link">Read more</a>
          </div>
        </div>
      </div>
    `).join('');
  }
});
