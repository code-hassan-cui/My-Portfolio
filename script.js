const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
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
typeLoop();

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
waToggle.addEventListener('click', () => waBox.classList.toggle('open'));
waClose.addEventListener('click', () => waBox.classList.remove('open'));
setTimeout(() => waBox.classList.add('open'), 2500);

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
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
