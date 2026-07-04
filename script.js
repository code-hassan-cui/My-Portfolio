const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if(toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
  if(!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const typed = document.getElementById('typedText');
const words = ['WordPress Websites', 'Shopify Stores', 'Landing Pages', 'Modern Animated UI'];
let wi = 0, ci = 0, deleting = false;
function typeLoop(){
  const word = words[wi];
  typed.textContent = word.slice(0, ci);
  if(!deleting && ci < word.length) ci++;
  else if(deleting && ci > 0) ci--;
  else { deleting = !deleting; if(!deleting) wi = (wi + 1) % words.length; }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
if(typed) typeLoop();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('[data-count]').forEach(counter => {
        if(counter.dataset.done) return;
        counter.dataset.done = 'true';
        const target = Number(counter.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 42));
        const timer = setInterval(() => {
          current += step;
          if(current >= target){ current = target; clearInterval(timer); }
          counter.textContent = target === 100 ? current + '%' : current + '+';
        }, 28);
      });
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => { if(window.scrollY >= section.offsetTop - 130) current = section.id; });
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

const tilt = document.querySelector('.tilt-card');
if(tilt){
  tilt.addEventListener('mousemove', e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  tilt.addEventListener('mouseleave', () => tilt.style.transform = 'rotateY(0deg) rotateX(0deg)');
}

const waToggle = document.querySelector('.wa-toggle');
const waBox = document.querySelector('.wa-box');
const waClose = document.querySelector('.wa-close');
if(waToggle && waBox) waToggle.addEventListener('click', () => waBox.classList.toggle('open'));
if(waClose && waBox) waClose.addEventListener('click', () => waBox.classList.remove('open'));
if(waBox) setTimeout(() => waBox.classList.add('open'), 2500);

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
if(form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending...';
  const formData = new FormData(form);
  try {
    const res = await fetch('https://formsubmit.co/ajax/sherazh902@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });
    if (!res.ok) throw new Error('Form service error');
    form.reset();
    statusEl.textContent = 'Thank you! Your message has been submitted.';
  } catch (err) {
    statusEl.textContent = 'Message could not be submitted. Please WhatsApp or email me directly.';
  }
});


const articles = {
  shopify: {
    category: 'Shopify',
    title: 'How I Improve Shopify Store Layouts',
    meta: 'Hassan Sheraz • July 4, 2026 • 4 min read',
    content: `<p>A strong Shopify store should guide visitors from the hero banner to collections, products and checkout without confusion. I usually start by checking the homepage flow, mobile spacing, collection cards and product visibility.</p><h3>My Shopify layout checklist</h3><ul><li>Clear hero banner with one main call-to-action.</li><li>Featured collections above the fold on mobile.</li><li>Product cards with clean images, sale badges and visible prices.</li><li>Trust elements like WhatsApp support, delivery info and reviews.</li></ul><p>Small UI improvements such as better spacing, polished banners, sale tabs and responsive sections can make the store feel more professional and improve user trust.</p>`
  },
  wordpress: {
    category: 'WordPress',
    title: 'My Process for Building WordPress Websites',
    meta: 'Hassan Sheraz • June 28, 2026 • 5 min read',
    content: `<p>For WordPress websites, I focus on structure first. A good website is not only about design; it should be easy to update, responsive on mobile and optimized for users.</p><h3>My usual workflow</h3><ul><li>Plan the pages and sections before starting Elementor work.</li><li>Create a clean header, footer and consistent typography.</li><li>Build responsive sections for mobile, tablet and desktop.</li><li>Set forms, buttons, WhatsApp links and basic SEO.</li></ul><p>This approach helps clients manage their website easily while still getting a premium, modern and professional design.</p>`
  },
  landing: {
    category: 'Landing Pages',
    title: 'What Makes a Landing Page Convert?',
    meta: 'Hassan Sheraz • June 20, 2026 • 4 min read',
    content: `<p>A landing page needs to communicate value quickly. Visitors should understand the offer, trust the brand and know exactly what action to take.</p><h3>Important conversion points</h3><ul><li>A clear headline and short supporting paragraph.</li><li>Strong CTA buttons placed in visible areas.</li><li>Social proof, testimonials or project results.</li><li>Fast loading and mobile-first spacing.</li></ul><p>When I build landing pages, I focus on clean visuals, direct copy, smooth animations and a simple user journey from headline to contact.</p>`
  }
};

const modal = document.getElementById('articleModal');
const modalTitle = document.getElementById('articleTitle');
const modalCategory = document.getElementById('articleCategory');
const modalMeta = document.getElementById('articleMeta');
const modalContent = document.getElementById('articleContent');

document.querySelectorAll('[data-article]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const article = articles[link.dataset.article];
    if(!article || !modal) return;
    modalCategory.textContent = article.category;
    modalTitle.textContent = article.title;
    modalMeta.textContent = article.meta;
    modalContent.innerHTML = article.content;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  });
});

document.querySelectorAll('[data-close-article]').forEach(btn => {
  btn.addEventListener('click', () => {
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  });
});
window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal){
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
});

// Extra safety: keep projects visible on mobile even if scroll animations fail
(function(){
  const projects = document.getElementById('projects');
  if(projects){
    projects.classList.add('visible');
    projects.style.opacity = '1';
    projects.style.visibility = 'visible';
    projects.style.transform = 'none';
  }
  document.querySelectorAll('#projects .project-card').forEach(card => {
    card.style.opacity = '1';
    card.style.visibility = 'visible';
    card.style.transform = 'none';
  });
})();
