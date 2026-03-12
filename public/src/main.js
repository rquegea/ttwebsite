


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

  // Mega-menu hover with delay to prevent flicker
  const dropdowns = document.querySelectorAll('.has-dropdown');
  let dropdownTimer = null;

  dropdowns.forEach(item => {
    item.addEventListener('mouseenter', () => {
      clearTimeout(dropdownTimer);
      dropdowns.forEach(d => d.classList.remove('is-open'));
      item.classList.add('is-open');
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(dropdownTimer);
      item.classList.remove('is-open');
    });
  });

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
    const originalItemsList = Array.from(track.children);
    const originalLength = originalItemsList.length;
    const itemHeight = 80;

    // Clone all items multiple times so we have infinite scroll buffer before and after
    originalItemsList.forEach(item => track.appendChild(item.cloneNode(true)));
    originalItemsList.forEach(item => track.appendChild(item.cloneNode(true)));
    originalItemsList.forEach(item => track.appendChild(item.cloneNode(true)));

    // Refresh the node list with the clones
    const allItems = Array.from(track.children);

    // Start pointing at the first item of the SECOND cloned batch to ensure we have elements above it.
    // That means index = originalLength. We don't start at 0 so it's surrounded by content instantly.
    let currentIndex = originalLength;

    const updateCarousel = (animate = true) => {
      // 1) Update active classes
      allItems.forEach((it, idx) => {
        // Light up the current one, AND any corresponding clones so math doesn't skew heights
        if (idx % originalLength === currentIndex % originalLength) {
          it.classList.add('is-active');
        } else {
          it.classList.remove('is-active');
        }
      });

      // 2) Scroll track vertically
      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      }

      // Viewport container is exactly 280px tall. Visual center is at 140px.
      // Top of track to top of current item = currentIndex * 80
      // Center of current item = (currentIndex * 80) + 40
      // We want this center point to sit at 140px from the top of the container
      const translateY = 140 - ((currentIndex * itemHeight) + (itemHeight / 2));

      track.style.transform = `translateY(${translateY}px)`;
    };

    // Execute instantly for layout on frame 0
    updateCarousel(false);

    // Run carousel
    let isResetting = false;
    setInterval(() => {
      if (isResetting) return;
      currentIndex++;
      updateCarousel(true);
      if (currentIndex >= originalLength * 2) {
        isResetting = true;
        setTimeout(() => {
          currentIndex = originalLength;
          updateCarousel(false);
          isResetting = false;
        }, 550);
      }
    }, 2000);
  }

  // Scroll Reveal — IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // Dynamic Word Cycler in Hero (bilingual with gender agreement)
  const dynamicWordEl = document.getElementById('dynamic-word');
  const dynamicAdjEl = document.getElementById('dynamic-adjective');
  if (dynamicWordEl && dynamicAdjEl) {
    const words = ['brands', 'technology', 'events', 'tech'];
    let wordIndex = 0;

    setInterval(() => {
      dynamicWordEl.style.opacity = '0';

      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        dynamicWordEl.textContent = words[wordIndex];
        dynamicWordEl.style.opacity = '1';
      }, 400);
    }, 3000);
  }

  // Hero name carousel + video sync + brand icons
  var heroTrack = document.querySelector('.hero-name-track');
  var heroSlides = document.querySelectorAll('.hero-slide');
  var brandIcons = document.querySelectorAll('.hero-brand-icons img');
  var clientIcons = document.querySelectorAll('.hero-client-logo .client-icon');
  if (heroTrack) {
    var heroSpans = heroTrack.querySelectorAll('span');
    if (heroSpans.length > 0) {
      var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      var ITEM_H = 5.4 * rootFontSize;
      var TOTAL_REAL = 8;
      var heroIdx = 2;
      var videoIdx = 0;

      // Activar primer icono
      if (brandIcons.length > 0) brandIcons[0].classList.add('active');

      heroTrack.style.transition = 'none';
      heroTrack.style.transform = 'translateY(-' + ((heroIdx - 2) * ITEM_H) + 'px)';

      var heroResetting = false;
      setInterval(function() {
        if (heroResetting) return;
        heroIdx++;

        // Animar nombre
        heroTrack.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        heroTrack.style.transform = 'translateY(-' + ((heroIdx - 2) * ITEM_H) + 'px)';
        for (var j = 0; j < heroSpans.length; j++) {
          heroSpans[j].classList.remove('active');
        }
        if (heroSpans[heroIdx]) heroSpans[heroIdx].classList.add('active');

        // Sincronizar vídeo + iconos
        var brandIdx = (heroIdx - 2) % TOTAL_REAL;
        if (heroSlides.length > 0) {
          var prevVideo = heroSlides[videoIdx].querySelector('video');
          if (prevVideo) prevVideo.pause();
          heroSlides[videoIdx].classList.remove('active');

          videoIdx = brandIdx;
          heroSlides[videoIdx].classList.add('active');
          var newVideo = heroSlides[videoIdx].querySelector('video');
          if (newVideo) {
            newVideo.currentTime = 0;
            newVideo.play();
          }
        }
        // Iconos (bottom bar + logo inline)
        for (var k = 0; k < brandIcons.length; k++) {
          brandIcons[k].classList.remove('active');
        }
        if (brandIcons[brandIdx]) brandIcons[brandIdx].classList.add('active');
        for (var k = 0; k < clientIcons.length; k++) {
          clientIcons[k].classList.remove('active');
        }
        if (clientIcons[brandIdx]) clientIcons[brandIdx].classList.add('active');

        // Reset cuando llega al primer clon del final
        if (heroIdx >= TOTAL_REAL + 2) {
          heroResetting = true;
          setTimeout(function() {
            heroIdx = 2;
            heroTrack.style.transition = 'none';
            heroTrack.style.transform = 'translateY(0px)';
            for (var j = 0; j < heroSpans.length; j++) {
              heroSpans[j].classList.remove('active');
            }
            heroSpans[2].classList.add('active');

            // Reset vídeo + iconos al primero
            if (heroSlides.length > 0) {
              var prevVid = heroSlides[videoIdx].querySelector('video');
              if (prevVid) prevVid.pause();
              heroSlides[videoIdx].classList.remove('active');
              videoIdx = 0;
              heroSlides[0].classList.add('active');
              var firstVid = heroSlides[0].querySelector('video');
              if (firstVid) {
                firstVid.currentTime = 0;
                firstVid.play();
              }
            }
            for (var k = 0; k < brandIcons.length; k++) {
              brandIcons[k].classList.remove('active');
            }
            if (brandIcons[0]) brandIcons[0].classList.add('active');
            for (var k = 0; k < clientIcons.length; k++) {
              clientIcons[k].classList.remove('active');
            }
            if (clientIcons[0]) clientIcons[0].classList.add('active');

            heroResetting = false;
          }, 650);
        }
      }, 3500);
    }
  }
});
