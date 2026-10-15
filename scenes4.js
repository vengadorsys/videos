/* EL MITO DE LA CAVERNA — 3:00–4:00 LAS SOMBRAS (pizarra, 16:9) · sincronizado a vo4.mp3 (voz acelerada x1.13, +0.3 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          image, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960, GOLD = '#BFA27A', DARK = '#2A2119', F = 1.13;
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
  let t = 0;

  /* 1 · Detrás hay un fuego encendido (cueva oscura + gis) */
  const s1 = newScene(BG.solid(DARK)); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    el('rect', { x: 460, y: 300, width: 1000, height: 380, rx: 14, fill: '#3B2E22', stroke: GOLD, 'stroke-width': 7 }, g);
    const glow = el('ellipse', { cx: CX, cy: 1100, rx: 650, ry: 330, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.55, duration: S(1.4) }, S(a + vo(2.6)));
    [610, 790, 970, 1150, 1330].forEach((x, i) => back(g, x, 990, 0.82, a + vo(0.3) + i * 0.15));
    flame(g, CX, 1010, 1.1, a + vo(2.8)); sfx('swell', a + vo(2.8), { gain: 0.7 });
    write(T(g, CX, 130, 'Detrás de los prisioneros,', { size: 104, color: CHALK }), a + vo(0.0), 1.9);
    write(T(g, CX, 250, 'hay un fuego encendido', { size: 104, color: CHALK_O }), a + vo(2.4), 2.2);
    t = 5.6;
  }
  const s2 = newScene('blueprint');
  t = TR.eraser(s1, s2, t);

  /* 2 · Esquema lateral: fuego, camino elevado, muro bajo, titiriteros (plano azul) */
  setTool(null);
  { const g = s2.g, a = t, vo = mkVo(a), W = '#FFFFFF', Y = '#FFD27A', GR = '#7EE2A8';
    const lab = (x, y, s, c, at, sz = 54) => pop(T(g, x, y, s, { size: sz, color: c, cls: 'kalam' }), a + at, { rot: 0, sound: false });
    draw(P(g, 'M60,960 L1860,960', { color: W, w: 7 }), a + vo(5.0), 0.7, { sound: false });
    // fondo (pared)
    draw(P(g, 'M1500,300 L1820,300 L1820,960 L1500,960 Z', { color: W, w: 7, fill: H('white') }), a + vo(5.2), 0.8, { sound: false });
    // prisioneros
    [1250, 1360].forEach((x, i) => back(g, x, 960, 0.6, a + vo(5.4) + i * 0.2, { fill: '#10243F', stroke: W }));
    // fuego
    flame(g, 190, 880, 1.0, a + vo(5.9)); sfx('swell', a + vo(5.9), { gain: 0.6 });
    lab(190, 1035, 'fuego', Y, vo(6.2));
    // camino elevado
    draw(P(g, 'M380,790 L960,790 M380,790 L380,960 M960,790 L960,960', { color: W, w: 8 }), a + vo(8.0), 0.9, { sound: false });
    lab(670, 880, 'camino elevado', W, vo(8.9));
    // muro bajo
    draw(P(g, 'M430,790 L430,715 L940,715 L940,790', { color: GR, w: 8, fill: H('green') }), a + vo(12.9), 0.7, { sound: false });
    lab(1090, 735, 'muro bajo', GR, vo(13.3));
    // titiriteros
    [510, 640, 770, 880].forEach((x, i) => back(g, x, 795, 0.5, a + vo(16.3) + i * 0.15, { fill: '#10243F', stroke: W }));
    // objetos que sostienen
    [['dog', 510], ['bird', 640], ['tree', 770], ['man', 880]].forEach(([k, x], i) => {
      const o = el('g', { transform: `translate(${x} 640) scale(0.55)` }, g); o.innerHTML = `<path d="${SIL[k]}" fill="${Y}" stroke="${Y}" stroke-width="8" stroke-linejoin="round"/>`;
      appear(o, a + vo(17.6) + i * 0.2, 0.3);
    });
    // rayos del fuego a la pared
    [[760, 560], [560, 700]].forEach(([y1, y2], i) => draw(P(g, `M250,840 L1500,${y1} `, { color: Y, w: 4, opacity: 0.55 }), a + vo(18.3) + i * 0.2, 0.6, { sound: false }));
    const wd = el('g', { transform: 'translate(1650 700) scale(0.7)' }, g); wd.innerHTML = `<path d="${SIL.dog}" fill="#10243F" stroke="#10243F" stroke-width="8"/>`;
    appear(wd, a + vo(19.0), 0.5);
    const t1 = T(g, CX, 100, 'Entre el fuego y ellos,', { size: 86, color: W, cls: 'hand' }); write(t1, a + vo(5.3), 1.8);
    const t2 = T(g, CX, 205, 'hay un camino elevado', { size: 86, color: Y }); write(t2, a + vo(7.3), 2.0);
    fade(t1, a + vo(9.9)); fade(t2, a + vo(9.9));
    const t3 = T(g, CX, 100, 'y a lo largo de ese camino,', { size: 86, color: W }); write(t3, a + vo(10.0), 2.0);
    const t4 = T(g, CX, 205, 'un muro bajo', { size: 100, color: GR }); write(t4, a + vo(12.4), 1.5);
    fade(t3, a + vo(14.2)); fade(t4, a + vo(14.2));
    write(T(g, CX, 100, 'parecido al biombo', { size: 86, color: W }), a + vo(14.4), 1.9);
    write(T(g, CX, 205, 'de los titiriteros', { size: 100, color: Y }), a + vo(17.0), 1.9);
    t = 22.94;
  }
  const s3 = newScene(BG.solid(DARK));
  t = TR.iris(s2, s3, t, { x: 1650, y: 640 });

  /* 3 · Sobre la pared aparecen sombras en movimiento (cueva + gis) */
  setTool('chalk');
  { const g = s3.g, a = t, vo = mkVo(a);
    write(T(g, CX, 100, 'Y así, sobre la pared del fondo,', { size: 84, color: CHALK }), a + vo(20.9), 2.6);
    write(T(g, CX, 205, 'aparecen sombras en movimiento', { size: 96, color: CHALK_O }), a + vo(23.7), 3.0);
    wallShadows(g, 360, 290, 1200, 460, a + vo(24.4), 5.2);
    [610, 790, 970, 1150, 1330].forEach((x, i) => back(g, x, 1010, 0.72, null));
    const glow = el('ellipse', { cx: CX, cy: 1120, rx: 700, ry: 300, fill: '#F2A33A', opacity: 0.45, filter: 'url(#soft)' }, g);
    t = 30.1;
  }
  const s4 = newScene('graph');
  t = TR.slideUp(s3, s4, t);

  /* 4 · Las observan, les ponen nombres, las comparan, predicen (cuaderno cuadriculado + lápiz) */
  setTool('pencil');
  { const g = s4.g, a = t, vo = mkVo(a);
    const t1 = T(g, CX, 95, 'Las observan toda su vida', { size: 92, color: GRAPHITE }); write(t1, a + vo(27.4), 2.8);
    wallShadows(g, 400, 280, 1120, 420, a + vo(27.8), 9.0, { seed: 2 });
    [640, 820, 1000, 1180, 1360].forEach(x => back(g, x, 1030, 0.7, null, { fill: '#6B5E50', stroke: GRAPHITE }));
    fade(t1, a + vo(31.2));
    const t2 = T(g, CX, 95, 'les ponen nombres,', { size: 100, color: BLUE }); write(t2, a + vo(31.5), 1.6);
    ['perro', 'pájaro', 'hombre'].forEach((s, i) => pop(T(g, 560 + i * 400, 780 + (i % 2) * 20, s, { size: 62, color: BLUE, cls: 'kalam' }), a + vo(32.4) + i * 0.5, { rot: -4 + i * 4, sound: false }));
    fade(t2, a + vo(33.2));
    const t3 = T(g, CX, 95, 'las comparan,', { size: 100, color: ORANGE }); write(t3, a + vo(33.3), 1.3);
    draw(P(g, 'M720,820 L900,820 M720,850 L900,850', { color: ORANGE, w: 9 }), a + vo(34.0), 0.3, { sound: false });
    draw(P(g, 'M1040,820 L1220,820 M1040,850 L1220,850', { color: ORANGE, w: 9 }), a + vo(34.2), 0.3, { sound: false });
    fade(t3, a + vo(34.5));
    write(T(g, CX, 95, 'predicen cuál vendrá después', { size: 90, color: RED }), a + vo(34.6), 2.5);
    pop(T(g, 1540, 640, '¿?', { size: 150, color: RED, rot: 8 }), a + vo(36.3), { sound: 'pop', rot: 8 });
    t = 41.64;
  }
  const s5 = newScene('kraft');
  t = TR.flip(s4, s5, t);

  /* 5 · Quien acierta recibe honores (kraft + pincel) */
  setTool('brush');
  { const g = s5.g, a = t, vo = mkVo(a), BR = '#2A1B10';
    write(T(g, CX, 150, 'Quien acierta más veces', { size: 112, color: BR }), a + vo(37.8), 2.5);
    [420, 620, 1300, 1500].forEach((x, i) => back(g, x, 1010, 0.8, a + 0.2 + i * 0.15, { fill: '#5C4630', stroke: BR }));
    back(g, CX, 1010, 1.1, a + 0.1, { fill: '#5C4630', stroke: BR });
    // corona de laurel del ganador
    draw(P(g, 'M880,640 Q850,585 900,555 M900,555 Q930,540 960,545 Q990,540 1020,555 M1020,555 Q1070,585 1040,640', { color: GREEN, w: 14 }), a + vo(40.6), 0.7, { sound: false });
    [[895, 570, -35], [925, 548, -15], [995, 548, 15], [1025, 570, 35]].forEach(([x, y, r], i) => {
      const l = el('ellipse', { cx: x, cy: y, rx: 20, ry: 9, fill: GREEN, stroke: BR, 'stroke-width': 4, transform: `rotate(${r} ${x} ${y})` }, g);
      appear(l, a + vo(40.9) + i * 0.1, 0.2);
    });
    write(T(g, CX, 300, 'recibe honores', { size: 140, color: '#7A1F18' }), a + vo(40.9), 1.7);
    stamp(g, 1500, 520, 'HONORES', a + vo(42.6), { color: '#1F7A4D', rot: -10, size: 90 });
    comic(g, 420, 560, '¡bravo!', a + vo(43.0), { color: '#7A1F18', size: 96, rot: -8, life: 1.2, sound: 'pop' });
    t = 49.24;
  }
  const s6 = newScene('blue');
  t = TR.flash(s5, s6, t);

  /* 6 · Su ciencia, su conversación, su cultura (azul + texto cinético) */
  setTool(null);
  { const g = s6.g, a = t, vo = mkVo(a);
    pop(T(g, CX, 230, 'Las sombras son su', { size: 130, color: '#FFFFFF' }), a + vo(44.7));
    pop(T(g, CX, 460, 'ciencia', { size: 200, color: '#FFD27A' }), a + vo(46.1), { rot: -3, sound: 'stamp' });
    pop(T(g, CX, 680, 'conversación', { size: 190, color: '#FFFFFF', stroke: INK }), a + vo(47.2), { rot: 2, sound: 'stamp' });
    pop(T(g, CX, 910, 'cultura', { size: 200, color: '#FFD27A' }), a + vo(48.9), { rot: -2, sound: 'stamp' });
    bust(g, 1760, 1050, 190, a + vo(49.0), 1.5);
    t = 55.75;
  }
  const s7 = newScene(BG.solid(DARK));
  t = TR.eraser(s6, s7, t);

  /* 7 · ¿Quién las produce? Los prisioneros nunca se lo preguntan (cueva + gis) */
  setTool('chalk');
  { const g = s7.g, a = t, vo = mkVo(a);
    wallShadows(g, 360, 330, 1200, 400, a + 0.1, 9.0, { seed: 3 });
    const ps = [610, 790, 970, 1150, 1330].map(x => { back(g, x, 1010, 0.72, null); return x; });
    const glow = el('ellipse', { cx: CX, cy: 1120, rx: 700, ry: 300, fill: '#F2A33A', opacity: 0.45, filter: 'url(#soft)' }, g);
    const q1 = T(g, CX, 150, '¿Quién las produce?', { size: 120, color: CHALK }); write(q1, a + vo(50.6), 2.1);
    const q2 = T(g, CX, 270, '¿Qué las proyecta?', { size: 120, color: CHALK_O }); write(q2, a + vo(53.1), 1.7);
    fade(q1, a + vo(55.0)); fade(q2, a + vo(55.0));
    write(T(g, CX, 150, 'Eso, los prisioneros', { size: 100, color: CHALK_B }), a + vo(55.1), 1.8);
    write(T(g, CX, 265, 'nunca se lo preguntan', { size: 100, color: CHALK }), a + vo(57.0), 1.8);
    ps.forEach((x, i) => {
      const qm = T(g, x, 800, '?', { size: 110, color: CHALK_O }); pop(qm, a + vo(57.2) + i * 0.1, { sound: false, rot: 0 });
      draw(P(g, `M${x - 40},${770} L${x + 40},${850} M${x + 40},${770} L${x - 40},${850}`, { color: RED, w: 11 }), a + vo(58.2) + i * 0.08, 0.2, { sound: false });
    });
    write(T(g, CX, 960, 'Porque, ¿cómo podrían imaginarlo?', { size: 78, color: CHALK_O }), a + vo(59.2), 2.7);
    t = 69.6;
  }
  const s8 = newScene(BG.solid(DARK));
  t = TR.iris(s7, s8, t, { x: 960, y: 1000 });

  /* 8 · Veamos qué hay realmente detrás de ellos */
  setTool('chalk');
  { const g = s8.g, a = t, vo = mkVo(a);
    const glow = el('ellipse', { cx: CX, cy: 1130, rx: 760, ry: 300, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.6, duration: S(1.6) }, S(a + vo(64.5)));
    [610, 790, 970, 1150, 1330].forEach((x, i) => back(g, x, 1000, 0.8, a + 0.1 + i * 0.1));
    write(T(g, CX, 230, 'Veamos qué hay', { size: 140, color: CHALK }), a + vo(63.1), 1.5);
    write(T(g, CX, 400, 'realmente detrás de ellos', { size: 120, color: CHALK_O }), a + vo(64.7), 2.1);
    draw(P(g, 'M1560,520 C1700,640 1700,820 1470,900', { color: CHALK_B, w: 10 }), a + vo(65.6), 0.6, { sound: false });
    draw(P(g, 'M1470,900 L1535,880 M1470,900 L1500,845', { color: CHALK_B, w: 10 }), a + vo(66.1), 0.3, { sound: false });
    t = 74.9;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
