/* EL MITO DE LA CAVERNA — 4:00–5:00 LOS OBJETOS Y LAS VOCES (pizarra, 16:9) · sincronizado a vo5.mp3 (voz acelerada x1.04, +0.3 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          image, bubble, popIn, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960, GOLD = '#BFA27A', DARK = '#2A2119', F = 1.04;
  const mkVo = a => w => Math.max(0.05, (w / F + 0.3) / 0.8 - a - 0.15);
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
  let t = 0;

  /* A · Vista trasera: portadores por el camino elevado (cueva oscura + gis) */
  const s1 = newScene(BG.solid(DARK)); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    draw(P(g, 'M0,780 L1920,780', { color: GOLD, w: 8 }), a + 0.1, 0.6, { sound: false });
    el('rect', { x: -10, y: 780, width: 1940, height: 320, fill: '#3B2E22' }, g);
    const glow = el('ellipse', { cx: 160, cy: 1080, rx: 420, ry: 240, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.5, duration: S(1.0) }, S(a + 0.3));
    walker(g, 780, 'estatua', a + vo(0.3), 8.5);
    walker(g, 780, 'perro', a + vo(6.0), 8.5);
    walker(g, 780, 'pajaro', a + vo(8.0), 8.5);
    walker(g, 780, 'jarra', a + vo(9.6), 7.5);
    walker(g, 780, 'martillo', a + vo(10.9), 7.0);
    // muro bajo delante de los portadores
    draw(P(g, 'M-10,775 L1930,775', { color: GOLD, w: 6 }), a + 0.2, 0.3, { sound: false });
    sfx('steps', a + vo(0.4), { dur: 9, gain: 0.5 });
    write(T(g, CX, 120, 'Por ese camino elevado', { size: 100, color: CHALK }), a + vo(0.0), 1.9);
    write(T(g, CX, 235, 'pasan personas cargando objetos', { size: 90, color: CHALK_O }), a + vo(1.9), 2.7);
    const l1 = T(g, CX, 960, 'estatuillas de hombres', { size: 84, color: '#E8C27A' }); write(l1, a + vo(5.1), 1.6);
    fade(l1, a + vo(6.9));
    const l2 = T(g, CX, 960, 'figuras de animales', { size: 84, color: '#C9A24A' }); write(l2, a + vo(7.05), 1.6);
    fade(l2, a + vo(8.9));
    write(T(g, CX, 960, 'utensilios de piedra y madera', { size: 84, color: '#B5AFA6' }), a + vo(9.0), 2.6);
    t = 14.92;
  }
  const s2 = newScene('sepia');
  t = TR.slideUp(s1, s2, t);

  /* B · Hablan o callan; el fuego proyecta; la cueva devuelve el eco (pergamino + pluma) */
  setTool('quill');
  { const g = s2.g, a = t, vo = mkVo(a);
    wallShadows(g, 440, 270, 1040, 330, a + vo(17.0), 6.0, { seed: 1 });
    draw(P(g, 'M0,780 L1920,780', { color: SEPIA, w: 8 }), a + 0.1, 0.5, { sound: false });
    walker(g, 780, 'estatua', a + vo(12.4), 9.0, 0.8);
    walker(g, 780, 'perro', a + vo(14.3), 9.0, 0.8);
    walker(g, 780, 'jarra', a + vo(17.5), 8.0, 0.8);
    const glow = el('ellipse', { cx: 160, cy: 1000, rx: 420, ry: 220, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.55, duration: S(1.0) }, S(a + vo(16.4)));
    flame(g, 190, 920, 0.9, a + vo(16.4));
    const t1 = T(g, CX, 90, 'Algunas hablan,', { size: 84, color: SEPIA }); write(t1, a + vo(12.6), 1.4);
    const t2 = T(g, CX, 175, 'otras guardan silencio', { size: 84, color: PURPLE }); write(t2, a + vo(14.0), 1.8);
    comic(g, 700, 690, '¡hola!', a + vo(13.3), { color: ORANGE, size: 62, rot: -6, life: 1.2, sound: 'pop' });
    comic(g, 1100, 690, '...', a + vo(15.0), { color: GRAPHITE, size: 70, rot: 0, life: 1.0, sound: 'pop' });
    fade(t1, a + vo(16.2)); fade(t2, a + vo(16.2));
    write(T(g, CX, 90, 'El fuego proyecta sus sombras', { size: 84, color: SEPIA }), a + vo(16.4), 2.0);
    write(T(g, CX, 175, 'y la cueva devuelve el eco de sus voces', { size: 78, color: RED }), a + vo(20.0), 3.0);
    // eco: arcos concéntricos que salen de la pared
    [0, 1, 2].forEach(i => draw(P(g, `M${1560 + i * 50},${380 - 40 - i * 25} Q${1600 + i * 60},435 ${1560 + i * 50},${380 + 40 + i * 25 + 55}`, { color: RED, w: 7 }), a + vo(22.0) + i * 0.25, 0.3, { sound: false }));
    comic(g, 1640, 330, 'eco...', a + vo(22.2), { color: RED, size: 64, rot: -8, life: 1.3, sound: 'pop' });
    t = 28.4;
  }
  const s3 = newScene('blue');
  t = TR.flash(s2, s3, t);

  /* C · Creen que las sombras hablan (azul + globo de diálogo) */
  setTool(null);
  { const g = s3.g, a = t, vo = mkVo(a);
    wallShadows(g, 1000, 330, 800, 340, a + vo(24.4), 8.0, { seed: 3 });
    [260, 420, 580].forEach((x, i) => back(g, x, 1020, 0.85, a + vo(24.5) + i * 0.15, { fill: '#16306B', stroke: '#FFFFFF' }));
    const bb = bubble(g, 1040, 90, 1780, 270, 1380, 360);
    popIn(bb, a + vo(27.4), { origin: '50% 100%' });
    type(T(bb, 1090, 195, '¡Hola, amigos!', { size: 70, anchor: 'start', cls: 'code' }), a + vo(27.9), 1.3, ORANGE);
    const c1 = T(g, 600, 140, 'Los prisioneros creen', { size: 80, color: '#FFFFFF' }); pop(c1, a + vo(23.8), { rot: 0 });
    const c2 = T(g, 600, 245, 'que esas voces vienen', { size: 70, color: '#FFD27A', cls: 'kalam' }); pop(c2, a + vo(26.3), { rot: 0, sound: false });
    const c3 = T(g, 600, 400, 'de las sombras', { size: 120, color: '#FFFFFF', stroke: INK }); pop(c3, a + vo(28.7), { rot: -3, sound: 'stamp' });
    fade(c1, a + vo(30.3)); fade(c2, a + vo(30.3)); fade(c3, a + vo(30.3));
    pop(T(g, 600, 160, 'Piensan que', { size: 90, color: '#FFFFFF' }), a + vo(30.5), { rot: 0 });
    pop(T(g, 600, 290, 'las sombras', { size: 110, color: '#FFD27A' }), a + vo(31.5), { rot: 0, sound: false });
    pop(T(g, 600, 470, 'HABLAN', { size: 190, color: '#FFFFFF', stroke: INK }), a + vo(32.3), { rot: -4, sound: 'stamp' });
    t = 40.26;
  }
  const s4 = newScene('graph');
  t = TR.eraser(s3, s4, t);

  /* D · No hay diferencia entre la imagen y la cosa real (cuaderno + lápiz) */
  setTool('pencil');
  { const g = s4.g, a = t, vo = mkVo(a);
    write(T(g, CX, 130, 'Para ellos,', { size: 110, color: GRAPHITE }), a + vo(33.7), 1.0);
    write(T(g, CX, 255, 'no hay diferencia', { size: 130, color: RED }), a + vo(34.9), 1.6);
    const sh = el('g', { transform: 'translate(430 880) scale(2.6)' }, g); sh.innerHTML = `<path d="${SIL.dog}" fill="#1E1812" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    appear(sh, a + vo(36.0), 0.4);
    const rl = el('g', { transform: 'translate(1330 880) scale(2.6)' }, g); rl.innerHTML = `<path d="${SIL.dog}" fill="#C9A24A" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    appear(rl, a + vo(36.3), 0.4);
    draw(P(g, 'M780,610 L1060,610 M780,690 L1060,690', { color: RED, w: 16 }), a + vo(36.0), 0.5);
    write(T(g, 560, 1000, 'imagen', { size: 80, color: GRAPHITE }), a + vo(37.1), 0.7);
    write(T(g, 1460, 1000, 'cosa real', { size: 80, color: ORANGE }), a + vo(38.8), 0.9);
    bust(g, 1790, 1060, 180, a + vo(37.5), 2.0);
    t = 48.0;
  }
  const s5 = newScene('kraft');
  t = TR.flip(s4, s5, t);

  /* E · Una copia de una copia (kraft + pincel) */
  setTool('brush');
  { const g = s5.g, a = t, vo = mkVo(a), BR = '#2A1B10';
    pop(T(g, CX, 150, 'Esto es clave:', { size: 140, color: '#7A1F18' }), a + vo(40.1), { rot: -3, sound: 'stamp' });
    write(T(g, CX, 290, 'no es una mentira', { size: 110, color: BR }), a + vo(42.0), 1.5);
    draw(P(g, 'M560,270 L1360,235', { color: '#B3261E', w: 14 }), a + vo(44.4), 0.3);
    write(T(g, CX, 380, 'inventada para engañarlos', { size: 66, color: '#4A3420', cls: 'kalam' }), a + vo(44.0), 1.9);
    write(T(g, CX, 520, 'es una copia de una copia', { size: 104, color: BR }), a + vo(46.1), 2.3);
    const icon = (x, fill, ped, at, label) => {
      const gi = el('g', {}, g);
      gi.innerHTML = `<g transform="translate(${x} 820) scale(1.5)"><path d="${SIL.dog}" fill="${fill}" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/></g>` + (ped ? `<rect x="${x - 100}" y="826" width="200" height="40" fill="#9C968B" stroke="#1E1812" stroke-width="5"/>` : '');
      appear(gi, at, 0.4);
      pop(T(g, x, 960, label, { size: 62, color: BR, cls: 'kalam' }), at + 0.2, { rot: 0, sound: false });
    };
    icon(430, '#7C5A38', false, a + vo(46.6), 'objeto real');
    draw(P(g, 'M620,740 L770,740 M740,715 L770,740 L740,765', { color: BR, w: 9 }), a + vo(47.2), 0.3, { sound: false });
    icon(960, '#C9A24A', true, a + vo(47.4), 'estatuilla');
    draw(P(g, 'M1150,740 L1300,740 M1270,715 L1300,740 L1270,765', { color: BR, w: 9 }), a + vo(47.8), 0.3, { sound: false });
    icon(1490, '#1E1812', false, a + vo(48.0), 'sombra');
    t = 58.56;
  }
  const s6 = newScene('paper');
  t = TR.iris(s5, s6, t, { x: 1490, y: 760 });

  /* F · Objetos artificiales; dos pasos de la verdad, pero lejos (papel + plumón) */
  setTool('marker');
  { const g = s6.g, a = t, vo = mkVo(a);
    draw(P(g, 'M60,980 L1860,980', { color: INK, w: 7 }), a + 0.1, 0.5, { sound: false });
    [250, 380, 510].forEach((x, i) => back(g, x, 980, 0.8, a + vo(48.9) + i * 0.15, { fill: '#6B5E50', stroke: INK }));
    draw(P(g, 'M780,980 L780,800 L1060,800 L1060,980', { color: INK, w: 8, fill: H('gray') }), a + vo(49.4), 0.6, { sound: false });
    [['estatua', 840], ['perro', 920], ['pajaro', 1000]].forEach(([k, x], i) => {
      const o = el('g', { transform: `translate(${x} 790) scale(0.62)` }, g);
      o.innerHTML = `<path d="${OBJ[k].d}" fill="${OBJ[k].fill}" stroke="#1E1812" stroke-width="6" stroke-linejoin="round"/>`;
      appear(o, a + vo(50.0) + i * 0.3, 0.3);
    });
    const sunp = el('g', {}, g);
    sunp.innerHTML = '<circle cx="1700" cy="820" r="70" fill="#F5C84C" stroke="#2A1F1C" stroke-width="6"/>' + [0,1,2,3,4,5,6,7,8,9].map(k => { const an = k / 10 * Math.PI * 2; return `<line x1="${1700 + Math.cos(an) * 92}" y1="${820 + Math.sin(an) * 92}" x2="${1700 + Math.cos(an) * 125}" y2="${820 + Math.sin(an) * 125}" stroke="#E8A530" stroke-width="8" stroke-linecap="round"/>`; }).join('');
    appear(sunp, a + vo(55.4), 0.6);
    const f1 = T(g, CX, 120, 'Objetos artificiales', { size: 100 }); write(f1, a + vo(48.9), 1.7);
    const f2 = T(g, CX, 235, 'proyectados como sombras', { size: 92, color: RED }); write(f2, a + vo(50.6), 2.0);
    fade(f1, a + vo(52.9)); fade(f2, a + vo(52.9));
    const f3 = T(g, CX, 120, 'Están a dos pasos', { size: 100 }); write(f3, a + vo(53.0), 1.7);
    const f4 = T(g, CX, 235, 'de la verdad,', { size: 100, color: GREEN }); write(f4, a + vo(54.5), 1.3);
    // dos pasos
    [610, 700].forEach((x, i) => { draw(P(g, `M${x - 22},960 q-6,-34 24,-30 q26,0 18,32 Z`, { color: INK, w: 6, fill: H('gray') }), a + vo(53.8) + i * 0.4, 0.3, { sound: false }); pop(T(g, x, 900, String(i + 1), { size: 70, color: BLUE }), a + vo(53.9) + i * 0.4, { rot: 0, sound: false }); });
    fade(f3, a + vo(55.3)); fade(f4, a + vo(55.3));
    const f5 = T(g, CX, 120, 'y sin embargo,', { size: 100 }); write(f5, a + vo(55.4), 1.2);
    write(T(g, CX, 235, 'completamente lejos de ella', { size: 92, color: RED }), a + vo(56.7), 2.2);
    draw(P(g, 'M1120,880 L1530,880 M1490,850 L1530,880 L1490,910', { color: RED, w: 9 }), a + vo(57.0), 0.6, { sound: false });
    write(T(g, 1320, 830, 'LEJOS', { size: 90, color: RED }), a + vo(57.6), 0.9);
    write(T(g, CX, 520, 'Hasta que algo cambia...', { size: 140, color: ORANGE, rot: -2 }), a + vo(59.4), 1.7);
    t = 74.4;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
