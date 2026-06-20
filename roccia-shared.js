/* roccia-shared.js — nav, footer, modal injected on every page */

(function() {
  /* ── ACTIVE PAGE ── */
  const page = location.pathname.split('/').pop() || 'index.html';

  /* ── NAV ── */
  const navLinks = [
    { href:'services.html', label:'Services' },
    { href:'pricing.html',  label:'Pricing'  },
    { href:'partners.html', label:'Partners'  },
    { href:'blog.html',     label:'Blog'      },
    { href:'contact.html',  label:'Contact'   },
  ];

  const navHTML = `
<nav id="main-nav">
  <a href="index.html" class="nav-logo">
    <img src="logo.png" alt="Roccia">
    <span class="nav-logo-text">Roccia</span>
  </a>
  <ul class="nav-links" id="nav-links">
    ${navLinks.map(l=>`<li><a href="${l.href}"${page===l.href?' class="active"':''}>${l.label}</a></li>`).join('')}
    <li><a href="#" class="nav-cta" onclick="openModal();return false;">Book Free Consultation</a></li>
  </ul>
  <div class="hamburger" id="hamburger" onclick="toggleMenu()">
    <span></span><span></span><span></span>
  </div>
</nav>`;

  /* ── FOOTER ── */
  const footerHTML = `
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <a href="index.html" class="nav-logo" style="display:inline-flex;">
        <img src="logo.png" alt="Roccia" style="width:32px;height:32px;">
        <span class="nav-logo-text">Roccia</span>
      </a>
      <p>Modern digital marketing for businesses ready to grow. We build brands that people remember and strategies that deliver results.</p>
    </div>
    <div class="footer-col">
      <h5>Services</h5>
      <ul>
        <li><a href="services.html">SEO &amp; GEO</a></li>
        <li><a href="services.html">Paid Advertising</a></li>
        <li><a href="services.html">Social Media</a></li>
        <li><a href="services.html">Content Creation</a></li>
        <li><a href="services.html">AI Automation</a></li>
        <li><a href="services.html">Brand Strategy</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Company</h5>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="partners.html">Partners</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Plans</h5>
      <ul>
        <li><a href="pricing.html">Coaching — $450/mo</a></li>
        <li><a href="pricing.html">Basic — $650/mo</a></li>
        <li><a href="pricing.html">Pro — $1,300/mo</a></li>
        <li><a href="pricing.html">Premium — $2,000/mo</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 Roccia Marketing. All rights reserved.</p>
    <p>Privacy Policy · Terms of Service</p>
  </div>
</footer>`;

  /* ── MODAL ── */
  const modalHTML = `
<div class="modal-overlay" id="modal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()">×</button>
    <h3>Book Your Free Consultation</h3>
    <p>Pick a time that works for you. We'll learn about your business and map out a growth plan together.</p>
    <div class="calendly-placeholder">
      📅 Calendly scheduler loads here.<br><br>
      Replace this block with:<br>
      <code style="font-size:12px;color:var(--sky)">&lt;div class="calendly-inline-widget" data-url="https://calendly.com/YOUR-LINK"&gt;&lt;/div&gt;</code>
    </div>
  </div>
</div>`;

  /* ── INJECT ── */
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── HAMBURGER ── */
  window.toggleMenu = function() {
    document.getElementById('nav-links').classList.toggle('open');
  };

  /* ── MODAL ── */
  window.openModal = function() {
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.addEventListener('click', function(e) {
    const m = document.getElementById('modal');
    if (e.target === m) closeModal();
  });

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── COUNTER ANIMATION ── */
  window.initCounters = function() {
    function animateCounter(el, target) {
      let start = 0;
      const duration = 1800;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.target);
          const countEl = e.target.querySelector('.count');
          if (countEl) animateCounter(countEl, target);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.result-block').forEach(b => counterObs.observe(b));
  };

  /* ── FAQ ── */
  window.initFaq = function(faqs, containerId) {
    const list = document.getElementById(containerId);
    if (!list) return;
    faqs.forEach((f, i) => {
      const item = document.createElement('div');
      item.style.cssText = 'border-bottom:1px solid rgba(111,174,189,0.1);';
      item.innerHTML = `
        <button onclick="toggleFaq(${i},'${containerId}')" style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:22px 0;background:none;border:none;cursor:pointer;text-align:left;gap:20px">
          <span style="font-size:16px;font-weight:600;color:var(--white);font-family:Inter,sans-serif">${f.q}</span>
          <span id="faq-icon-${i}" style="color:var(--sky);font-size:22px;flex-shrink:0;transition:transform 0.3s">+</span>
        </button>
        <div id="faq-ans-${i}" style="max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.16,1,0.3,1)">
          <p style="font-size:14px;color:rgba(223,223,227,0.55);line-height:1.7;padding-bottom:20px">${f.a}</p>
        </div>`;
      list.appendChild(item);
    });
  };
  window.toggleFaq = function(i, cid) {
    const ans = document.getElementById(`faq-ans-${i}`);
    const icon = document.getElementById(`faq-icon-${i}`);
    const isOpen = ans.style.maxHeight && ans.style.maxHeight !== '0px';
    document.querySelectorAll('[id^="faq-ans-"]').forEach(a => a.style.maxHeight = '0px');
    document.querySelectorAll('[id^="faq-icon-"]').forEach(ic => { ic.textContent = '+'; ic.style.transform = ''; });
    if (!isOpen) { ans.style.maxHeight = ans.scrollHeight + 'px'; icon.textContent = '−'; icon.style.transform = 'rotate(180deg)'; }
  };

})();
