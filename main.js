const textElement = document.getElementById('hero-title');
const words = ["Full Stack Developer", "Web Developer", "Front-End Developer", "UI/UX Designer", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {

    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000;
  }

  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}


document.addEventListener('DOMContentLoaded', type);

function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };


  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = c.hero_name;
  const navName = document.getElementById('nav-name');
  if (navName) navName.textContent = c.hero_name;
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = c.hero_title;
  const heroSub = document.getElementById('hero-subtitle');
  if (heroSub) heroSub.textContent = c.hero_subtitle;
  const aboutText = document.getElementById('about-text');
  if (aboutText) aboutText.textContent = c.about_text;
  const s1 = document.getElementById('service1-title');
  if (s1) s1.textContent = c.service1_title;
  const s2 = document.getElementById('service2-title');
  if (s2) s2.textContent = c.service2_title;
  const s3 = document.getElementById('service3-title');
  if (s3) s3.textContent = c.service3_title;
  const s4 = document.getElementById('service4-title');
  if (s4) s4.textContent = c.service4_title;
  const ctaBtn = document.getElementById('hero-cta');
  if (ctaBtn) ctaBtn.querySelector('span').textContent = c.cta_text;

  document.getElementById('app-root').style.background = c.background_color;
  document.getElementById('app-root').style.color = c.text_color;

  document.querySelectorAll('[style*="color: #f59e0b"], [style*="color:#f59e0b"]').forEach(el => {
    if (el.style.color === 'rgb(245, 158, 11)' || el.style.color === '#f59e0b') {
      el.style.color = c.accent_color;
    }
  });


  const fontStack = `${c.font_family}, Arial, sans-serif`;
  document.body.style.fontFamily = fontStack;

  const base = c.font_size;
  document.querySelectorAll('h2.section-heading, #hero-name').forEach(el => {
    el.style.fontSize = `${base * 3}px`;
  });
  document.querySelectorAll('#hero-title').forEach(el => {
    el.style.fontSize = `${base * 1.75}px`;
  });
  document.querySelectorAll('p, .text-sm').forEach(el => {
    if (!el.closest('.counter')) el.style.fontSize = `${base * 0.875}px`;
  });
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => onConfigChange(config),
    mapToCapabilities: (config) => {
      const c = { ...defaultConfig, ...config };
      return {
        recolorables: [
          { get: () => c.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
          { get: () => c.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
          { get: () => c.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
          { get: () => c.accent_color, set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } },
          { get: () => c.muted_color, set: (v) => { config.muted_color = v; window.elementSdk.setConfig({ muted_color: v }); } }
        ],
        borderables: [],
        fontEditable: {
          get: () => c.font_family,
          set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
        },
        fontSizeable: {
          get: () => c.font_size,
          set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
        }
      };
    },
    mapToEditPanelValues: (config) => {
      const c = { ...defaultConfig, ...config };
      return new Map([
        ['hero_name', c.hero_name],
        ['hero_title', c.hero_title],
        ['hero_subtitle', c.hero_subtitle],
        ['about_text', c.about_text],
        ['service1_title', c.service1_title],
        ['service2_title', c.service2_title],
        ['service3_title', c.service3_title],
        ['service4_title', c.service4_title],
        ['cta_text', c.cta_text]
      ]);
    }
  });
}

function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}


function animateSkills() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const w = bar.dataset.width;
    setTimeout(() => { bar.style.width = w + '%'; }, 200);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.querySelector('.counter')) animateCounters();
      if (entry.target.querySelector('.skill-bar-fill')) animateSkills();
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.style.background = 'rgba(255,255,255,0.04)';
      b.style.color = '#a0a0a0';
      b.classList.remove('active');
    });
    btn.style.background = '#f59e0b';
    btn.style.color = '#0a0a0a';
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.transition = 'all 0.4s ease';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

function toggleFaq(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';


  document.querySelectorAll('.faq-content').forEach(c => {
    c.style.maxHeight = '0px';
    c.style.paddingBottom = '0';
  });
  document.querySelectorAll('.faq-toggle i').forEach(i => {
    i.style.transform = 'rotate(0deg)';
  });

  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.paddingBottom = '0';
    icon.style.transform = 'rotate(180deg)';
  }
}


document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});


document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});


document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('contact-form').classList.add('hidden');
  document.getElementById('form-success').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('contact-form').classList.remove('hidden');
    document.getElementById('form-success').classList.add('hidden');
    document.getElementById('contact-form').reset();
  }, 4000);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const appRoot = document.getElementById('app-root');
appRoot.addEventListener('scroll', () => {
  const scrollY = appRoot.scrollTop + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`nav a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
        link.style.color = '#f59e0b';
      } else {
        link.classList.remove('active');
        link.style.color = '#a0a0a0';
      }
    }
  });
});

setTimeout(animateCounters, 500);
lucide.createIcons();

window.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("backToTop");
  const container = document.getElementById("app-root");

  if (!btn || !container) {
    console.log("❌ Element not found");
    return;
  }

  container.addEventListener("scroll", function () {
    if (container.scrollTop > 200) {
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    } else {
      btn.style.opacity = "0";
      btn.style.pointerEvents = "none";
    }
  });

  btn.addEventListener("click", function () {
    container.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});
  const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault(); 
  const name = encodeURIComponent(document.getElementById('cf-name').value.trim());
  const email = encodeURIComponent(document.getElementById('cf-email').value.trim());
  const phone = encodeURIComponent(document.getElementById('cf-phone').value.trim());
  const subject = encodeURIComponent(document.getElementById('cf-subject').value.trim());
  const budget = encodeURIComponent(document.getElementById('cf-budget').value.trim());
  const message = encodeURIComponent(document.getElementById('cf-message').value.trim());
  const not_full = document.getElementById("not_full");

  if (!name || !email || !subject || !budget || !phone || !message) {
      // alert("Please fill in all fields");
      not_full.innerHTML = `
            <div id="form-error" class="flex items-center rounded-xl p-2 text-red-800 border-t-4 border-red-300 bg-red-50" role="alert">
                <i class="fa-solid fa-circle-xmark mr-2"></i>
                <div class="text-sm font-medium">Please fill in all fields!</div>
            </div>`;
      return;
    }

    console.log("Form Data:", { name, email, subject, budget, phone, message });

  const body = `Name: ${name}%0D%0AEmail: ${email} %0D%0APhone: ${phone} %0D%0AProject Type: ${subject}%0D%0ABudget: ${budget}%0D%0AMessage: ${message}`;

  window.location.href = `mailto:ah.wa.ah12@gmail.com?subject=New Project Inquiry&body=${body}`;
});


document.addEventListener('contextmenu', (e) => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) { 
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { 
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { 
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { 
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
};