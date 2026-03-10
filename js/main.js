document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a standard link (not a dropdown toggle)
    document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(n => n.addEventListener('click', () => {
      navMenu.classList.remove('show');
      mobileToggle.querySelector('i').classList.remove('fa-times');
      mobileToggle.querySelector('i').classList.add('fa-bars');
    }));

    // Handle dropdown toggle on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parentLi = this.parentElement;
        parentLi.classList.toggle('active');
        const dropdownMenu = parentLi.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
      });
    });
  }

  // 2. Sticky Header styling on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Scroll Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  fadeElements.forEach(el => {
    appearOnScroll.observe(el);
  });

  // 4. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // toggle current
      item.classList.toggle('active');
    });
  });

});
