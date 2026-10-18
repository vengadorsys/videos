/* EL MITO DE LA CAVERNA — 10:00–11:00 EL REGRESO A LA OSCURIDAD (pizarra, 16:9) · sincronizado a vo10.mp3 (+1.2 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          image, bubble, popIn, person, popPerson, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960, GOLD = '#BFA27A', DARK = '#2A2119', F = 1.0, D = 1.2;
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

  /* 1 · Desciende, la luz se apaga, tropieza en la penumbra (cueva + gis) */
  const s1 = newScene(BG.solid(DARK)); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    const exit = el('ellipse', { cx: 1650, cy: 230, rx: 460, ry: 340, fill: '#FFF1B0', opacity: 0.85, filter: 'url(#soft)' }, g);
    tl.to(exit, { opacity: 0, duration: S(10.0), ease: 'power1.in' }, S(a + 0.3));
    const pts = [[1450, 200], [1090, 240], [1130, 330], [800, 400], [880, 510], [570, 590], [660, 700], [340, 800], [430, 910], [140, 1000]];
    let d = `M${pts[0][0]},${pts[0][1]}`; pts.slice(1).forEach(p => d += ` L${p[0]},${p[1]}`);
    draw(P(g, d, { color: GOLD, w: 12 }), a + 0.2, 1.2, { sound: false });
    [[1230, 280], [960, 440], [920, 340], [700, 640], [720, 540], [520, 840], [470, 740], [300, 960]].forEach(([x, y], i) => { const s = el('ellipse', { cx: x, cy: y, rx: 22, ry: 13, fill: '#9C968B' }, g); appear(s, a + 0.4 + i * 0.1, 0.2); });
    const cm = mover(g, pts[0][0], pts[0][1], 0.62);
    const cw = el('g', {}, cm.g); back(cw, 0, 0, 1.0, null, { fill: '#5C4630', stroke: '#E8D9B8' });
    tl.to(cm, { keyframes: pts.slice(1).map(p => ({ x: p[0], y: p[1], duration: S(1.1), ease: 'none' })) }, S(a + 0.5));
    // tropieza y titubea
    tl.to(cw, { rotation: 38, y: 30, duration: S(0.25), ease: 'power2.in' }, S(a + vo(7.4)));
    tl.to(cw, { rotation: 0, y: 0, duration: S(0.5), ease: 'power2.out' }, S(a + vo(8.4)));
    tl.fromTo(cw, { rotation: -8 }, { rotation: 8, duration: S(0.3), yoyo: true, repeat: 5, ease: 'sine.inOut', immediateRender: false }, S(a + vo(8.8)));
    comic(g, 760, 640, '¡PUM!', a + vo(7.6), { color: RED, size: 110, rot: -8, life: 1.3, sound: 'thud' });
    const dk = el('rect', { x: -50, y: -50, width: 2020, height: 1180, fill: '#000000', opacity: 0 }, g);
    tl.to(dk, { opacity: 0.55, duration: S(9.0) }, S(a + 0.5));
    const u1 = T(g, 520, 120, 'Al regresar a la cueva,', { size: 92, color: CHALK }); write(u1, a + vo(0.0), 1.8);
    const u2 = T(g, 520, 225, 'sus ojos ya no ven', { size: 92, color: CHALK_B }); write(u2, a + vo(1.9), 1.3);
    const u3 = T(g, 520, 335, 'en la oscuridad', { size: 110, color: CHALK_O }); write(u3, a + vo(3.2), 1.6);
    fade(u1, a + vo(5.1)); fade(u2, a + vo(5.1)); fade(u3, a + vo(5.1));
    write(T(g, 1250, 700, 'Después de tanta luz,', { size: 88, color: CHALK }), a + vo(5.3), 1.8);
    write(T(g, 1350, 820, 'tropieza, titubea,', { size: 96, color: CHALK_B }), a + vo(7.4), 2.0);
    write(T(g, 1380, 950, 'parece torpe', { size: 120, color: RED }), a + vo(9.7), 1.5);
    t = 15.49;
  }
  const s2 = newScene(BG.solid(DARK));
  t = TR.eraser(s1, s2, t);

  /* 2 · Los demás se dan cuenta; empiezan las burlas (cueva + gis) */
  setTool('chalk');
  { const g = s2.g, a = t, vo = mkVo(a);
    wallShadows(g, 760, 290, 800, 330, a + vo(11.7), 6.5, { seed: 5 });
    const glow = el('ellipse', { cx: CX, cy: 1120, rx: 700, ry: 280, fill: '#F2A33A', opacity: 0.4, filter: 'url(#soft)' }, g);
    [980, 1160, 1340, 1520].forEach((x, i) => back(g, x, 1030, 0.75, a + 0.2 + i * 0.1, { fill: '#3A2D22', stroke: '#E8D9B8' }));
    const rt = mover(g, 400, 1030, 0.85);
    back(rt.g, 0, 0, 1.0, null, { fill: '#6A4A2E', stroke: '#F2A33A' });
    tl.fromTo(rt, { r: -6 }, { r: 6, duration: S(0.5), yoyo: true, repeat: 8, ease: 'sine.inOut', immediateRender: false }, S(a + 0.2));
    const c1 = T(g, CX, 100, 'Y los demás prisioneros', { size: 96, color: CHALK }); write(c1, a + vo(11.7), 2.0);
    const c2 = T(g, CX, 205, 'se dan cuenta', { size: 110, color: CHALK_O }); write(c2, a + vo(13.6), 1.2);
    [980, 1160, 1340, 1520].forEach((x, i) => comic(g, x, 760, '!', a + vo(14.3) + i * 0.1, { color: '#FFE08A', size: 120, rot: 0, life: 1.0, sound: 'pop' }));
    fade(c1, a + vo(15.0)); fade(c2, a + vo(15.0));
    write(T(g, CX, 100, 'Entonces empiezan', { size: 100, color: CHALK }), a + vo(15.2), 1.4);
    write(T(g, CX, 215, 'las burlas', { size: 150, color: RED }), a + vo(16.8), 1.0);
    ['JA JA', 'JE JE', 'JA JA', 'JI JI'].forEach((s, i) => comic(g, [980, 1160, 1340, 1520][i], 760 - (i % 2) * 40, s, a + vo(17.0) + i * 0.15, { color: '#FFE08A', size: 70, rot: -8 + i * 5, life: 1.2, sound: 'pop' }));
    t = 23.63;
  }
  const s3 = newScene('sepia');
  t = TR.slideUp(s2, s3, t);

  /* 3 · "Volvió con los ojos dañados"; "salir no vale la pena" (pergamino + pluma) */
  setTool('quill');
  { const g = s3.g, a = t, vo = mkVo(a);
    // rostro con los ojos vendados
    const fc = mover(g, 1480, 640, 0.75);
    fc.g.innerHTML = '<path d="M-270,20 Q-270,-240 0,-250 Q270,-240 270,20 Q270,240 0,260 Q-270,240 -270,20 Z" fill="#E8B994" stroke="#3B2A1A" stroke-width="9"/><path d="M-280,-60 Q-290,-290 0,-300 Q290,-290 280,-60 Q180,-190 0,-180 Q-180,-190 -280,-60 Z" fill="#2A1F1C" stroke="#3B2A1A" stroke-width="6"/><rect x="-285" y="-100" width="570" height="130" rx="30" fill="#F4F0E6" stroke="#3B2A1A" stroke-width="8"/><path d="M-150,-55 l50,50 m0,-50 l-50,50 M100,-55 l50,50 m0,-50 l-50,50" stroke="#B3261E" stroke-width="12" stroke-linecap="round"/><path d="M-100,150 Q0,190 100,150" fill="none" stroke="#2A1F1C" stroke-width="10" stroke-linecap="round"/>';
    appear(fc.g, a + vo(18.2), 0.5);
    [980, 1140].forEach(() => 0);
    back(g, 250, 1030, 0.9, a + 0.2, { fill: '#6B5E50', stroke: SEPIA });
    back(g, 480, 1030, 0.9, a + 0.3, { fill: '#6B5E50', stroke: SEPIA });
    const b1 = bubble(g, 90, 110, 1010, 420, 300, 740);
    popIn(b1, a + vo(18.0), { origin: '30% 100%' });
    type(T(b1, 140, 230, 'Subió y volvió', { size: 66, anchor: 'start', cls: 'code' }), a + vo(18.2), 1.2, ORANGE);
    type(T(b1, 140, 340, 'con los ojos dañados', { size: 66, anchor: 'start', cls: 'code', color: RED }), a + vo(19.4), 2.0);
    fade(b1, a + vo(22.0));
    const b2 = bubble(g, 90, 110, 1010, 420, 480, 740);
    popIn(b2, a + vo(22.1), { origin: '30% 100%' });
    type(T(b2, 140, 230, 'Salir de la cueva', { size: 66, anchor: 'start', cls: 'code' }), a + vo(22.3), 1.6, ORANGE);
    type(T(b2, 140, 340, 'no vale la pena', { size: 66, anchor: 'start', cls: 'code', color: RED }), a + vo(24.0), 1.5);
    t = 33.8;
  }
  const s4 = newScene('graph');
  t = TR.flip(s3, s4, t);

  /* 4 · Intenta explicarles, pero sus palabras no tienen sentido (cuaderno cuadriculado + lápiz) */
  setTool('pencil');
  { const g = s4.g, a = t, vo = mkVo(a);
    const l1 = T(g, CX, 100, 'Mientras tanto, él intenta', { size: 92, color: GRAPHITE }); write(l1, a + vo(26.3), 1.7);
    const l2 = T(g, CX, 205, 'explicarles lo que vio:', { size: 100, color: BLUE }); write(l2, a + vo(28.0), 1.8);
    back(g, 330, 1040, 1.1, a + vo(26.5), { fill: '#6A4A2E', stroke: GRAPHITE });
    [1200, 1400, 1600].forEach((x, i) => back(g, x, 1040, 0.85, a + vo(26.6) + i * 0.1, { fill: '#6B5E50', stroke: GRAPHITE }));
    const b1 = bubble(g, 60, 330, 900, 560, 340, 760);
    popIn(b1, a + vo(29.8), { origin: '30% 100%' });
    type(T(b1, 100, 460, 'las sombras no son reales', { size: 46, anchor: 'start', cls: 'code' }), a + vo(30.0), 2.0, ORANGE);
    fade(b1, a + vo(32.6));
    const b2 = bubble(g, 60, 330, 900, 560, 340, 760);
    popIn(b2, a + vo(32.8), { origin: '30% 100%' });
    type(T(b2, 100, 460, 'existe un mundo exterior', { size: 46, anchor: 'start', cls: 'code', color: GREEN }), a + vo(33.0), 2.0);
    fade(l1, a + vo(35.8)); fade(l2, a + vo(35.8));
    write(T(g, 1400, 130, 'Pero sus palabras', { size: 96, color: GRAPHITE }), a + vo(36.1), 1.4);
    write(T(g, 1400, 245, 'no tienen sentido', { size: 110, color: RED }), a + vo(37.4), 1.5);
    write(T(g, 1400, 360, 'para quienes nunca han salido', { size: 66, color: GRAPHITE, cls: 'kalam' }), a + vo(38.9), 1.8);
    [1200, 1400, 1600].forEach((x, i) => comic(g, x, 700, '?', a + vo(37.0) + i * 0.2, { color: RED, size: 150, rot: -8 + i * 8, life: 1.8, sound: 'pop' }));
    t = 52.19;
  }
  const s5 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.iris(s4, s5, t, { x: 1400, y: 700 });

  /* 5 · Compite en el juego de adivinar sombras y pierde (pizarrón + gis) */
  setTool('chalk');
  { const g = s5.g, a = t, vo = mkVo(a);
    wallShadows(g, 100, 330, 760, 340, a + vo(41.0), 10.5, { seed: 6 });
    back(g, 250, 1040, 0.8, a + 0.2, { fill: '#6A4A2E', stroke: '#F2A33A' });
    [470, 650].forEach((x, i) => back(g, x, 1040, 0.8, a + 0.3 + i * 0.1, { fill: '#3A2D22', stroke: '#E8D9B8' }));
    // marcador
    draw(P(g, 'M1000,330 L1800,330 L1800,700 L1000,700 Z', { color: CHALK, w: 8 }), a + vo(44.4), 0.7, { sound: false });
    draw(P(g, 'M1400,330 L1400,700 M1000,430 L1800,430', { color: CHALK, w: 6 }), a + vo(44.9), 0.5, { sound: false });
    write(T(g, 1200, 400, 'ELLOS', { size: 64, color: CHALK_B }), a + vo(45.0), 0.5);
    write(T(g, 1600, 400, 'ÉL', { size: 64, color: CHALK_O }), a + vo(45.2), 0.4);
    [0, 1, 2, 3].forEach(i => draw(P(g, `M${1110 + i * 50},480 L${1110 + i * 50},640`, { color: CHALK, w: 8 }), a + vo(45.5) + i * 0.25, 0.2, { sound: false }));
    draw(P(g, 'M1090,490 L1290,630', { color: CHALK, w: 8 }), a + vo(46.6), 0.3, { sound: false });
    draw(P(g, wobble(1600, 560, 60, 70, 1.1, 2), { color: RED, w: 9 }), a + vo(47.2), 0.5, { sound: false });
    const l1 = T(g, CX, 100, 'Y si además se atreve a competir', { size: 80, color: CHALK }); write(l1, a + vo(41.0), 3.0);
    const l2 = T(g, CX, 205, 'en el juego de adivinar sombras,', { size: 80, color: CHALK_B }); write(l2, a + vo(44.2), 2.5);
    fade(l1, a + vo(47.0)); fade(l2, a + vo(47.0));
    write(T(g, CX, 130, 'perderá,', { size: 170, color: RED }), a + vo(47.1), 1.1);
    write(T(g, CX, 250, 'porque su vista aún no se adapta', { size: 86, color: CHALK_O }), a + vo(48.3), 3.0);
    t = 65.83;
  }
  const s6 = newScene('paper');
  t = TR.slideUp(s5, s6, t);

  /* 6 · Parece que ha perdido algo; en realidad ha ganado todo (papel + plumón) */
  setTool('marker');
  { const g = s6.g, a = t, vo = mkVo(a);
    // balanza: se inclina hacia el lado de "todo"
    draw(P(g, 'M960,980 L960,640 M860,980 L1060,980', { color: INK, w: 12 }), a + vo(51.9), 0.7, { sound: false });
    const bm = mover(g, 960, 640, 1);
    bm.g.innerHTML = '<path d="M-440,0 L440,0" stroke="#2A1F1C" stroke-width="14" stroke-linecap="round"/><path d="M-440,0 L-540,240 M-440,0 L-340,240 M440,0 L340,240 M440,0 L540,240" stroke="#2A1F1C" stroke-width="6"/><path d="M-570,240 L-310,240 Q-440,320 -570,240 Z" fill="#B5AFA6" stroke="#2A1F1C" stroke-width="7"/><path d="M310,240 L570,240 Q440,320 310,240 Z" fill="#B5AFA6" stroke="#2A1F1C" stroke-width="7"/><circle cx="-440" cy="205" r="26" fill="#F2A33A" stroke="#2A1F1C" stroke-width="6"/><circle cx="440" cy="150" r="70" fill="#F5C84C" stroke="#2A1F1C" stroke-width="7"/><path d="M360,190 Q440,100 520,190" fill="none" stroke="#3C8A55" stroke-width="12"/>';
    gsap.set(bm, { r: 6 });
    tl.to(bm, { r: -9, duration: S(1.4), ease: 'bounce.out' }, S(a + vo(55.4)));
    const t1 = T(g, 760, 110, 'Parece que ha perdido algo,', { size: 92 }); write(t1, a + vo(51.94), 2.4);
    write(T(g, 760, 215, 'cuando en realidad', { size: 100, color: GRAPHITE }), a + vo(54.2), 1.3);
    write(T(g, 760, 330, 'ha ganado todo', { size: 150, color: ORANGE }), a + vo(55.5), 1.7);
    bust(g, 1760, 1050, 200, a + vo(55.0), 1.5);
    t = 73.6;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
