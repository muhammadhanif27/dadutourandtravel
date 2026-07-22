(function () {
  'use strict';
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.slide-dot'));
  var currentSlide = 0;
  var interval;
  function showSlide(index) { currentSlide = (index + slides.length) % slides.length; slides.forEach(function (slide, i) { slide.classList.toggle('active', i === currentSlide); }); dots.forEach(function (dot, i) { dot.classList.toggle('active', i === currentSlide); }); }
  function startSlider() { interval = window.setInterval(function () { showSlide(currentSlide + 1); }, 5500); }
  dots.forEach(function (dot, i) { dot.addEventListener('click', function () { window.clearInterval(interval); showSlide(i); startSlider(); }); });
  startSlider();

  var reviewTrack = document.getElementById('review-track');
  var reviewSlides = Array.prototype.slice.call(document.querySelectorAll('.review-slide'));
  var reviewDots = document.getElementById('review-dots');
  var reviewIndex = 0;
  var reviewTimer;
  function reviewsPerView() { return window.innerWidth >= 768 ? 3 : 1; }
  function reviewStops() { return reviewSlides.length - reviewsPerView() + 1; }
  function showReview(index) { var stops = reviewStops(); reviewIndex = (index + stops) % stops; reviewTrack.style.transform = 'translateX(-' + (reviewIndex * (100 / reviewsPerView())) + '%)'; Array.prototype.slice.call(reviewDots.children).forEach(function (dot, i) { dot.classList.toggle('active', i === reviewIndex); }); }
  function buildReviewDots() { reviewDots.innerHTML = ''; reviewIndex = 0; for (var i = 0; i < reviewStops(); i += 1) { (function (dotIndex) { var dot = document.createElement('button'); dot.className = 'review-dot' + (dotIndex === 0 ? ' active' : ''); dot.setAttribute('aria-label', 'Show review group ' + (dotIndex + 1)); dot.addEventListener('click', function () { window.clearInterval(reviewTimer); showReview(dotIndex); startReviews(); }); reviewDots.appendChild(dot); }(i)); } showReview(0); }
  function startReviews() { reviewTimer = window.setInterval(function () { showReview(reviewIndex + 1); }, 6000); }
  document.getElementById('review-prev').addEventListener('click', function () { window.clearInterval(reviewTimer); showReview(reviewIndex - 1); startReviews(); });
  document.getElementById('review-next').addEventListener('click', function () { window.clearInterval(reviewTimer); showReview(reviewIndex + 1); startReviews(); });
  window.addEventListener('resize', function () { window.clearTimeout(window.reviewResizeTimer); window.reviewResizeTimer = window.setTimeout(function () { window.clearInterval(reviewTimer); buildReviewDots(); startReviews(); }, 150); });
  buildReviewDots();
  startReviews();

  var scrollTop = document.getElementById('scroll-top');
  window.addEventListener('scroll', function () { scrollTop.classList.toggle('visible', window.pageYOffset > 500); }, { passive: true });
  scrollTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) { var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 }); revealItems.forEach(function (item) { observer.observe(item); }); } else { revealItems.forEach(function (item) { item.classList.add('in-view'); }); }
  document.querySelectorAll('.nav-dropdown button').forEach(function (button) { button.addEventListener('click', function () { button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') !== 'true'); }); });
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  function closeMobileMenu() { menuToggle.classList.remove('open'); mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation menu'); mobileMenu.setAttribute('aria-hidden', 'true'); }
  menuToggle.addEventListener('click', function () { var open = !mobileMenu.classList.contains('open'); menuToggle.classList.toggle('open', open); mobileMenu.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu'); mobileMenu.setAttribute('aria-hidden', String(!open)); });
  mobileMenu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMobileMenu); });

  var packageData = { buggy: { label: '01 · Off-road', title: 'Buggy Adventure', description: 'Drive your own buggy through Kintamani’s rugged tracks, muddy paths, and dramatic volcanic surroundings.', duration: '2 Hours', price: 'From US$45', includes: ['Professional local guide', 'Safety briefing and equipment', 'Buggy ride and fuel', 'Mineral water'] }, jeep: { label: '02 · Sunrise', title: 'Jeep Sunrise', description: 'Start before dawn and ride across Mount Batur’s black lava fields to catch a spectacular sunrise above the caldera.', duration: '4–5 Hours', price: 'From US$65', includes: ['Private 4WD jeep and local driver', 'Sunrise viewpoint access', 'Light breakfast and hot drink', 'Hotel pickup in Kintamani area'] }, waterfall: { label: '03 · Nature', title: 'Nature Waterfall', description: 'Spend a full day reconnecting with nature through cool waterfalls, lake views, village roads, and local flavours.', duration: 'Full Day', price: 'From US$75', includes: ['Local guide and transport', 'Waterfall entrance fees', 'Lunch and mineral water', 'Hotel pickup in Kintamani area'] } };
  var modal = document.getElementById('package-modal');
  var lastTrigger;
  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastTrigger) { lastTrigger.focus(); } }
  document.querySelectorAll('.package-trigger').forEach(function (trigger) { trigger.addEventListener('click', function () { var data = packageData[trigger.getAttribute('data-package')]; lastTrigger = trigger; document.getElementById('modal-label').textContent = data.label; document.getElementById('modal-title').textContent = data.title; document.getElementById('modal-description').textContent = data.description; document.getElementById('modal-duration').textContent = data.duration; document.getElementById('modal-price').textContent = data.price; document.getElementById('modal-includes').innerHTML = data.includes.map(function (item) { return '<li>' + item + '</li>'; }).join(''); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; modal.querySelector('.modal-close').focus(); }); });
  modal.querySelectorAll('[data-modal-close]').forEach(function (element) { element.addEventListener('click', closeModal); });
  document.getElementById('modal-book').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && modal.classList.contains('open')) { closeModal(); } });
}());
