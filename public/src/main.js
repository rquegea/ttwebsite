// cache-bust-fix-v1


document.addEventListener('DOMContentLoaded', () => {
  // Header: background on scroll + hide on scroll down / show on scroll up
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const header = document.querySelector('.header');
        if (!header) { ticking = false; return; }

        const currentY = window.scrollY;

        // Background
        if (currentY > 50) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }

        // Hide on scroll down / show on scroll up (only past 150px)
        if (currentY > 150) {
          if (currentY > lastScrollY + 5) {
            header.classList.add('header-hidden');
          } else if (currentY < lastScrollY - 5) {
            header.classList.remove('header-hidden');
          }
        } else {
          header.classList.remove('header-hidden');
        }

        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // ── Mobile menu — event delegation ──
  document.addEventListener('click', (e) => {
    if (!e.target || !e.target.closest) return;
    if (e.target.closest('.mobile-menu-btn')) {
      const overlay = document.getElementById('mobileMenu');
      if (overlay) { overlay.classList.add('is-active'); document.body.style.overflow = 'hidden'; }
    }
    if (e.target.closest('.mobile-menu-close')) {
      const overlay = document.getElementById('mobileMenu');
      if (overlay) { overlay.classList.remove('is-active'); document.body.style.overflow = ''; }
    }

    // Mobile submenu accordion toggle
    const toggle = e.target.closest('.mobile-submenu-toggle');
    if (toggle) {
      e.preventDefault();
      const item = toggle.parentElement;
      const sub = item && item.querySelector('.mobile-submenu');
      const willOpen = !item.classList.contains('is-open');
      item.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      if (sub) sub.hidden = !willOpen;
    }

    // Article detail: copy share link
    const copyBtn = e.target.closest('.article-share-copy');
    if (copyBtn) {
      e.preventDefault();
      const url = copyBtn.getAttribute('data-copy-url') || window.location.href;
      const original = copyBtn.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          copyBtn.textContent = '✓';
          setTimeout(() => { copyBtn.textContent = original; }, 1500);
        });
      }
    }
  });

  // ── Nav glider — event delegation ──
  let gliderHideTimeout = null;
  document.addEventListener('mouseenter', (e) => {
    if (!e.target || !e.target.closest) return;
    const li = e.target.closest('.nav > ul > li:not(.nav-glider)');
    if (!li) return;
    const glider = document.querySelector('.nav-glider');
    const header = document.querySelector('.header');
    if (!glider || !header) return;
    if (gliderHideTimeout) { clearTimeout(gliderHideTimeout); gliderHideTimeout = null; }
    const liRect = li.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    glider.style.width = `${liRect.width}px`;
    glider.style.transform = `translateX(${liRect.left - headerRect.left}px)`;
    glider.style.opacity = '1';
  }, true);

  document.addEventListener('mouseleave', (e) => {
    if (!e.target || !e.target.closest) return;
    if (!e.target.closest('.header')) return;
    const glider = document.querySelector('.nav-glider');
    if (!glider) return;
    gliderHideTimeout = setTimeout(() => { glider.style.opacity = '0'; }, 150);
  }, true);

  // ── Mega-menu — event delegation ──
  let menuCloseTimeout = null;

  function openMenu(target) {
    if (menuCloseTimeout) { clearTimeout(menuCloseTimeout); menuCloseTimeout = null; }
    document.querySelectorAll('.has-dropdown').forEach(d => {
      if (d !== target) d.classList.remove('is-open');
    });
    target.classList.add('is-open');
    const header = document.querySelector('.header');
    if (header) header.classList.add('menu-active');
    const menu = target.querySelector('.mega-menu');
    if (menu && header) {
      const itemRect = target.getBoundingClientRect();
      menu.style.top = itemRect.bottom + 8 + 'px';
      menu.style.left = itemRect.left + 'px';
      menu.style.width = '';
    }
  }

  function closeAllMenus() {
    document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('is-open'));
    const header = document.querySelector('.header');
    if (header) header.classList.remove('menu-active');
  }

  function startMenuClose() {
    if (menuCloseTimeout) clearTimeout(menuCloseTimeout);
    menuCloseTimeout = setTimeout(() => { closeAllMenus(); menuCloseTimeout = null; }, 300);
  }

  document.addEventListener('mouseenter', (e) => {
    if (!e.target || !e.target.closest) return;
    const dropdown = e.target.closest('.has-dropdown');
    if (dropdown) { openMenu(dropdown); return; }
    if (e.target.closest('.mega-menu')) {
      if (menuCloseTimeout) { clearTimeout(menuCloseTimeout); menuCloseTimeout = null; }
    }
  }, true);

  document.addEventListener('mouseleave', (e) => {
    if (!e.target || !e.target.closest) return;
    const dropdown = e.target.closest('.has-dropdown');
    const mega = e.target.closest('.mega-menu');
    if (dropdown || mega) startMenuClose();
  }, true);



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

      // If we've scrolled fully to the end of the second batch
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

  // Dynamic Word Cycler in CTA Banner
  const ctaDynamicWordEl = document.getElementById('cta-dynamic-word');
  if (ctaDynamicWordEl) {
    const ctaWords = ['brand', 'evento'];
    let ctaWordIndex = 0;

    setInterval(() => {
      ctaDynamicWordEl.style.opacity = '0';

      setTimeout(() => {
        ctaWordIndex = (ctaWordIndex + 1) % ctaWords.length;
        ctaDynamicWordEl.textContent = ctaWords[ctaWordIndex];
        ctaDynamicWordEl.style.opacity = '1';
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
      var CONTAINER_H = 21 * rootFontSize;
      var TOTAL_REAL = 9;
      var heroIdx = 2;
      var videoIdx = 0;

      function heroTranslateY(idx) {
        return CONTAINER_H / 2 - (idx * ITEM_H + ITEM_H / 2);
      }

      // Activar primer icono
      if (brandIcons.length > 0) brandIcons[0].classList.add('active');

      // Función para centrar icono activo en carrusel horizontal (móvil)
      var logoContainer = document.querySelector('.hero-client-logo');
      function centerClientIcon(idx, animate) {
        if (!logoContainer || clientIcons.length === 0) return;
        var icon = clientIcons[idx];
        if (!icon) return;
        var iconW = icon.offsetWidth;
        var gap = parseFloat(getComputedStyle(logoContainer).gap) || 0;
        var offset = idx * (iconW + gap);
        if (animate === false) {
          logoContainer.style.transition = 'none';
        } else {
          logoContainer.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        }
        logoContainer.style.transform = 'translateX(' + (-offset) + 'px)';
      }

      // Centrar primer icono en móvil al cargar
      if (window.innerWidth <= 768) {
        centerClientIcon(0, false);
      }

      heroTrack.style.transition = 'none';
      heroTrack.style.transform = 'translateY(' + heroTranslateY(heroIdx) + 'px)';

      var heroResetting = false;
      var heroPaused = false;
      var heroInterval = setInterval(function() {
        if (heroResetting || heroPaused) return;
        heroIdx++;

        // Animar nombre
        heroTrack.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        heroTrack.style.transform = 'translateY(' + heroTranslateY(heroIdx) + 'px)';
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
        if (window.innerWidth <= 768) {
          centerClientIcon(brandIdx);
        }

        // Reset cuando llega al primer clon del final
        if (heroIdx >= TOTAL_REAL + 2) {
          heroResetting = true;
          setTimeout(function() {
            heroIdx = 2;
            heroTrack.style.transition = 'none';
            heroTrack.style.transform = 'translateY(' + heroTranslateY(2) + 'px)';
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
            if (window.innerWidth <= 768) {
              centerClientIcon(0, false);
            }

            heroResetting = false;
          }, 650);
        }
      }, 3500);

      // Botón pause/play
      var pauseBtn = document.querySelector('.hero-pause');
      var pauseIcon = document.querySelector('.hero-pause-icon');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
          heroPaused = !heroPaused;
          if (heroPaused) {
            pauseIcon.textContent = '▶';
            var currentVid = heroSlides[videoIdx] ? heroSlides[videoIdx].querySelector('video') : null;
            if (currentVid) currentVid.pause();
          } else {
            pauseIcon.textContent = '⏸';
            var currentVid = heroSlides[videoIdx] ? heroSlides[videoIdx].querySelector('video') : null;
            if (currentVid) currentVid.play();
          }
        });
      }

      // Recalcular posición al cruzar breakpoint móvil/desktop
      var wasMobile = window.innerWidth <= 768;
      window.addEventListener('resize', function() {
        var isMobile = window.innerWidth <= 768;
        if (isMobile !== wasMobile) {
          wasMobile = isMobile;
          if (!isMobile) {
            // Volvemos a desktop: recalcular translateY
            rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            ITEM_H = 5.4 * rootFontSize;
            CONTAINER_H = 21 * rootFontSize;
            heroTrack.style.transition = 'none';
            heroTrack.style.transform = 'translateY(' + heroTranslateY(heroIdx) + 'px)';
          }
        }
      });
    }
  }

  // Client Stories — slide diagonal carousel on hover
  const csItems = document.querySelectorAll('.client-story-item');
  const carousel = document.querySelector('.client-stories-carousel');
  const cItems = document.querySelectorAll('.carousel-item');
  if (csItems.length && carousel && cItems.length) {
    const step = 600;
    // Each item's position along the diagonal relative to index 0
    const offsets = [
      { x: -step * 2, y: -step * 2 },
      { x: -step, y: -step },
      { x: 0, y: 0 },
      { x: step, y: step },
      { x: step * 2, y: step * 2 },
    ];

    csItems.forEach((item, i) => {
      item.addEventListener('mouseenter', () => {
        const ox = -offsets[i].x;
        const oy = -offsets[i].y;
        carousel.style.transform = 'translate(' + ox + 'px, ' + oy + 'px)';
        cItems.forEach((ci, j) => {
          if (j === i) { ci.classList.add('is-active'); }
          else { ci.classList.remove('is-active'); }
        });
      });
      item.addEventListener('mouseleave', () => {
        cItems.forEach(ci => ci.classList.remove('is-active'));
      });
    });
  }

  // Reports parallax — image width tied to scroll via rAF
  var rpWrapper = document.querySelector('.reports-image-wrapper');
  if (rpWrapper) {
    var rpMinW = 1000;
    var rpMaxW = 1400;
    var rpTicking = false;

    function updateReportsWidth() {
      var rect = rpWrapper.getBoundingClientRect();
      var wh = window.innerHeight;
      var center = rect.top + rect.height / 2;
      var progress = Math.max(0, Math.min(1, (center - wh / 2) / (wh * 0.8)));
      var w = rpMinW + (rpMaxW - rpMinW) * progress;
      rpWrapper.style.width = w + 'px';
      rpTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!rpTicking) {
        requestAnimationFrame(updateReportsWidth);
        rpTicking = true;
      }
    });
    updateReportsWidth();
  }

  // Work page: image follows cursor on table hover (always active, checks DOM each move)
  let hoverMedia = null;
  let lastSrc = '';

  document.addEventListener('mousemove', function(e) {
    if (!document.querySelector('.work-projects-list')) {
      if (hoverMedia) { hoverMedia.style.display = 'none'; }
      return;
    }
    {
      const items = document.querySelectorAll('.work-projects-list-item');
      let hoveredItem = null;

      for (let item of items) {
        if (item.matches(':hover')) { hoveredItem = item; break; }
      }

      if (hoveredItem) {
        const image = hoveredItem.dataset.image || '';
        const video = hoveredItem.dataset.video || '';
        const src = video || image;

        if (src && src.trim()) {
          if (!hoverMedia || lastSrc !== src) {
            if (hoverMedia) hoverMedia.remove();
            if (video) {
              hoverMedia = document.createElement('video');
              hoverMedia.autoplay = true;
              hoverMedia.muted = true;
              hoverMedia.loop = true;
              hoverMedia.setAttribute('playsinline', '');
              const s = document.createElement('source');
              s.src = video;
              s.type = 'video/mp4';
              hoverMedia.appendChild(s);
            } else {
              hoverMedia = document.createElement('img');
              hoverMedia.src = image;
              hoverMedia.alt = '';
            }
            hoverMedia.className = 'work-hover-media';
            document.body.appendChild(hoverMedia);
            lastSrc = src;
          }
          hoverMedia.style.left = (e.clientX + 20) + 'px';
          hoverMedia.style.top = (e.clientY - 420) + 'px';
          hoverMedia.style.display = 'block';
        }
      } else {
        if (hoverMedia) hoverMedia.style.display = 'none';
      }
    }
  });

});


