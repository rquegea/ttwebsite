import "/style.css?t=1771935251564";

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Overlay Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenuOverlay && mobileMenuCloseBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    mobileMenuCloseBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('is-active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }

  // Gliding underline for navigation
  const navContainer = document.querySelector('.nav ul');
  const headerContainer = document.querySelector('.header');
  const navGlider = document.querySelector('.nav-glider');
  const navItems = document.querySelectorAll('.nav > ul > li:not(.nav-glider)');

  if (navContainer && navGlider && headerContainer) {
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Calculate dimensions relative to the nav container
        const liRect = item.getBoundingClientRect();
        const headerRect = headerContainer.getBoundingClientRect();

        // Update slider position and width
        navGlider.style.width = `${liRect.width}px`;
        navGlider.style.transform = `translateX(${liRect.left - headerRect.left}px)`;
        navGlider.style.opacity = '1';
      });
    });

    // Hide slider when leaving the ul navigation area
    navContainer.addEventListener('mouseleave', () => {
      navGlider.style.opacity = '0';
    });
  }

  // Feature items interactivity
  const featureItems = document.querySelectorAll('.feature-item');

  featureItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active from all
      featureItems.forEach(f => f.classList.remove('active'));
      // Add active to clicked
      item.classList.add('active');
    });
  });

  // Vertical Carousel functionality
  const track = document.getElementById('use-cases-track');
  if (track) {
    let originalItems = Array.from(track.children);
    const originalLength = originalItems.length;

    // Clone all items to create an infinite buffer before and after
    const fragmentBefore = document.createDocumentFragment();
    const fragmentAfter = document.createDocumentFragment();

    originalItems.forEach(item => {
      fragmentBefore.appendChild(item.cloneNode(true));
      fragmentAfter.appendChild(item.cloneNode(true));
    });

    track.insertBefore(fragmentBefore, track.firstChild);
    track.appendChild(fragmentAfter);

    const items = Array.from(track.children);
    // Start strictly in the middle set (which is the true original set)
    let currentIndex = originalLength;

    const updateCarousel = (animate = true) => {
      if (items.length === 0) return;

      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      }

      const item = items[currentIndex];

      const itemCenterLine = item.offsetTop + (item.offsetHeight / 2);
      const windowCenterLine = track.parentElement.offsetHeight / 2;
      const translateY = windowCenterLine - itemCenterLine;

      track.style.transform = `translateY(${translateY}px)`;

      // Update active classes
      items.forEach((it, idx) => {
        // Because of cloning, sometimes items have the same text, but we only light up the exact active one.
        if (idx === currentIndex) {
          it.classList.add('active');
        } else {
          it.classList.remove('active');
        }
      });
    };

    // Initialize display position immediately after font load or next tick
    requestAnimationFrame(() => updateCarousel(false));

    // Some fonts might change heights, so recalculate just in case
    setTimeout(() => updateCarousel(false), 100);

    // Auto loop infinitely
    setInterval(() => {
      currentIndex++;
      updateCarousel(true);

      // If we've scrolled into the cloned post-region
      // we teleport back perfectly seamlessly to the middle region after the transition finishes
      if (currentIndex === (originalLength * 2)) {
        setTimeout(() => {
          currentIndex = originalLength;
          updateCarousel(false);
        }, 600); // 600ms is the CSS transition duration
      }
    }, 2500);

    // Update on window resize to keep it centered
    window.addEventListener('resize', () => updateCarousel(false));
  }

  // Dynamic Word Cycler in Hero
  const dynamicWordEl = document.getElementById('dynamic-word');
  if (dynamicWordEl) {
    const words = ['brands', 'companies', 'teams', 'tech', 'campaigns', 'creativity'];
    let wordIndex = 0;

    setInterval(() => {
      // Fade out
      dynamicWordEl.style.opacity = '0';

      setTimeout(() => {
        // Change word
        wordIndex = (wordIndex + 1) % words.length;
        dynamicWordEl.textContent = words[wordIndex];

        // Fade in
        dynamicWordEl.style.opacity = '1';
      }, 400); // Wait for fade out transition (0.4s)
    }, 3000); // Change every 3s
  }
});
