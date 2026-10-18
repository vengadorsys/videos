/* EL MITO DE LA CAVERNA — 9:00–10:00 EL DILEMA (pizarra, 16:9) · sincronizado a vo9.mp3 (voz x1.04, +1.2 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          image, bubble, popIn, person, popPerson, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960, GOLD = '#BFA27A', DARK = '#2A2119', F = 1.04, D = 1.2;
  const mkVo = a => w => Math.max(0.05, (w / F + D) / 0.8 - a - 0.15);
  const fade = (obj, at) => tl.to(obj, { opacity: 0, duration: S(0.25) }, S(at));
  const appear = (obj, at, d = 0.4) => { gsap.set(obj, { opacity: 0 }); tl.to(obj, { opacity: 1, duration: S(d) }, S(at)); };
  const bust = (g, x, y, h, at, life = 5) => {
    const w = h * 582 / 700, m = mover(g, x, y, 1);
    image(m.g, 'busto.png', -w / 2, -h, w, h);
    gsap.set(m.g, { opacity: 0 });
    tl.to(m.g, { opacity: 1, duration: S(0.7) }, S(at));
    tl.fromTo(m, { r: -1.2 }, { r: 1.2, duration: S(1.4), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil(life / 1.4)), immediateRender: false }, S(at));
    tl.fromTo(m, { y: y }, { y: y - 5, duration: S(1.0), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil(life / 1.0)), immediateRender: false }, S(at));
    return m;
  };
  // prisionero de espaldas (silueta): cabeza + hombros
  const back = (g, x, feet, sc, at, o = {}) => {
    const gr = el('g', { transform: `translate(${x} ${feet}) scale(${sc})` }, g);
    el('path', { d: 'M-62,0 Q-66,-95 -32,-118 L32,-118 Q66,-95 62,0 Z', fill: o.fill || '#3A2D22', stroke: o.stroke || '#E8D9B8', 'stroke-width': 6 / sc * 0.9 }, gr);
    el('circle', { cx: 0, cy: -152, r: 36, fill: o.fill || '#3A2D22', stroke: o.stroke || '#E8D9B8', 'stroke-width': 6 / sc * 0.9 }, gr);
    if (at != null) appear(gr, at, 0.35);
    return gr;
  };
  // siluetas para las sombras (base en y=0, ~130 de alto)
  const SIL = {
    man: 'M-24,0 L-18,-80 Q0,-94 18,-80 L24,0 Z M0,-130 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0',
    dog: 'M-60,-36 Q-60,-62 -26,-62 L24,-62 Q32,-84 50,-78 L58,-60 Q74,-58 66,-42 L44,-38 L44,0 L30,0 L28,-34 L-22,-34 L-26,0 L-42,0 L-44,-34 Z M-60,-52 Q-80,-72 -76,-92 L-66,-60 Z',
    bird: 'M-60,-70 Q-34,-112 0,-70 Q34,-112 60,-70 Q34,-82 0,-48 Q-34,-82 -60,-70 Z',
    tree: 'M-12,0 L-12,-60 L12,-60 L12,0 Z M0,-135 m-52,0 a52,52 0 1,0 104,0 a52,52 0 1,0 -104,0 M0,-100 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0',
  };
  const KINDS = ['man', 'dog', 'bird', 'tree', 'man', 'dog', 'bird', 'man'];
  let clipN = 0;
  // pared con sombras que cruzan (recortadas al borde de la pared)
  const wallShadows = (g, x0, y0, w, h, at, life, o = {}) => {
    const id = 'wc' + (clipN++);
    const cp = el('clipPath', { id }, g); el('rect', { x: x0, y: y0, width: w, height: h }, cp);
    el('rect', { x: x0, y: y0, width: w, height: h, rx: 14, fill: o.fill || '#F1E3C4', stroke: GOLD, 'stroke-width': 8 }, g);
    const layer = el('g', { 'clip-path': `url(#${id})` }, g);
    const sc = h / 330, n = Math.max(2, Math.round(life / 2.4));
    for (let i = 0; i < n; i++) {
      const k = KINDS[(i + (o.seed || 0)) % KINDS.length];
      const sh = el('g', {}, layer); sh.innerHTML = `<path d="${SIL[k]}" fill="#1E1812" fill-rule="nonzero" stroke="#1E1812" stroke-width="10" stroke-linejoin="round"/>`;
      const dir = i % 2 ? -1 : 1, from = dir > 0 ? x0 - 120 : x0 + w + 120, to = dir > 0 ? x0 + w + 120 : x0 - 120;
      gsap.set(sh, { x: from, y: y0 + h - 28 - (i % 3) * 8, scale: sc * 1.15, opacity: 0 });
      const t0 = at + i * (life / n);
      tl.set(sh, { opacity: 1 }, S(t0));
      tl.to(sh, { x: to, duration: S(life / n * 1.7), ease: 'none' }, S(t0));
      tl.set(sh, { opacity: 0 }, S(t0 + life / n * 1.7));
    }
    return layer;
  };
  const flame = (g, x, y, sc, at, life) => {
    const f = el('g', { transform: `translate(${x} ${y}) scale(${sc})` }, g);
    f.innerHTML = '<path d="M0,80 Q-50,20 -10,-40 Q0,-10 25,-60 Q75,0 40,80 Z" fill="#F2A33A" stroke="#C4501F" stroke-width="7"/><path d="M0,80 Q-20,40 5,10 Q25,40 20,80 Z" fill="#FFE08A"/>';
    appear(f, at, 0.5);
    return f;
  };
  // objetos que cargan sobre la cabeza (base en y=0)
  const OBJ = {
    estatua: { d: SIL.man, fill: '#E8C27A' },
    perro: { d: SIL.dog, fill: '#C9A24A' },
    pajaro: { d: SIL.bird, fill: '#D9B35A' },
    jarra: { d: 'M-30,0 L-24,-50 Q-42,-62 -20,-84 L20,-84 Q42,-62 24,-50 L30,0 Z', fill: '#B5AFA6' },
    martillo: { d: 'M-9,0 L9,0 L9,-72 L46,-72 L46,-104 L-46,-104 L-46,-72 L-9,-72 Z', fill: '#9C7A52' },
  };
  // portador de espaldas con objeto sobre la cabeza; cruza de izquierda a derecha
  const walker = (g, feet, kind, at, dur, sc = 0.95, x0 = -160, x1 = 2080) => {
    const w = el('g', {}, g), bob = el('g', {}, w);
    back(bob, 0, feet, sc, null);
    const o = el('g', { transform: `translate(0 ${feet - 188 * sc - 6}) scale(${sc * 1.15})` }, bob);
    o.innerHTML = `<path d="${OBJ[kind].d}" fill="${OBJ[kind].fill}" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    gsap.set(w, { x: x0, opacity: 0 });
    tl.set(w, { opacity: 1 }, S(at));
    tl.to(w, { x: x1, duration: S(dur), ease: 'none' }, S(at));
    tl.set(w, { opacity: 0 }, S(at + dur));
    // balanceo al andar
    tl.fromTo(bob, { y: 0 }, { y: -7, duration: S(0.28), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.round(dur / 0.28)), immediateRender: false }, S(at));
    return w;
  };
  const star = (g, x, y, r, c, at) => { // destello de 4 puntas
    const s = el('path', { d: `M${x},${y - r} L${x + r * .25},${y - r * .25} L${x + r},${y} L${x + r * .25},${y + r * .25} L${x},${y + r} L${x - r * .25},${y + r * .25} L${x - r},${y} L${x - r * .25},${y - r * .25} Z`, fill: c, stroke: '#C4501F', 'stroke-width': 3 }, g);
    appear(s, at, 0.2);
    tl.to(s, { opacity: 0.35, duration: S(0.3), yoyo: true, repeat: 5 }, S(at + 0.3));
    return s;
  };
  const sunIcon = (g, x, y, r, at) => {
    const sp = el('g', {}, g);
    sp.innerHTML = `<circle cx="${x}" cy="${y}" r="${r}" fill="#F5C84C" stroke="#2A1F1C" stroke-width="6"/>` + [0,1,2,3,4,5,6,7,8,9].map(k => { const an = k / 10 * Math.PI * 2; return `<line x1="${x + Math.cos(an) * r * 1.3}" y1="${y + Math.sin(an) * r * 1.3}" x2="${x + Math.cos(an) * r * 1.8}" y2="${y + Math.sin(an) * r * 1.8}" stroke="#E8A530" stroke-width="8" stroke-linecap="round"/>`; }).join('');
    appear(sp, at, 0.5);
    return sp;
  };
  let t = 0;
  const heart = (g, x, y, sc, c, at) => {
    const h = el('g', { transform: `translate(${x} ${y}) scale(${sc})` }, g);
    h.innerHTML = `<path d="M0,40 C-80,-20 -50,-80 0,-40 C50,-80 80,-20 0,40 Z" fill="${c}" stroke="#2A1F1C" stroke-width="5"/>`;
    appear(h, at, 0.5); return h;
  };
  const mask = (g, x, y, sc, at) => { // máscara trágica
    const m = el('g', { transform: `translate(${x} ${y}) scale(${sc})` }, g);
    m.innerHTML = '<path d="M-90,-110 Q0,-140 90,-110 Q100,40 0,120 Q-100,40 -90,-110 Z" fill="#E8D9B8" stroke="#2A1F1C" stroke-width="7"/><path d="M-60,-40 Q-35,-70 -10,-40 M10,-40 Q35,-70 60,-40" stroke="#2A1F1C" stroke-width="8" fill="none"/><ellipse cx="-38" cy="-30" rx="20" ry="12" fill="#2A1F1C"/><ellipse cx="38" cy="-30" rx="20" ry="12" fill="#2A1F1C"/><path d="M-40,70 Q0,30 40,70" stroke="#2A1F1C" stroke-width="9" fill="none"/>';
    appear(m, at, 0.5); return m;
  };

  /* 1 · Mira hacia abajo, hacia la entrada de la cueva; su sombra se alarga (papel + plumón) */
  const s1 = newScene('paper'); show(s1, 0); setTool('marker');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    sunIcon(g, 220, 200, 80, a + 0.3);
    el('path', { d: 'M0,600 L700,600 Q1000,610 1250,790 L1920,920 L1920,1080 L0,1080 Z', fill: '#8FBF7A', stroke: INK, 'stroke-width': 8 }, g);
    // entrada de la cueva (abajo a la derecha)
    el('path', { d: 'M1500,925 L1500,790 Q1650,700 1800,790 L1800,935 Z', fill: '#2A2119', stroke: INK, 'stroke-width': 8 }, g);
    // sombra alargada que se estira hacia la entrada
    const shd = el('path', { d: 'M470,606 L1520,880 L1520,915 L430,612 Z', fill: '#1E1812', opacity: 0.55 }, g);
    gsap.set(shd, { transformOrigin: '0% 50%', scaleX: 0.05 });
    tl.to(shd, { scaleX: 1, duration: S(2.4), ease: 'power1.inOut' }, S(a + vo(2.0)));
    back(g, 450, 610, 1.0, a + vo(0.3), { fill: '#5C4630', stroke: INK });
    [[330, 400], [560, 380], [450, 330]].forEach(([x, y], i) => star(g, x, y, 28, '#FFE08A', a + vo(1.6) + i * 0.2));
    write(T(g, 1100, 130, '¿Qué haría ahora?', { size: 120 }), a + vo(0.0), 1.2);
    write(T(g, 1100, 250, 'Es feliz.', { size: 110, color: ORANGE }), a + vo(1.4), 1.1);
    write(T(g, 1100, 370, 'Ha visto lo real', { size: 100, color: GREEN }), a + vo(2.9), 1.3);
    t = 6.35;
  }
  const s2 = newScene(BG.solid(DARK));
  t = TR.iris(s1, s2, t, { x: 1650, y: 850 });

  /* 2 · Allá abajo, sus antiguos compañeros apostando por sombras; compasión (cueva + gis) */
  setTool('chalk');
  { const g = s2.g, a = t, vo = mkVo(a);
    wallShadows(g, 700, 300, 880, 360, a + vo(5.0), 11.5, { seed: 4 });
    [820, 1000, 1180, 1360].forEach((x, i) => back(g, x, 1030, 0.75, a + vo(5.0) + i * 0.15, { fill: '#3A2D22', stroke: '#E8D9B8' }));
    const glow = el('ellipse', { cx: CX, cy: 1120, rx: 700, ry: 280, fill: '#F2A33A', opacity: 0.4, filter: 'url(#soft)' }, g);
    const c1 = T(g, CX, 100, 'Allá abajo siguen', { size: 92, color: CHALK }); write(c1, a + vo(4.6), 1.5);
    const c2 = T(g, CX, 200, 'sus antiguos compañeros,', { size: 92, color: CHALK_B }); write(c2, a + vo(6.4), 2.0);
    [[560, 760, '$'], [740, 800, '$'], [1480, 800, '$'], [1650, 770, '$']].forEach(([x, y, s], i) => comic(g, x, y, s, a + vo(10.3) + i * 0.2, { color: '#FFE08A', size: 110, rot: -8 + i * 5, life: 1.8, sound: 'pop' }));
    write(T(g, 300, 480, 'encadenados,', { size: 84, color: CHALK_O }), a + vo(8.5), 1.5);
    write(T(g, 1620, 480, 'apostando', { size: 84, color: '#FFE08A' }), a + vo(10.2), 1.0);
    write(T(g, 1620, 580, 'por sombras', { size: 84, color: '#FFE08A' }), a + vo(11.1), 1.0);
    fade(c1, a + vo(12.4)); fade(c2, a + vo(12.4));
    write(T(g, CX, 100, 'Platón dice que', { size: 92, color: CHALK_B }), a + vo(12.6), 1.2);
    write(T(g, CX, 200, 'el liberado sentiría compasión', { size: 92, color: CHALK }), a + vo(13.9), 2.4);
    bust(g, 260, 1030, 380, a + vo(12.7), 5);
    heart(g, CX, 470, 1.6, '#E0524C', a + vo(15.3));
    t = 21.2;
  }
  const s3 = newScene('sepia');
  t = TR.slideUp(s2, s3, t);

  /* 3 · Preferiría sufrir cualquier cosa antes que volver a vivir como antes (pergamino + pluma) */
  setTool('quill');
  { const g = s3.g, a = t, vo = mkVo(a);
    back(g, 960, 960, 1.0, a + vo(17.0), { fill: '#6B5E50', stroke: SEPIA });
    // derecha: tormenta (sufrir cualquier cosa)
    draw(P(g, 'M1250,420 Q1200,360 1280,340 Q1320,270 1420,300 Q1520,260 1560,350 Q1650,370 1600,440 Z', { color: SEPIA, w: 8, fill: '#9AA3AE' }), a + vo(18.0), 0.7, { sound: false });
    draw(P(g, 'M1400,450 L1360,540 L1420,540 L1370,650', { color: '#E8A530', w: 14 }), a + vo(18.8), 0.4, { sound: false });
    draw(P(g, 'M1290,460 L1270,520 M1500,450 L1480,510 M1560,470 L1540,530', { color: BLUE, w: 8 }), a + vo(19.0), 0.4, { sound: false });
    draw(P(g, 'M1060,780 L1250,700 M1215,690 L1250,700 L1225,730', { color: GREEN, w: 11 }), a + vo(19.2), 0.5, { sound: false });
    // izquierda: la cueva de antes, tachada
    draw(P(g, 'M300,900 L300,640 Q450,540 600,640 L600,900', { color: SEPIA, w: 9, fill: '#3A2D22' }), a + vo(21.0), 0.7, { sound: false });
    draw(P(g, 'M240,560 L660,900 M660,560 L240,900', { color: RED, w: 16 }), a + vo(22.2), 0.4, { sound: false });
    write(T(g, CX, 110, 'Preferiría sufrir', { size: 108, color: SEPIA }), a + vo(16.9), 1.6);
    write(T(g, CX, 225, 'cualquier cosa', { size: 118, color: GREEN }), a + vo(18.5), 1.5);
    write(T(g, 450, 990, 'antes que volver', { size: 70, color: SEPIA }), a + vo(20.4), 1.3);
    write(T(g, 1350, 990, 'a vivir como antes', { size: 80, color: RED }), a + vo(21.8), 1.4);
    t = 29.16;
  }
  const s4 = newScene('blue');
  t = TR.flash(s3, s4, t);

  /* 4 · ¿Se quedaría arriba disfrutando solo? Para Platón, no (azul + texto cinético) */
  setTool(null);
  { const g = s4.g, a = t, vo = mkVo(a);
    sunIcon(g, 1600, 260, 80, a + vo(26.0));
    el('path', { d: 'M1200,900 Q1500,780 1860,900 L1860,1080 L1200,1080 Z', fill: '#3C8A55', stroke: '#16306B', 'stroke-width': 7 }, g);
    back(g, 1520, 880, 0.9, a + vo(26.2), { fill: '#16306B', stroke: '#FFFFFF' });
    pop(T(g, 640, 160, 'Y sin embargo,', { size: 112, color: '#FFFFFF' }), a + vo(23.51), { rot: 0 });
    pop(T(g, 640, 330, '¿se quedaría arriba,', { size: 110, color: '#FFD27A' }), a + vo(24.7), { rot: -2, sound: false });
    pop(T(g, 640, 500, 'disfrutando solo', { size: 100, color: '#FFFFFF' }), a + vo(26.3), { rot: 2, sound: false });
    pop(T(g, 640, 620, 'de su descubrimiento?', { size: 84, color: '#FFFFFF', cls: 'kalam' }), a + vo(27.4), { rot: 0, sound: false });
    pop(T(g, 640, 800, 'Para Platón,', { size: 110, color: '#FFFFFF' }), a + vo(29.2), { rot: -3 });
    pop(T(g, 640, 980, 'NO', { size: 230, color: '#FF7A6B', stroke: INK }), a + vo(30.0), { rot: -5, sound: 'stamp' });
    t = 38.0;
  }
  const s5 = newScene('graph');
  t = TR.eraser(s4, s5, t);

  /* 5 · Quien ha visto la verdad tiene una responsabilidad: regresar y ayudar (cuaderno + lápiz) */
  setTool('pencil');
  { const g = s5.g, a = t, vo = mkVo(a);
    write(T(g, CX, 110, 'Quien ha visto la verdad', { size: 100, color: GRAPHITE }), a + vo(30.9), 1.9);
    write(T(g, CX, 225, 'tiene una responsabilidad:', { size: 100, color: RED }), a + vo(32.7), 2.0);
    // arriba: el liberado extiende la mano; abajo: un prisionero encadenado
    draw(P(g, 'M200,620 L1000,620', { color: GRAPHITE, w: 8 }), a + vo(33.2), 0.5, { sound: false });
    back(g, 560, 620, 1.1, a + vo(33.4), { fill: '#6B5E50', stroke: GRAPHITE });
    draw(P(g, 'M640,500 C760,520 820,640 780,780', { color: GRAPHITE, w: 12 }), a + vo(35.0), 0.7, { sound: false });
    draw(P(g, 'M200,1000 L1000,1000', { color: GRAPHITE, w: 8 }), a + vo(33.6), 0.5, { sound: false });
    back(g, 860, 1000, 0.9, a + vo(33.8), { fill: '#6B5E50', stroke: GRAPHITE });
    draw(P(g, 'M820,980 q14,26 28,0 q14,-26 28,0', { color: GRAPHITE, w: 7 }), a + vo(34.2), 0.3, { sound: false });
    write(T(g, 1420, 520, 'regresar', { size: 130, color: BLUE }), a + vo(34.9), 0.9);
    write(T(g, 1420, 680, 'y ayudar', { size: 130, color: GREEN }), a + vo(36.0), 0.9);
    write(T(g, 1420, 830, 'a los demás', { size: 100, color: GRAPHITE }), a + vo(36.7), 0.9);
    draw(P(g, 'M1180,580 C1090,700 1090,800 1130,900 M1100,860 L1130,900 L1160,850', { color: BLUE, w: 10 }), a + vo(35.3), 0.6, { sound: false });
    t = 46.73;
  }
  const s6 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.flip(s5, s6, t);

  /* 6 · Incómoda y humana; saber no te hace superior, te hace responsable (pizarrón + gis) */
  setTool('chalk');
  { const g = s6.g, a = t, vo = mkVo(a);
    write(T(g, CX, 130, 'Esa idea es', { size: 96, color: CHALK }), a + vo(38.13), 1.0);
    write(T(g, CX, 270, 'profundamente incómoda,', { size: 110, color: CHALK_O }), a + vo(39.1), 1.9);
    write(T(g, CX, 420, 'y también', { size: 84, color: CHALK_B, cls: 'kalam' }), a + vo(41.0), 0.8);
    write(T(g, CX, 560, 'profundamente humana', { size: 120, color: CHALK }), a + vo(41.9), 1.7);
    heart(g, 1700, 330, 1.2, '#E0524C', a + vo(43.0));
    const f1 = T(g, CX, 780, 'Saber algo no te hace superior,', { size: 84, color: CHALK_B }); write(f1, a + vo(43.93), 2.4);
    draw(P(g, 'M1180,770 L1580,760', { color: RED, w: 12 }), a + vo(46.0), 0.3, { sound: false });
    write(T(g, CX, 930, 'te hace RESPONSABLE', { size: 130, color: CHALK_O }), a + vo(46.6), 1.6);
    bust(g, 230, 1040, 340, a + vo(44.0), 4);
    t = 59.23;
  }
  const s7 = newScene(BG.solid('#17110C'));
  t = TR.iris(s6, s7, t, { x: 960, y: 930 });

  /* 7 · Decide volver a bajar; lo que le espera es lo más trágico (cueva oscura + gis) */
  setTool('chalk');
  { const g = s7.g, a = t, vo = mkVo(a);
    const dark = el('ellipse', { cx: 1500, cy: 1000, rx: 520, ry: 300, fill: '#6E1F1A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(dark, { opacity: 0.7, duration: S(5.0) }, S(a + vo(52.3)));
    const pts = [[1450, 200], [1090, 240], [1130, 330], [800, 400], [880, 510], [570, 590], [660, 700], [340, 800], [430, 910], [140, 1000]].reverse().reverse();
    let d = `M${pts[0][0]},${pts[0][1]}`; pts.slice(1).forEach(p => d += ` L${p[0]},${p[1]}`);
    draw(P(g, d, { color: GOLD, w: 12 }), a + 0.1, 1.2, { sound: false });
    const cm = mover(g, pts[0][0], pts[0][1], 0.55);
    back(cm.g, 0, 0, 1.0, null, { fill: '#5C4630', stroke: '#E8D9B8' });
    tl.to(cm, { keyframes: pts.slice(1).map(p => ({ x: p[0], y: p[1], duration: S(0.7), ease: 'none' })) }, S(a + vo(48.7)));
    const k1 = T(g, 1250, 700, 'Así que el prisionero', { size: 84, color: CHALK }); write(k1, a + vo(48.53), 1.7);
    const k2 = T(g, 1350, 820, 'decide volver a bajar', { size: 96, color: CHALK_O }); write(k2, a + vo(50.1), 1.9);
    fade(k1, a + vo(52.1)); fade(k2, a + vo(52.1));
    write(T(g, 1250, 700, 'Pero lo que le espera', { size: 84, color: CHALK }), a + vo(52.28), 1.5);
    write(T(g, 1350, 810, 'allá abajo es lo que Platón', { size: 78, color: CHALK_B }), a + vo(53.5), 2.0);
    write(T(g, 1380, 930, 'considera lo más trágico', { size: 90, color: '#FF8A7A' }), a + vo(56.1), 1.9);
    write(T(g, 1500, 1040, 'de todo el mito', { size: 80, color: CHALK }), a + vo(58.3), 1.4);
    mask(g, 330, 420, 1.2, a + vo(57.2));
    t = 74.4;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
