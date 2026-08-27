/* ============================================================
   GET BLESSED BARBERSHOP — Vanilla JavaScript
   Mobile menu, lightbox, scroll effects, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Menu Toggle ----
  const menuToggle  = document.getElementById('menu-toggle');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    menuToggle.classList.add('active');
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when a nav link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  // ---- Sticky Header Background on Scroll ----
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Run on load


  // ---- Back to Top Button ----
  const backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      backToTop.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
      backToTop.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      backToTop.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  }

  window.addEventListener('scroll', updateBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ---- Gallery Lightbox ----
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  let currentImageIndex = 0;
  let galleryData = [];
  
  // Extract data once to avoid querying the DOM repeatedly
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryData.push({
        src: img.src.replace('w=600', 'w=1200'),
        alt: img.alt
      });
      
      // Click event for opening lightbox
      item.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightboxImage(false);
        openLightbox();
      });
    }
  });

  function updateLightboxImage(animate = true) {
    if (animate) {
      lightboxImg.classList.add('opacity-0');
      setTimeout(() => {
        lightboxImg.src = galleryData[currentImageIndex].src;
        lightboxImg.alt = galleryData[currentImageIndex].alt;
        lightboxImg.classList.remove('opacity-0');
      }, 150);
    } else {
      lightboxImg.src = galleryData[currentImageIndex].src;
      lightboxImg.alt = galleryData[currentImageIndex].alt;
      lightboxImg.classList.remove('opacity-0');
    }
  }

  function openLightbox() {
    lightbox.classList.remove('hidden');
    requestAnimationFrame(() => {
      lightbox.classList.add('active');
    });
    document.body.classList.add('menu-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('menu-open');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
    }, 300);
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateLightboxImage();
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxImage();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });

  // Close on outside click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard controls & Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!lightbox.classList.contains('hidden')) closeLightbox();
      if (mobileMenu && mobileMenu.classList.contains('translate-x-0')) closeMenu();
    }
    if (!lightbox.classList.contains('hidden')) {
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  // Swipe Support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNextImage();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showPrevImage();
    }
  }


  // ---- Scroll-triggered Fade-in Animations (Intersection Observer) ----
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation slightly for elements entering together
          const delay = Math.min(index * 80, 400);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(el => el.classList.add('visible'));
  }


  // ---- Contact Form Handling ----
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const action   = contactForm.getAttribute('action');

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.classList.add('hidden');
          formSuccess.classList.remove('hidden');
        } else {
          alert('Something went wrong. Please call us at (229) 300-5335.');
        }
      } catch (error) {
        alert('Something went wrong. Please call us at (229) 300-5335.');
      }
    });
  }


  // ---- Active Nav Link Highlighting on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"], #mobile-menu a[href^="#"]');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('text-gold');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('text-gold');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

});
