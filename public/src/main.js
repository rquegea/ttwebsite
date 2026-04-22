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

  // AI Governance — rotating triangle with cast shadows & light shaft
  // AI Governance — wireframe cube rotating, 3D particle sphere bouncing off walls
  (function initAGCube(){
    const canvas = document.querySelector('.br-hero .ag-wall');
    if (!canvas || canvas.__agInit) return;
    canvas.__agInit = true;

    const hero = canvas.parentElement.parentElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const N = 320;
    const TILT_X = 0.42;
    const ROT_RATE = 0.21;

    const VERTS = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1]
    ];
    const EDGES = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    let W = 0, H = 0, DPR = 1;
    let running = true;
    let rafId = 0;
    let lastTime = 0;
    let rotY = 0;
    let particles = [];

    function initParticles() {
      particles = new Array(N);
      for (let i = 0; i < N; i++) {
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * Math.PI * 2;
        const r = Math.cbrt(Math.random()) * 0.88;
        const s = Math.sqrt(Math.max(0, 1 - u * u));
        particles[i] = {
          x: r * s * Math.cos(theta),
          y: r * s * Math.sin(theta),
          z: r * u,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          vz: (Math.random() - 0.5) * 0.9
        };
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = hero.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function project(x, y, z, L, D, FOV, cx, cy) {
      const cY = Math.cos(rotY), sY = Math.sin(rotY);
      const x1 = x * cY + z * sY;
      const z1 = -x * sY + z * cY;
      const cX = Math.cos(TILT_X), sX = Math.sin(TILT_X);
      const y1 = y * cX - z1 * sX;
      const z2 = y * sX + z1 * cX;
      const wx = x1 * L, wy = y1 * L, wz = z2 * L;
      const depth = D + wz;
      const s = FOV / depth;
      return { sx: cx + wx * s, sy: cy + wy * s, depth };
    }

    function step(dt) {
      rotY += ROT_RATE * dt;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        if (p.x < -1) { p.x = -1 - (p.x + 1); p.vx = -p.vx; }
        else if (p.x > 1) { p.x = 1 - (p.x - 1); p.vx = -p.vx; }
        if (p.y < -1) { p.y = -1 - (p.y + 1); p.vy = -p.vy; }
        else if (p.y > 1) { p.y = 1 - (p.y - 1); p.vy = -p.vy; }
        if (p.z < -1) { p.z = -1 - (p.z + 1); p.vz = -p.vz; }
        else if (p.z > 1) { p.z = 1 - (p.z - 1); p.vz = -p.vz; }
      }
    }

    function draw() {
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, W, H);

      const cx = W * 0.5, cy = H * 0.52;
      const L = Math.min(W * 0.28, H * 0.38);
      const D = L * 3.8;
      const FOV = L * 4.4;

      const pv = new Array(8);
      for (let i = 0; i < 8; i++) {
        const v = VERTS[i];
        pv[i] = project(v[0], v[1], v[2], L, D, FOV, cx, cy);
      }

      const edgeInfo = EDGES.map(([a, b]) => ({
        a, b, midDepth: (pv[a].depth + pv[b].depth) / 2
      }));
      edgeInfo.sort((x, y) => y.midDepth - x.midDepth);
      const halfCount = Math.ceil(edgeInfo.length / 2);
      const backEdges = edgeInfo.slice(0, halfCount);
      const frontEdges = edgeInfo.slice(halfCount);

      ctx.lineCap = 'round';

      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (const e of backEdges) {
        const A = pv[e.a], B = pv[e.b];
        ctx.moveTo(A.sx, A.sy);
        ctx.lineTo(B.sx, B.sy);
      }
      ctx.stroke();

      const proj = new Array(particles.length);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        proj[i] = project(p.x, p.y, p.z, L, D, FOV, cx, cy);
      }
      proj.sort((a, b) => b.depth - a.depth);

      const depthRange = 2 * L;
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i];
        const near = 1 - (p.depth - (D - L)) / depthRange;
        const alpha = 0.35 + near * 0.6;
        const rad = 0.9 + near * 1.9;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.62)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (const e of frontEdges) {
        const A = pv[e.a], B = pv[e.b];
        ctx.moveTo(A.sx, A.sy);
        ctx.lineTo(B.sx, B.sy);
      }
      ctx.stroke();
    }

    function frame(now) {
      if (!running) return;
      if (!lastTime) lastTime = now;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      step(dt);
      draw();
      rafId = requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true;
            lastTime = 0;
            rafId = requestAnimationFrame(frame);
          } else if (!e.isIntersecting && running) {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
          }
        }
      }, { threshold: 0 });
      io.observe(hero);
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    resize();
    initParticles();
    if (reduced) {
      draw();
      running = false;
    } else {
      rafId = requestAnimationFrame(frame);
    }
  })();

  // Preplay — layered neural network with firing pulses (cyan + amber on black)
  (function initPreplayNeural(){
    const canvas = document.querySelector('.br-hero .pp-net');
    if (!canvas || canvas.__netInit) return;
    canvas.__netInit = true;

    const stage = canvas.parentElement;
    const hero = stage.parentElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const LAYERS = [6, 10, 14, 10, 6, 3];
    const KEEP = 0.78;
    const SPAWN_EVERY = 0.16;
    const PULSE_BASE_SPEED = 260;
    const FIRE_GLOW_DUR = 0.55;
    const RING_DUR = 0.75;
    const C_CYAN = [77, 232, 255];
    const C_AMBER = [255, 184, 71];

    let W = 0, H = 0, DPR = 1;
    let running = true;
    let rafId = 0;
    let lastTime = 0;
    let spawnAcc = 0;

    let nodes = [];
    let layerBuckets = [];
    let conns = [];
    let nodeOut = [];
    let pulses = [];
    let rings = [];

    function build() {
      nodes = [];
      layerBuckets = [];
      conns = [];
      nodeOut = [];
      pulses = [];
      rings = [];

      const marginX = Math.min(Math.max(W * 0.08, 60), 180);
      const marginY = Math.min(Math.max(H * 0.12, 60), 140);
      const innerW = Math.max(1, W - marginX * 2);
      const innerH = Math.max(1, H - marginY * 2);
      const stepX = LAYERS.length > 1 ? innerW / (LAYERS.length - 1) : 0;

      for (let L = 0; L < LAYERS.length; L++) {
        const count = LAYERS[L];
        const x = marginX + stepX * L;
        const spacing = innerH / (count + 1);
        const bucket = [];
        for (let i = 0; i < count; i++) {
          const y = marginY + spacing * (i + 1) + (Math.random() - 0.5) * 6;
          bucket.push(nodes.length);
          nodes.push({ x, y, layer: L, lastFire: -999 });
          nodeOut.push([]);
        }
        layerBuckets.push(bucket);
      }

      for (let L = 0; L < LAYERS.length - 1; L++) {
        const from = layerBuckets[L];
        const to = layerBuckets[L + 1];
        for (const a of from) {
          for (const b of to) {
            if (Math.random() < KEEP) {
              const na = nodes[a], nb = nodes[b];
              const len = Math.hypot(nb.x - na.x, nb.y - na.y);
              const cIdx = conns.length;
              conns.push({ from: a, to: b, length: len });
              nodeOut[a].push(cIdx);
            }
          }
          if (nodeOut[a].length === 0) {
            const b = to[Math.floor(Math.random() * to.length)];
            const na = nodes[a], nb = nodes[b];
            const len = Math.hypot(nb.x - na.x, nb.y - na.y);
            const cIdx = conns.length;
            conns.push({ from: a, to: b, length: len });
            nodeOut[a].push(cIdx);
          }
        }
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = hero.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      build();
    }

    function pickColor() {
      return Math.random() < 0.72 ? C_CYAN : C_AMBER;
    }

    function fireNode(nIdx, nowSec) {
      const n = nodes[nIdx];
      n.lastFire = nowSec;
      const ringColor = pickColor();
      rings.push({ x: n.x, y: n.y, t: 0, r: ringColor[0], g: ringColor[1], b: ringColor[2] });

      const outs = nodeOut[nIdx];
      if (!outs.length) return;
      const sparks = Math.min(outs.length, 1 + ((Math.random() * 2) | 0));
      for (let k = 0; k < sparks; k++) {
        const cIdx = outs[(Math.random() * outs.length) | 0];
        const conn = conns[cIdx];
        const col = pickColor();
        pulses.push({
          cIdx,
          t: 0,
          speed: PULSE_BASE_SPEED / Math.max(60, conn.length),
          r: col[0], g: col[1], b: col[2]
        });
      }
    }

    function spawnEntryPulse(nowSec) {
      const layer0 = layerBuckets[0];
      if (!layer0 || !layer0.length) return;
      const nIdx = layer0[(Math.random() * layer0.length) | 0];
      fireNode(nIdx, nowSec);
    }

    function step(dt, nowSec) {
      spawnAcc += dt;
      while (spawnAcc >= SPAWN_EVERY) {
        spawnAcc -= SPAWN_EVERY;
        spawnEntryPulse(nowSec);
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * dt;
        if (p.t >= 1) {
          const conn = conns[p.cIdx];
          fireNode(conn.to, nowSec);
          pulses.splice(i, 1);
        }
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i].t += dt;
        if (rings[i].t > RING_DUR) rings.splice(i, 1);
      }
    }

    function draw(nowSec) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(80, 200, 230, 0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < conns.length; i++) {
        const c = conns[i];
        const a = nodes[c.from], b = nodes[c.to];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < rings.length; i++) {
        const r = rings[i];
        const age = r.t / RING_DUR;
        const rad = 3 + age * 24;
        const alpha = (1 - age) * 0.55;
        ctx.strokeStyle = `rgba(${r.r},${r.g},${r.b},${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        const c = conns[p.cIdx];
        const a = nodes[c.from], b = nodes[c.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},0.32)`;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const since = nowSec - n.lastFire;
        const firing = since < FIRE_GLOW_DUR ? (1 - since / FIRE_GLOW_DUR) : 0;
        const rad = 2.3 + firing * 1.8;
        if (firing > 0) {
          ctx.fillStyle = `rgba(77, 232, 255, ${firing * 0.32})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rad + 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = firing > 0 ? '#EAF6FF' : '#000';
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(120, 220, 240, 0.55)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function frame(now) {
      if (!running) return;
      if (!lastTime) lastTime = now;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const nowSec = now / 1000;
      step(dt, nowSec);
      draw(nowSec);
      rafId = requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true;
            lastTime = 0;
            rafId = requestAnimationFrame(frame);
          } else if (!e.isIntersecting && running) {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
          }
        }
      }, { threshold: 0 });
      io.observe(hero);
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    resize();
    const now0 = performance.now() / 1000;
    for (let i = 0; i < 3; i++) spawnEntryPulse(now0 - i * 0.1);

    if (reduced) {
      draw(now0);
      running = false;
    } else {
      rafId = requestAnimationFrame(frame);
    }
  })();

  // Brand Radar — hex grid speaker ripple (hero background)
  (function initBrandRadarHexGrid(){
    const canvas = document.querySelector('.br-hero .br-hexcanvas');
    if (!canvas || canvas.__hexInit) return;
    canvas.__hexInit = true;

    const hero = canvas.parentElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const TILT = 0.88;
    const SIN_T = Math.sin(TILT);
    const COS_T = Math.cos(TILT);

    let W = 0, H = 0, DPR = 1;
    let hexSize = 16;
    let hexes = [];
    let mx = 0.5, my = 0.5;
    let running = true;
    let rafId = 0;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = hero.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      hexSize = window.innerWidth < 768 ? 10 : 16;
      build();
    }

    function build() {
      const hexW = hexSize * 2;
      const hexH = Math.sqrt(3) * hexSize;
      const dx = hexW * 0.75;
      const dy = hexH * COS_T;
      const cols = Math.ceil(W / dx) + 6;
      const rows = Math.ceil(H / dy) + 10;
      const offsetX = (W - (cols - 1) * dx) / 2;
      const offsetY = (H - (rows - 1) * dy) / 2;
      const gcx = (cols - 1) / 2;
      const gcy = (rows - 1) / 2;

      hexes = new Array(cols * rows);
      let k = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const wx = offsetX + c * dx;
          const wy = offsetY + (r + (c & 1 ? 0.5 : 0)) * dy;
          const d = Math.hypot(c - gcx, r - gcy);
          hexes[k++] = { wx, wy, d, center: d < 3.1, z: 0, py: wy };
        }
      }
    }

    function drawHex(px, py, size, fill, stroke) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const x = px + size * Math.cos(a);
        const y = py + size * Math.sin(a) * COS_T;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      const time = t * 0.001;
      const beat = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(time * 2.2));
      const amp = hexSize * 1.9 * beat;
      const tiltX = (mx - 0.5) * 18;
      const tiltY = (my - 0.5) * 10;
      const glowBeat = 0.5 + 0.5 * Math.sin(time * 3.1);

      for (let i = 0; i < hexes.length; i++) {
        const h = hexes[i];
        const phase = h.d * 0.44 - time * 3.0;
        const wave = Math.sin(phase);
        let z = wave * amp;
        if (h.center) z += hexSize * 2.8 + hexSize * 1.4 * glowBeat;
        h.z = z;
        h.py = h.wy - z * SIN_T + tiltY;
      }

      hexes.sort((a, b) => a.py - b.py);

      for (let i = 0; i < hexes.length; i++) {
        const h = hexes[i];
        const wave = amp === 0 ? 0 : (h.z / amp);
        const riseNorm = Math.max(-1, Math.min(1, wave));
        const px = h.wx + tiltX;
        const py = h.py;

        let fill, stroke;
        if (h.center) {
          const k = 0.7 + 0.3 * glowBeat;
          const r = Math.floor(205 + 45 * k);
          const g = Math.floor(18 + 14 * k);
          const b = Math.floor(30 + 18 * k);
          fill = 'rgb(' + r + ',' + g + ',' + b + ')';
          stroke = 'rgba(255,90,90,' + (0.35 * glowBeat) + ')';
        } else {
          const n = (riseNorm + 1) * 0.5;
          const base = 16 + n * 26;
          const rr = Math.floor(base * 0.95);
          const gg = Math.floor(base * 1.00);
          const bb = Math.floor(base * 1.35);
          fill = 'rgb(' + rr + ',' + gg + ',' + bb + ')';
          stroke = 'rgba(255,255,255,0.045)';
        }
        const s = hexSize * (0.92 + 0.08 * ((riseNorm + 1) * 0.5));
        drawHex(px, py, s, fill, stroke);
      }

      // Red glow halo over center
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gx = W / 2 + tiltX;
      const gy = H / 2 + tiltY - hexSize * SIN_T * 2;
      const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, hexSize * (10 + 4 * glowBeat));
      gr.addColorStop(0, 'rgba(210, 30, 45, ' + (0.22 * glowBeat) + ')');
      gr.addColorStop(0.45, 'rgba(180, 20, 30, ' + (0.07 * glowBeat) + ')');
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      rafId = requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true;
            rafId = requestAnimationFrame(frame);
          } else if (!e.isIntersecting && running) {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
          }
        }
      }, { threshold: 0 });
      io.observe(hero);
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    });

    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    }, { passive: true });

    resize();
    if (reduced) {
      frame(0);
      running = false;
    } else {
      rafId = requestAnimationFrame(frame);
    }
  })();

});


