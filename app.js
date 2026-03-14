/* ═══════════════════════════════════════════
   MINUME XVII — app.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     INTRO OVERLAY
  ══════════════════════════════════════════ */
  const intro      = document.getElementById('siteIntro');
  const introEnter = document.getElementById('introEnter');
  const introSkip  = document.getElementById('introSkip');
  const introParticles = document.getElementById('introParticles');

  if (introParticles) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.className = 'intro-particle';
      const w = 6 + Math.random() * 18;
      const h = w * (0.6 + Math.random() * 0.7);
      const dx = (Math.random() - 0.5) * 28;
      p.style.cssText = `width:${w}px;height:${h}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${5+Math.random()*6}s;--del:${Math.random()*5}s;--dx:${dx}px;`;
      introParticles.appendChild(p);
    }
  }

  function dismissIntro() {
    if (!intro) return;
    intro.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(() => { if (intro.parentNode) intro.remove(); }, 1000);
  }

  if (intro) {
    document.body.style.overflow = 'hidden';
    introEnter && introEnter.addEventListener('click', dismissIntro);
    introSkip  && introSkip.addEventListener('click', dismissIntro);
    setTimeout(dismissIntro, 6500);
  }

  /* ── CURSOR ───────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  });
  (function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animRing);
  })();

  /* ── HANDPRINT ── */
  document.addEventListener('click', e => {
    if (intro && !intro.classList.contains('hidden')) return;
    const img = document.createElement('img');
    img.src = 'Huella.png';
    img.className = 'handprint-stamp';
    const rot = (Math.random() - 0.5) * 55;
    img.style.setProperty('--rot', rot + 'deg');
    img.style.left = e.clientX + 'px';
    img.style.top  = e.clientY + 'px';
    document.body.appendChild(img);
    img.addEventListener('animationend', () => img.remove());
  });

  /* ── SPARKLES — Noche Diplomática ── */
  const sparklesCanvas = document.getElementById('sparklesCanvas');
  if (sparklesCanvas) {
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      const size = 1 + Math.random() * 2.5;
      s.className = 'sparkle-dot';
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;--spd:${2.5+Math.random()*3.5}s;--sdel:${Math.random()*4}s;`;
      sparklesCanvas.appendChild(s);
    }
    for (let i = 0; i < 16; i++) {
      const c = document.createElement('span');
      c.className = 'sparkle-cross';
      c.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--spd:${3+Math.random()*4}s;--sdel:${Math.random()*5}s;`;
      sparklesCanvas.appendChild(c);
    }
  }

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── MOBILE MENU ── */
  const burger    = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  const closeBtn  = document.getElementById('navMobileClose');

  function openMenu() {
    mobileNav.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger  && burger.addEventListener('click', () =>
    mobileNav.classList.contains('open') ? closeMenu() : openMenu()
  );
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  mobileNav && mobileNav.addEventListener('click', e => { if (e.target === mobileNav) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });

  /* ── REVEAL ON SCROLL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── PILLAR EXPAND ── */
  document.querySelectorAll('.pillar').forEach(pillar => {
    pillar.addEventListener('click', () => {
      const wasOpen = pillar.classList.contains('open');
      document.querySelectorAll('.pillar').forEach(p => p.classList.remove('open'));
      if (!wasOpen) pillar.classList.add('open');
    });
  });

  /* ── ACADEMIA TABS ── */
  window.switchTab = (id, btn) => {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  };

  /* ══════════════════════════════════════════
     SECTION CANVAS BACKGROUNDS
  ══════════════════════════════════════════ */
  function resizeCanvas(canvas) {
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  /* HENRY — floating geometric shapes (light bg) */
  (function() {
    const canvas = document.getElementById('henryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, shapes = [];
    function init() {
      resizeCanvas(canvas); W = canvas.width; H = canvas.height;
      shapes = Array.from({length: 16}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        size: 28+Math.random()*75,
        rot: Math.random()*Math.PI*2, drot: (Math.random()-.5)*.003,
        dx: (Math.random()-.5)*.18, dy: (Math.random()-.5)*.14,
        type: ['tri','sq','hex'][Math.floor(Math.random()*3)],
        alpha: .03+Math.random()*.05,
      }));
    }
    function drawShape(s) {
      ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rot);
      ctx.globalAlpha = s.alpha;
      ctx.strokeStyle = 'rgba(55,170,107,1)'; ctx.lineWidth = .8;
      ctx.beginPath();
      if (s.type==='tri') {
        ctx.moveTo(0,-s.size*.6);ctx.lineTo(s.size*.52,s.size*.3);ctx.lineTo(-s.size*.52,s.size*.3);ctx.closePath();
      } else if (s.type==='sq') {
        ctx.rect(-s.size*.4,-s.size*.4,s.size*.8,s.size*.8);
      } else {
        for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.lineTo(Math.cos(a)*s.size*.45,Math.sin(a)*s.size*.45);}ctx.closePath();
      }
      ctx.stroke(); ctx.restore();
    }
    function draw() {
      ctx.clearRect(0,0,W,H);
      shapes.forEach(s => {
        drawShape(s);
        s.x+=s.dx; s.y+=s.dy; s.rot+=s.drot;
        if(s.x<-80)s.x=W+80; if(s.x>W+80)s.x=-80;
        if(s.y<-80)s.y=H+80; if(s.y>H+80)s.y=-80;
      });
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init, {passive:true});
  })();

  /* QUE-ES CANVAS — subtle dots */
  (function() {
    const canvas = document.getElementById('queEsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, dots = [];
    function init() {
      resizeCanvas(canvas); W = canvas.width; H = canvas.height;
      dots = Array.from({length:40}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        r: .5+Math.random()*1.5,
        dx:(Math.random()-.5)*.2, dy:(Math.random()-.5)*.2,
        a:.03+Math.random()*.06,
      }));
    }
    function draw() {
      ctx.clearRect(0,0,W,H);
      dots.forEach(d => {
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(55,170,107,${d.a})`; ctx.fill();
        d.x+=d.dx; d.y+=d.dy;
        if(d.x<0)d.x=W; if(d.x>W)d.x=0;
        if(d.y<0)d.y=H; if(d.y>H)d.y=0;
      });
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init, {passive:true});
  })();

  /* VISION — floating ink blobs */
  (function() {
    const canvas = document.getElementById('visionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, blobs = [];
    function init() {
      resizeCanvas(canvas); W = canvas.width; H = canvas.height;
      blobs = Array.from({length:8}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        rx: 50+Math.random()*140, ry: 40+Math.random()*100,
        rot: Math.random()*Math.PI*2,
        dx: (Math.random()-.5)*.12, dy: (Math.random()-.5)*.09,
        alpha: .025+Math.random()*.04,
      }));
    }
    function draw() {
      ctx.clearRect(0,0,W,H);
      blobs.forEach(b => {
        ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(b.rot);
        ctx.globalAlpha=b.alpha;
        ctx.fillStyle=`rgba(55,170,107,1)`;
        ctx.beginPath(); ctx.ellipse(0,0,b.rx,b.ry,0,0,Math.PI*2);
        ctx.fill(); ctx.restore();
        b.x+=b.dx; b.y+=b.dy;
        if(b.x<-200)b.x=W+200; if(b.x>W+200)b.x=-200;
        if(b.y<-150)b.y=H+150; if(b.y>H+150)b.y=-150;
      });
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init, {passive:true});
  })();

  /* ESFERAS — star field */
  (function() {
    const canvas = document.getElementById('esferasCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];
    function init() {
      resizeCanvas(canvas); W = canvas.width; H = canvas.height;
      stars = Array.from({length:60}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        r: .3+Math.random()*.9,
        a: .05+Math.random()*.18,
        da: (Math.random()-.5)*.004,
        dy: -.02-.06*Math.random(),
      }));
    }
    function draw() {
      ctx.clearRect(0,0,W,H);
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(201,168,76,${s.a})`; ctx.fill();
        s.a+=s.da; if(s.a<.02||s.a>.22)s.da*=-1;
        s.y+=s.dy; if(s.y<-10){s.y=H+10;s.x=Math.random()*W;}
      });
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init, {passive:true});
  })();

  /* ACADEMIA — knowledge-flow particle network */
  (function() {
    const canvas = document.getElementById('academiaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function init() {
      W = canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight;

      const count = Math.max(38, Math.floor((W * H) / 14000));
      particles = Array.from({ length: count }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        /* Sinusoidal drift path */
        baseX: Math.random() * W,
        baseY: Math.random() * H,
        amp:  18 + Math.random() * 38,
        freq: 0.0004 + Math.random() * 0.0006,
        phase: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speed: 0.00028 + Math.random() * 0.00022,
        r:    0.8 + Math.random() * 1.8,
        pulse: Math.random() * Math.PI * 2,
        /* Gold or green */
        gold: Math.random() > 0.82,
      }));
    }

    const MAX_DIST = 120;

    function frame(now) {
      ctx.clearRect(0, 0, W, H);

      /* Update positions */
      particles.forEach(p => {
        const t = now * p.speed;
        p.x = p.baseX + Math.sin(t + p.phase)  * p.amp;
        p.y = p.baseY + Math.cos(t + p.phaseY) * p.amp * 0.65;
        /* Slowly migrate baseX/Y */
        p.baseX += (Math.random() - 0.5) * 0.12;
        p.baseY += (Math.random() - 0.5) * 0.09;
        if (p.baseX < -50)  p.baseX = W + 50;
        if (p.baseX > W+50) p.baseX = -50;
        if (p.baseY < -50)  p.baseY = H + 50;
        if (p.baseY > H+50) p.baseY = -50;
        p.pulse += 0.018;
      });

      /* Connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.18;
            ctx.strokeStyle = `rgba(55,170,107,${a})`;
            ctx.lineWidth   = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* Dots */
      particles.forEach(p => {
        const pulse = 0.55 + 0.45 * Math.sin(p.pulse);
        const color = p.gold ? '201,168,76' : '55,170,107';
        const alpha = (p.gold ? 0.38 : 0.45) * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();

        /* Soft glow */
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5 * pulse);
        g.addColorStop(0, `rgba(${color},${0.07 * pulse})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => init());
    ro.observe(canvas.parentElement);
    init();
    requestAnimationFrame(frame);
  })();

  /* EJE 2030 — digital matrix rain */
  (function() {
    const canvas = document.getElementById('eje2030Canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cols = [];
    const colW = 26;
    function init() {
      resizeCanvas(canvas); W = canvas.width; H = canvas.height;
      ctx.clearRect(0,0,W,H);
      const n = Math.floor(W/colW);
      cols = Array.from({length:n}, () => ({
        y: Math.random()*H,
        speed: .35+Math.random()*.7,
        len: 4+Math.floor(Math.random()*7),
        alpha: 0.035+Math.random()*.05,
        chars: [],
      }));
      cols.forEach(c => {
        c.chars = Array.from({length:c.len}, () => String.fromCharCode(0x30+Math.floor(Math.random()*10)));
      });
    }
    function draw() {
      ctx.fillStyle='rgba(8,32,19,0.035)';
      ctx.fillRect(0,0,W,H);
      ctx.font=`${Math.floor(colW*.52)}px monospace`;
      cols.forEach((c,i) => {
        c.chars.forEach((ch,j) => {
          const yy = c.y - j*colW*.82;
          const a = j===0 ? c.alpha*2.2 : c.alpha*(1-j/c.len);
          if(a<=0) return;
          ctx.fillStyle=`rgba(55,170,107,${Math.min(a,.4)})`;
          ctx.fillText(ch, i*colW+4, yy);
        });
        c.y += c.speed;
        if(c.y - c.len*colW*.82 > H) {
          c.y = -20;
          c.chars = c.chars.map(()=>String.fromCharCode(0x30+Math.floor(Math.random()*10)));
        }
      });
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', ()=>{init();}, {passive:true});
  })();

  /* BID canvas — subtle grid */
  (function() {
    const canvas = document.getElementById('bidCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    function init() {
      resizeCanvas(canvas); W = canvas.width; H = canvas.height;
    }
    function draw() {
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='rgba(55,170,107,0.03)';
      ctx.lineWidth=.5;
      const step=60;
      for(let x=0;x<W;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init, {passive:true});
  })();

  /* ══════════════════════════════════════════
     PHOTO GALLERY BAND — auto-scroll
  ══════════════════════════════════════════ */
  const galleryTrack = document.getElementById('galleryTrack');
  if (galleryTrack) {
    // Use available deity images + logo as stand-ins; real event photos slot in here
    const galleryImages = [
      { src: 'foto1.jpeg',   alt: 'Imagen de galeria' },
      { src: 'foto2.jpeg',     alt: 'Imagen de galeria' },
      { src: 'foto3.jpeg', alt: 'Imagen de galeria' },
      { src: 'foto4.jpeg',  alt: 'Imagen de galeria' },
      { src: 'foto5.jpeg',   alt: 'Imagen de galeria' },
      { src: 'foto6.jpeg',   alt: 'Imagen de galeria' },
      { src: 'foto7.jpg', alt: 'Imagen de galeria' },
      { src: 'foto8.jpg',    alt: 'Imagen de galeria' },
      { src: 'foto9.jpg',    alt: 'Imagen de galeria' },
      { src: 'foto10.jpg',   alt: 'Imagen de galeria' },
      { src: 'foto11.jpg',   alt: 'Imagen de galeria' },
      { src: 'foto12.jpg',   alt: 'Imagen de galeria' },
      { src: 'foto13.jpg',   alt: 'Imagen de galeria' },
      { src: 'foto14.jpg',   alt: 'Imagen de galeria' },
      { src: 'foto15.jpg',   alt: 'Imagen de galeria' },
      { src: 'foto16.jpg',   alt: 'Imagen de galeria' },
    ];
    // Duplicate for seamless loop
    [...galleryImages, ...galleryImages].forEach(img => {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide';
      const i = document.createElement('img');
      i.src = img.src; i.alt = img.alt; i.loading = 'lazy';
      slide.appendChild(i);
      galleryTrack.appendChild(slide);
    });

    let pos = 0;
    const speed = 0.5;
    let raf;
    function scrollGallery() {
      pos -= speed;
      const totalW = galleryImages.length * (280 + 12); // slide width + gap
      if (Math.abs(pos) >= totalW) pos = 0;
      galleryTrack.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(scrollGallery);
    }
    scrollGallery();

    // Pause on hover
    galleryTrack.parentElement.addEventListener('mouseenter', () => cancelAnimationFrame(raf));
    galleryTrack.parentElement.addEventListener('mouseleave', () => { raf = requestAnimationFrame(scrollGallery); });
  }

  /* ══════════════════════════════════════════
     ESFERAS DATA — updated with new committees
  ══════════════════════════════════════════ */
  const esferas = [
    { id:'zeus', name:'Esfera de Zeus', tag:'Poder · Autoridad · Orden', img:'zeus.png', color:'#C9A84C',
      desc:'Zeus sostenía el orden del cosmos. Esta esfera agrupa los comités que toman las decisiones más vinculantes: liderazgo máximo, gobernanza y equilibrio global.',
      committees:[
        {name:'Consejo de Seguridad',         desc:'Órgano máximo de autoridad vinculante y mantenimiento de la paz mundial.'},
        {name:'PARLACEN',                     desc:'Órgano político de integración regional centroamericana.'},
        {name:'G20',                          desc:'El espacio más poderoso de deliberación económica-política global.'},
        {name:'Consejo de WITAN',             desc:'Consejo asesor histórico de alto nivel. Ejercicio institucional del poder.'},
        {name:'Comité de egresados de MINUME',desc:'Espacio institucional que integra a los egresados del modelo como parte del ecosistema MINUME.'},
      ]
    },
    { id:'poseidon', name:'Esfera de Poseidón', tag:'Crisis · Conflicto · Estabilidad', img:'Poseidon.png', color:'#4A90D9',
      desc:'Poseidón dominaba los océanos turbulentos. Esta esfera reúne los comités que administran crisis y operan cuando el orden mundial enfrenta sus mayores amenazas.',
      committees:[
        {name:'Comisión Política Especial y de Descolonización', desc:'Descolonización, paz, territorios no autónomos y Oriente Medio.'},
        {name:'OTAN',                                            desc:'Seguridad colectiva, defensa, respuesta a crisis y ciberataques.'},
        {name:'El Consejo Departamental para la Gestión del Riesgo de Desastres (CDGRD)', desc:'Manejo de crisis nacionales, emergencias y desastres.'},
      ]
    },
    { id:'atenea', name:'Esfera de Atenea', tag:'Diálogo · Estrategia · Conocimiento', img:'Atenea.png', color:'#E8935A',
      desc:'Atenea era la diosa de la sabiduría. Esta esfera reúne los comités que requieren pensamiento estratégico, cooperación técnica y diálogo intercultural.',
      committees:[
        {name:'El Buró de Investigación Federal (FBI)',                                              desc:'Investigación estratégica, inteligencia y seguridad interna.'},
        {name:'La Organización Mundial Islámica para la Educación, la Ciencia y la Cultura (ICESCO)',desc:'Educación, cultura, ciencia y diálogo intercultural en países islámicos.'},
        {name:'Cuerpo de Prensa',                                                                    desc:'Comunicación estratégica, cobertura periodística y gestión de la narrativa del modelo.'},
      ]
    },
    { id:'demeter', name:'Esfera de Deméter', tag:'Desarrollo · Economía · Sostenibilidad', img:'Demeter.png', color:'#6DBF67',
      desc:'Deméter era la diosa de la tierra fértil. Esta esfera agrupa los comités que sostienen el crecimiento económico y el desarrollo sostenible de los pueblos.',
      committees:[
        {name:'Comité de Expertos en Finanzas Públicas (CEFPP)',                      desc:'Política fiscal, finanzas públicas y estabilidad económica.'},
        {name:'El Banco Internacional de Reconstrucción y Fomento (BIRF)',            desc:'Financia desarrollo, infraestructuras y estabilidad global.'},
        {name:'La Organización de las Naciones Unidas para el Desarrollo Industrial (ONUDI)', desc:'Industrialización, desarrollo sostenible y economía productiva.'},
      ]
    },
    { id:'themis', name:'Esfera de Themis', tag:'Justicia · Derechos · Dignidad', img:'Themis.png', color:'#E8C87A',
      desc:'Themis encarnaba la ley divina y el orden justo. Esta esfera agrupa los órganos dedicados a la ética internacional y el Estado de Derecho.',
      committees:[
        {name:'CIJ',                                                desc:'Estado de derecho, derechos humanos y ética judicial internacional.'},
        {name:'CDH',                                                desc:'Protección de la dignidad humana y libertades fundamentales a escala global.'},
        {name:'Comité de Auditoría Forense — Transparencia Internacional', desc:'Órgano conjunto que combina la investigación forense de corrupción, fraude financiero y malversación con los mecanismos de rendición de cuentas y transparencia pública promovidos por Transparencia Internacional. Trabaja en la detección, documentación y sanción de malas prácticas en instituciones públicas y privadas.'},
      ]
    },
    { id:'hestia', name:'Esfera de Hestia', tag:'Humanidad · Protección · Bienestar', img:'Hestia.png', color:'#E87D6B',
      desc:'Hestia protegía el hogar y el calor humano. Esta esfera reúne los comités que protegen la vida y los derechos colectivos esenciales.',
      committees:[
        {name:'Organización Mundial de la Salud (OMS)',                                                            desc:'Salud global y protección de la vida.'},
        {name:'Comité Científico de las Naciones Unidas para el Estudio de los Efectos de las Radiaciones Atómicas', desc:'Evaluación científica de los efectos de las radiaciones ionizantes sobre la salud humana.'},
        {name:'ONU Hábitat',                                                                                       desc:'Asentamientos humanos y vida urbana digna.'},
        {name:'Foro Permanente de Cuestiones Indígenas',                                                           desc:'Derechos, identidad y bienestar de pueblos originarios.'},
      ]
    },
    { id:'prometeo', name:'Esfera de Prometeo', tag:'Futuro · Innovación · Ciencia', img:'Prometeo.png', color:'#FF8C42',
      desc:'Prometeo robó el fuego para dárselo a la humanidad. Esta esfera agrupa los órganos que trabajan el futuro: ciencia, tecnología y las grandes agendas del mañana.',
      committees:[
        {name:'Foro Político de Alto Nivel sobre Desarrollo Sostenible', desc:'Coordina la Agenda 2030 y los ODS a nivel mundial.'},
        {name:'United Nations Global Compact',                           desc:'Iniciativa de la ONU que impulsa prácticas empresariales responsables y sostenibles.'},
      ]
    },
  ];

  const grid = document.getElementById('esferasGrid');
  if (grid) {
    esferas.forEach((esfera, i) => {
      const card = document.createElement('div');
      card.className = 'esfera-card reveal';
      card.style.cssText = `--esfera-color:${esfera.color};transition-delay:${i*.065}s`;
      card.innerHTML = `
        <div class="esfera-img-wrap">
          <img class="esfera-card-img" src="${esfera.img}" alt="${esfera.name}" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
        <div class="esfera-name">${esfera.name}</div>
        <div class="esfera-tag">${esfera.tag}</div>
        <div class="esfera-desc">${esfera.desc.substring(0,90)}…</div>
        <div class="esfera-cta">Ver comités <i class="fa-solid fa-arrow-right"></i></div>`;
      card.addEventListener('click', () => openModal(esfera));
      grid.appendChild(card);
      revealObs.observe(card);
    });

    // 8th card: "Desciende al origen" narrative card
    const ctaCard = document.createElement('div');
    ctaCard.className = 'esfera-card esfera-card-cta-only reveal';
    ctaCard.style.transitionDelay = `${esferas.length * .065}s`;
    ctaCard.innerHTML = `
      <div class="ecta-icon"><i class="fa-solid fa-arrow-down"></i></div>
      <div class="ecta-text">Desciende<br>al Origen</div>
      <div class="ecta-sub">Explora la historia detrás de cada esfera del Olimpo y su conexión con MINUME.</div>`;
    ctaCard.addEventListener('click', () => {
      document.getElementById('academia')?.scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(ctaCard);
    revealObs.observe(ctaCard);
  }

  const overlay = document.getElementById('esferaModal');

  window.openModal = esfera => {
    if (!overlay) return;
    overlay.style.setProperty('--modal-color', esfera.color);
    document.getElementById('modalContent').innerHTML = `
      <img class="modal-img" src="${esfera.img}" alt="${esfera.name}" onerror="this.style.display='none'">
      <div class="modal-esfera-name">${esfera.name}</div>
      <span class="modal-esfera-tag">${esfera.tag}</span>
      <p class="modal-desc">${esfera.desc}</p>
      <div class="modal-divider"></div>
      <p class="modal-committees-label">Comités de esta esfera</p>
      <ul class="committees-list">
        ${esfera.committees.map(c=>`
          <li class="committee-item" style="border-color:${esfera.color}">
            <div class="committee-name">${c.name}</div>
            <div class="committee-desc">${c.desc}</div>
          </li>`).join('')}
      </ul>`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = () => {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (!mobileNav?.classList.contains('open')) document.body.style.overflow = '';
  };

  overlay && overlay.addEventListener('click', e => { if (e.target===overlay) closeModal(); });

});
/* ═══════════════════════════════════════════
   SESSION 3 ADDITIONS
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Slow down esferas video ─────────────── */
  const esferasVideo = document.querySelector('.esferas-video');
  if (esferasVideo) {
    esferasVideo.addEventListener('loadedmetadata', () => {
      esferasVideo.playbackRate = 0.55;
    });
    // Fallback if already loaded
    if (esferasVideo.readyState >= 1) esferasVideo.playbackRate = 0.55;
  }

  /* ── Tech Canvas for Eje 2030 ─────────────── */
  const techCanvas = document.getElementById('ejeTechCanvas');
  if (techCanvas) {
    const ctx = techCanvas.getContext('2d');
    let W, H, nodes = [], connections = [], animId;

    function resize() {
      W = techCanvas.width  = techCanvas.offsetWidth;
      H = techCanvas.height = techCanvas.offsetHeight;
      initNodes();
    }

    function initNodes() {
      nodes = [];
      const count = Math.max(28, Math.floor((W * H) / 18000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1.5 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      // Moving grid lines
      const t = Date.now() * 0.0003;
      const gridSpacing = 60;
      ctx.strokeStyle = 'rgba(0,150,255,0.04)';
      ctx.lineWidth = 1;
      const offsetX = (t * 20) % gridSpacing;
      const offsetY = (t * 12) % gridSpacing;
      for (let x = -gridSpacing + offsetX; x < W + gridSpacing; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = -gridSpacing + offsetY; y < H + gridSpacing; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Update nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Connections
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(56,217,245,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes (pulsing dots)
      nodes.forEach(n => {
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,217,245,${0.4 * pulse})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,150,255,${0.06 * pulse})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(drawFrame);
    }

    const roTech = new ResizeObserver(() => resize());
    roTech.observe(techCanvas.parentElement);
    resize();
    drawFrame();
  }

});
/* ═══════════════════════════════════════════
   SESSION 4 ADDITIONS
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Esferas video slow ── */
  const esferasVid = document.querySelector('.esferas-video');
  if (esferasVid) {
    const setRate = () => { esferasVid.playbackRate = 0.55; };
    esferasVid.addEventListener('loadedmetadata', setRate);
    if (esferasVid.readyState >= 1) setRate();
  }

  /* ── Tech Canvas (GREEN) for Eje 2030 ── */
  const tc = document.getElementById('ejeTechCanvas');
  if (tc) {
    const ctx = tc.getContext('2d');
    let W, H, nodes = [];

    const resize = () => {
      W = tc.width  = tc.offsetWidth;
      H = tc.height = tc.offsetHeight;
      nodes = [];
      const count = Math.max(28, Math.floor((W * H) / 18000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38,
          r: 1.5 + Math.random() * 2, pulse: Math.random() * Math.PI * 2
        });
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      // animated grid
      const t = Date.now() * .00025;
      const gs = 64;
      ctx.strokeStyle = 'rgba(42,170,90,0.05)';
      ctx.lineWidth = 1;
      const ox = (t * 18) % gs, oy = (t * 11) % gs;
      for (let x = -gs + ox; x < W + gs; x += gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = -gs + oy; y < H + gs; y += gs) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += .022;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      const maxD = 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < maxD) {
            const a = (1 - d/maxD) * .2;
            ctx.strokeStyle = `rgba(66,201,122,${a})`;
            ctx.lineWidth = .8;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const p = .6 + .4 * Math.sin(n.pulse);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * p, 0, Math.PI*2);
        ctx.fillStyle = `rgba(66,201,122,${.45 * p})`; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.5 * p, 0, Math.PI*2);
        ctx.fillStyle = `rgba(42,170,90,${.06 * p})`; ctx.fill();
      });

      requestAnimationFrame(frame);
    };

    new ResizeObserver(resize).observe(tc.parentElement);
    resize(); frame();
  }

  /* ── Tracker Lightbox ── */
  const trackerImg = document.getElementById('trackerImg');
  const trackerLb  = document.getElementById('trackerLightbox');
  const trackerClose = document.getElementById('trackerLbClose');

  const openLb  = () => { if (trackerLb) { trackerLb.classList.add('open'); document.body.style.overflow = 'hidden'; } };
  const closeLb = () => { if (trackerLb) { trackerLb.classList.remove('open'); document.body.style.overflow = ''; } };

  if (trackerImg) {
    trackerImg.addEventListener('click', openLb);
    trackerImg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLb(); });
  }
  if (trackerClose) trackerClose.addEventListener('click', closeLb);
  if (trackerLb)    trackerLb.addEventListener('click', e => { if (e.target === trackerLb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

});
/* ═══════════════════════════════════════════
   NOCHE DIPLOMÁTICA — Immersive ballroom
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Champagne bubbles canvas ── */
  const champCanvas = document.getElementById('champagneCanvas');
  if (champCanvas) {
    const ctx = champCanvas.getContext('2d');
    let W, H, bubbles = [], animId = null;

    const resize = () => {
      W = champCanvas.width  = champCanvas.offsetWidth;
      H = champCanvas.height = champCanvas.offsetHeight;
      bubbles = Array.from({ length: 60 }, () => createBubble(true));
    };

    function createBubble(randomY = false) {
      const r = 1 + Math.random() * 3.5;
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : H + r * 2,
        r,
        speed: 0.25 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: 0.06 + Math.random() * 0.16,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.018 + Math.random() * 0.024,
        gold: Math.random() > 0.45,
      };
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      bubbles.forEach((b, i) => {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        b.x += b.drift + Math.sin(b.wobble) * 0.22;
        if (b.y < -b.r * 3) bubbles[i] = createBubble(false);

        const color = b.gold ? `rgba(201,168,76,${b.alpha})` : `rgba(245,237,214,${b.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Glint
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = b.gold ? `rgba(255,245,200,${b.alpha * 1.4})` : `rgba(255,255,255,${b.alpha * 1.2})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(frame);
    };

    // Lazy start — only animate when in viewport
    const champObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (!animId) { resize(); frame(); }
        } else {
          cancelAnimationFrame(animId); animId = null;
        }
      });
    }, { threshold: 0.05 });
    new ResizeObserver(resize).observe(champCanvas.parentElement);
    champObs.observe(champCanvas.parentElement);
  }

  /* ── Ballroom reveal — curtain lifts when section enters view ── */
  const activSection = document.getElementById('actividades');
  if (activSection) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Short delay so user feels the transition as they arrive
          setTimeout(() => activSection.classList.add('ballroom-revealed'), 120);
          revealObs.unobserve(activSection);
        }
      });
    }, { threshold: 0.08 });
    revealObs.observe(activSection);

    // Tile stagger reveal
    const mosaic = activSection.querySelector('.gatsby-mosaic');
    if (mosaic) {
      const tileObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('tiles-visible');
            tileObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.2 });
      tileObs.observe(mosaic);
    }
  }

});

/* ═══════════════════════════════════════
   CTA SOCIAL — Galería diagonal de fondo
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('ctaGalleryBg');
  if (!bg) return;

  const photos = [
    'foto1.jpeg','foto2.jpeg','foto3.jpeg','foto4.jpeg',
    'foto5.jpeg','foto6.jpeg','foto7.jpg','foto8.jpg',
    'foto9.jpg','foto10.jpg','foto11.jpg','foto12.jpg',
    'foto13.jpg','foto14.jpg','foto15.jpg','foto16.jpg',
  ];

  // We need 5×3 = 15 cells; cycle through photos
  const total = 15;
  for (let i = 0; i < total; i++) {
    const src = photos[i % photos.length];
    const cell = document.createElement('div');
    cell.className = 'cta-gf';
    cell.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
    bg.appendChild(cell);
  }
});

/* BID section — countdown and mystery marks removed */