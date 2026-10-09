// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    
    if (!isActive) {
      faqItem.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== RIPPLE EFFECT ON BUTTONS =====
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.background = 'rgba(255, 255, 255, 0.4)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--brown) 0%, var(--brown-light) 100%);
  z-index: 10001;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
});

// ===== TEXT REVEAL ON SCROLL =====
function revealText() {
  const reveals = document.querySelectorAll('.section-title, .section-text');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealText);

// ===== REVIEW MODAL & RATING INTERACTION =====
const btnOpenReviewModal = document.getElementById('btnOpenReviewModal');
const btnCloseReviewModal = document.getElementById('btnCloseReviewModal');
const reviewModal = document.getElementById('reviewModal');
const reviewForm = document.getElementById('reviewForm');
const starPicker = document.getElementById('starPicker');
const reviewRatingInput = document.getElementById('reviewRating');
const reviewSuccessMsg = document.getElementById('reviewSuccessMsg');

if (btnOpenReviewModal && reviewModal) {
  btnOpenReviewModal.addEventListener('click', () => {
    reviewModal.classList.add('active');
  });
}

if (btnCloseReviewModal && reviewModal) {
  btnCloseReviewModal.addEventListener('click', () => {
    reviewModal.classList.remove('active');
  });

  reviewModal.addEventListener('click', (e) => {
    if (e.target === reviewModal) {
      reviewModal.classList.remove('active');
    }
  });
}

if (starPicker) {
  const stars = starPicker.querySelectorAll('span');
  
  stars.forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => {
        if (i <= idx) s.classList.add('hover');
        else s.classList.remove('hover');
      });
    });

    starPicker.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });

    star.addEventListener('click', () => {
      const ratingVal = star.getAttribute('data-rating');
      reviewRatingInput.value = ratingVal;
      
      stars.forEach((s, i) => {
        if (i < ratingVal) s.classList.add('active');
        else s.classList.remove('active');
      });
    });
  });
}

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reviewName').value.trim();
    const service = document.getElementById('reviewService').value;
    const rating = parseInt(reviewRatingInput.value, 10);
    const comment = document.getElementById('reviewComment').value.trim();
    
    if (!name || !comment) return;

    // Gerar estrelas
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      starsHtml += i < rating ? '★' : '☆';
    }

    // Criar o card e adicionar ao topo do grid
    const grid = document.querySelector('.avaliacoes-grid');
    if (grid) {
      const firstLetter = name.charAt(0).toUpperCase();
      const newCard = document.createElement('div');
      newCard.className = 'avaliacao-card visible';
      newCard.style.animation = 'fadeInUp 0.6s ease-out';
      newCard.innerHTML = `
        <div class="avaliacao-header">
          <div class="patient-avatar">${firstLetter}</div>
          <div class="patient-info">
            <h3 class="patient-name">${name}</h3>
            <span class="patient-tag">${service}</span>
          </div>
          <div class="avaliacao-stars">${starsHtml}</div>
        </div>
        <p class="avaliacao-text">"${comment}"</p>
        <span class="avaliacao-date">Agora mesmo</span>
      `;
      grid.prepend(newCard);
    }

    // Exibir mensagem de sucesso
    reviewForm.style.display = 'none';
    reviewSuccessMsg.style.display = 'block';

    setTimeout(() => {
      reviewModal.classList.remove('active');
      setTimeout(() => {
        reviewForm.reset();
        reviewForm.style.display = 'block';
        reviewSuccessMsg.style.display = 'none';
      }, 300);
    }, 2500);
  });
}

// ===== FX: titulo palavra por palavra + holofote/tilt =====
(function () {
  function splitTitle(title) {
    var full = title.textContent.trim();
    var frag = document.createDocumentFragment();
    var idx = 0;
    Array.prototype.forEach.call(title.childNodes, function (node) {
      var isEl = node.nodeType === 1;
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '));
          return;
        }
        var s = document.createElement('span');
        s.className = 'w' + (isEl ? ' hl' : '');
        s.style.setProperty('--i', idx++);
        s.textContent = part;
        s.setAttribute('aria-hidden', 'true');
        frag.appendChild(s);
      });
    });
    title.innerHTML = '';
    title.appendChild(frag);
    title.setAttribute('aria-label', full);
    var scope = title.closest('[data-animate]') || title.parentElement;
    scope.classList.add('split');
  }
  document.querySelectorAll('.especialidade-title, .desejo-title').forEach(splitTitle);

  function addTilt(el, maxRX, maxRY) {
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width;
      var y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      el.style.setProperty('--rx', ((0.5 - y) * maxRX).toFixed(2) + 'deg');
      el.style.setProperty('--ry', ((x - 0.5) * maxRY).toFixed(2) + 'deg');
    });
    el.addEventListener('mouseleave', function () {
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '40%');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
  addTilt(document.querySelector('.especialidade-card'), 5, 7);
  addTilt(document.querySelector('.desejo-image'), 6, 8);
})();

// ===== FX: contadores animados =====
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    var dur = 1500;
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        runCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(function (el) { io.observe(el); });
})();

// ===== FX: letreiros rolantes (duplica copias ate cobrir a faixa) =====
(function () {
  document.querySelectorAll('.ann-track').forEach(function (track) {
    var bar = track.parentElement;
    var base = track.innerHTML;
    var guard = 0;
    while (track.scrollWidth < bar.clientWidth * 2 && guard < 20) {
      track.innerHTML += base;
      guard++;
    }
  });
})();

// ===== FX: maquina de escrever no hero =====
(function () {
  var sub = document.querySelector('.hero-subtitle');
  if (!sub) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var full = sub.textContent.trim();
  var span = document.createElement('span');
  span.textContent = full;
  sub.textContent = '';
  sub.appendChild(span);
  sub.style.minHeight = sub.scrollHeight + 'px';
  span.textContent = '';
  sub.classList.add('typing');
  var i = 0;
  setTimeout(function tick() {
    i++;
    span.textContent = full.slice(0, i);
    if (i < full.length) setTimeout(tick, 16);
    else setTimeout(function () { sub.classList.remove('typing'); }, 1200);
  }, 1400);
})();