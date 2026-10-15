/* EL MITO DE LA CAVERNA — 5:00–6:00 LA LIBERACIÓN (pizarra, 16:9) · sincronizado a vo6.mp3 (+1.2 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          image, bubble, popIn, newScene, show, BG, TR, setTool, tl, S } = V;
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
  const shackle = (g, cx, cy, at) => { // muñeca + argolla
    const w = el('g', {}, g);
    w.innerHTML = `<rect x="${cx - 60}" y="${cy - 55}" width="120" height="110" rx="40" fill="#E8B994" stroke="#2A1F1C" stroke-width="7"/><rect x="${cx - 70}" y="${cy - 14}" width="140" height="30" rx="12" fill="#6B665E" stroke="#2A1F1C" stroke-width="6"/>`;
    appear(w, at, 0.3);
    return w;
  };
  let t = 0;

  /* 1 · Una cadena se rompe; manos liberadas; luz del fuego (cueva oscura + gis) */
  const s1 = newScene(BG.solid(DARK)); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    const glow = el('ellipse', { cx: 1700, cy: 900, rx: 700, ry: 420, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.5, duration: S(1.2) }, S(a + 0.2));
    shackle(g, 560, 640, a + 0.2); shackle(g, 1360, 640, a + 0.2);
    // cadena entre las argollas: dos mitades
    const L = el('g', {}, g), R = el('g', {}, g);
    [0, 1, 2].forEach(i => { el('ellipse', { cx: 690 + i * 62, cy: 640, rx: 34, ry: 20, fill: 'none', stroke: '#9A958B', 'stroke-width': 10 }, L); el('ellipse', { cx: 1240 - i * 62, cy: 640, rx: 34, ry: 20, fill: 'none', stroke: '#9A958B', 'stroke-width': 10 }, R); });
    appear(L, a + 0.3, 0.3); appear(R, a + 0.3, 0.3);
    el('ellipse', { cx: 960, cy: 640, rx: 34, ry: 20, fill: 'none', stroke: '#9A958B', 'stroke-width': 10, id: 'midlink' }, g);
    const mid = g.lastChild; appear(mid, a + 0.3, 0.3);
    const ti = a + vo(3.3);
    // se rompe: eslabón central cae, mitades se separan
    tl.to(mid, { y: 260, rotation: 70, opacity: 0, duration: S(0.6), ease: 'power2.in' }, S(ti));
    tl.to(L, { x: -150, y: 60, rotation: -12, duration: S(0.6), ease: 'power2.out' }, S(ti));
    tl.to(R, { x: 150, y: 60, rotation: 12, duration: S(0.6), ease: 'power2.out' }, S(ti));
    comic(g, 960, 520, '¡CLAC!', ti, { color: '#F2A33A', size: 120, rot: -6, life: 1.4, sound: 'stamp' });
    [[860, 560], [1060, 560], [960, 470]].forEach(([x, y], i) => star(g, x, y, 34, '#FFE08A', ti + 0.1 + i * 0.1));
    write(T(g, CX, 150, 'Ahora imagina que uno', { size: 100, color: CHALK }), a + vo(0.0), 1.7);
    write(T(g, CX, 270, 'de los prisioneros es liberado', { size: 100, color: CHALK_O }), a + vo(1.7), 2.4);
    write(T(g, CX, 930, 'sus manos, libres', { size: 90, color: CHALK_B }), a + vo(3.4), 1.0);
    t = 6.75;
  }
  const s2 = newScene('graph');
  t = TR.eraser(s1, s2, t);

  /* 2 · Levantarse, girar el cuello, caminar, mirar a la luz (cuaderno cuadriculado + lápiz) */
  setTool('pencil');
  { const g = s2.g, a = t, vo = mkVo(a);
    const l1 = T(g, CX, 120, 'Le quitan las cadenas', { size: 110, color: GRAPHITE }); write(l1, a + vo(4.7), 1.8);
    const l2 = T(g, CX, 240, 'y lo obligan a...', { size: 100, color: RED }); write(l2, a + vo(6.4), 1.2);
    const col = x => ({ a: x });
    // 1 levantarse
    const c1 = el('g', {}, g); back(c1, 330, 820, 0.8, null, { fill: '#6B5E50', stroke: GRAPHITE });
    draw(P(g, 'M330,420 L330,300 M290,340 L330,300 L370,340', { color: BLUE, w: 10 }), a + vo(7.4), 0.5, { sound: false }); appear(c1, a + vo(7.2), 0.3);
    write(T(g, 330, 930, 'levantarse', { size: 74, color: BLUE }), a + vo(7.5), 0.9);
    // 2 girar el cuello
    const c2 = el('g', {}, g); back(c2, 790, 820, 0.8, null, { fill: '#6B5E50', stroke: GRAPHITE }); appear(c2, a + vo(8.6), 0.3);
    draw(P(g, 'M690,440 Q790,330 890,440 M860,410 L890,440 L845,450', { color: ORANGE, w: 10 }), a + vo(8.9), 0.5, { sound: false });
    write(T(g, 790, 930, 'girar el cuello', { size: 74, color: ORANGE }), a + vo(8.9), 1.0);
    // 3 caminar
    [1110, 1230, 1330].forEach((x, i) => draw(P(g, `M${x - 26},${800 - i * 70} q-8,-40 28,-36 q30,0 20,38 Z`, { color: GRAPHITE, w: 7, fill: H('gray') }), a + vo(10.1) + i * 0.3, 0.3, { sound: false }));
    write(T(g, 1220, 930, 'caminar', { size: 74, color: GRAPHITE }), a + vo(10.2), 0.8);
    // 4 mirar hacia la luz
    const sunp = el('g', {}, g);
    sunp.innerHTML = '<circle cx="1700" cy="480" r="70" fill="#F5C84C" stroke="#2A1F1C" stroke-width="6"/>' + [0,1,2,3,4,5,6,7,8,9].map(k => { const an = k / 10 * Math.PI * 2; return `<line x1="${1700 + Math.cos(an) * 92}" y1="${480 + Math.sin(an) * 92}" x2="${1700 + Math.cos(an) * 125}" y2="${480 + Math.sin(an) * 125}" stroke="#E8A530" stroke-width="8" stroke-linecap="round"/>`; }).join('');
    appear(sunp, a + vo(11.4), 0.5);
    draw(P(g, 'M1560,760 Q1620,640 1650,560', { color: ORANGE, w: 9 }), a + vo(11.6), 0.5, { sound: false });
    write(T(g, 1650, 930, 'mirar a la luz', { size: 74, color: ORANGE }), a + vo(11.9), 1.1);
    t = 17.875;
  }
  const s3 = newScene(BG.solid('#1B1510'));
  t = TR.iris(s2, s3, t, { x: 1700, y: 480 });

  /* 3 · El rostro deslumbrado (cueva oscura + gis) */
  setTool('chalk');
  { const g = s3.g, a = t, vo = mkVo(a);
    const glow = el('ellipse', { cx: 1300, cy: 640, rx: 640, ry: 520, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.45, duration: S(1.4) }, S(a + vo(21.0)));
    // rostro
    const face = el('g', {}, g);
    face.innerHTML = '<path d="M330,640 Q330,380 600,370 Q870,380 870,640 Q870,860 600,880 Q330,860 330,640 Z" fill="#E8B994" stroke="#E8D9B8" stroke-width="8"/><path d="M320,560 Q310,330 600,320 Q890,330 880,560 Q780,430 600,440 Q420,430 320,560 Z" fill="#2A1F1C" stroke="#E8D9B8" stroke-width="6"/><path d="M560,640 Q600,690 640,640" fill="none" stroke="#2A1F1C" stroke-width="7"/><path d="M500,780 Q600,820 700,780" fill="none" stroke="#2A1F1C" stroke-width="9" stroke-linecap="round"/>';
    appear(face, a + vo(13.6), 0.5);
    const eyes = el('g', {}, g);
    eyes.innerHTML = '<ellipse cx="500" cy="590" rx="46" ry="30" fill="#fff" stroke="#2A1F1C" stroke-width="6"/><circle cx="500" cy="592" r="14" fill="#2A1F1C"/><ellipse cx="700" cy="590" rx="46" ry="30" fill="#fff" stroke="#2A1F1C" stroke-width="6"/><circle cx="700" cy="592" r="14" fill="#2A1F1C"/>';
    appear(eyes, a + vo(15.8), 0.4);
    // entrecierra los ojos al deslumbrarse
    const lids = el('g', {}, g);
    lids.innerHTML = '<path d="M450,590 Q500,560 550,590" fill="none" stroke="#2A1F1C" stroke-width="10" stroke-linecap="round"/><path d="M650,590 Q700,560 750,590" fill="none" stroke="#2A1F1C" stroke-width="10" stroke-linecap="round"/>';
    appear(lids, a + vo(21.5), 0.3);
    // luz del fuego sobre la mitad derecha del rostro
    const lit = el('path', { d: 'M600,372 Q870,380 870,640 Q870,860 600,880 Z', fill: '#F2A33A', opacity: 0 }, g);
    tl.to(lit, { opacity: 0.35, duration: S(1.0) }, S(a + vo(21.2)));
    [[430, 520], [760, 520], [600, 470], [880, 600]].forEach(([x, y], i) => star(g, x, y, 40, '#FFE08A', a + vo(19.3) + i * 0.25));
    const t1 = T(g, 1300, 150, 'Cada movimiento', { size: 100, color: CHALK }); write(t1, a + vo(13.6), 1.4);
    const t2 = T(g, 1300, 260, 'le duele', { size: 130, color: RED }); write(t2, a + vo(14.5), 0.8);
    comic(g, 1600, 400, '¡ay!', a + vo(14.8), { color: RED, size: 100, rot: 8, life: 1.2, sound: 'pop' });
    fade(t1, a + vo(15.6)); fade(t2, a + vo(15.6));
    const t3 = T(g, 1300, 150, 'Sus ojos, acostumbrados', { size: 84, color: CHALK_B }); write(t3, a + vo(15.8), 1.6);
    const t4 = T(g, 1300, 250, 'a la penumbra,', { size: 90, color: CHALK_B }); write(t4, a + vo(17.4), 1.3);
    const t5 = T(g, 1300, 360, 'se llenan de destellos', { size: 90, color: '#FFE08A' }); write(t5, a + vo(19.2), 1.5);
    fade(t3, a + vo(20.9)); fade(t4, a + vo(20.9)); fade(t5, a + vo(20.9));
    write(T(g, 1300, 150, 'El fuego lo deslumbra', { size: 94, color: CHALK_O }), a + vo(21.2), 1.5);
    const flash = el('rect', { x: -50, y: -50, width: 2020, height: 1180, fill: '#FFFFFF', opacity: 0 }, g);
    tl.to(flash, { opacity: 0.6, duration: S(0.12), yoyo: true, repeat: 1 }, S(a + vo(21.5)));
    write(T(g, 1300, 260, 'Apenas puede distinguir', { size: 80, color: CHALK }), a + vo(23.0), 1.7);
    write(T(g, 1300, 360, 'los objetos de sus sombras', { size: 80, color: CHALK }), a + vo(24.7), 2.2);
    // objetos borrosos
    [['dog', 1180, 760, 1.6], ['bird', 1470, 640, 1.4], ['man', 1660, 800, 1.3]].forEach(([k, x, y, sc], i) => {
      const o = el('g', { transform: `translate(${x} ${y}) scale(${sc})`, filter: 'url(#soft)' }, g);
      o.innerHTML = `<path d="${SIL[k]}" fill="#C9A24A" stroke="#C9A24A" stroke-width="6"/>`;
      appear(o, a + vo(24.9) + i * 0.3, 0.5);
    });
    t = 37.1;
  }
  const s4 = newScene('blue');
  t = TR.flash(s3, s4, t);

  /* 4 · "Lo que veías era una ilusión": ¿le creería? Probablemente no (azul + globos) */
  setTool(null);
  { const g = s4.g, a = t, vo = mkVo(a);
    pop(T(g, 1280, 130, 'Y si alguien le dijera:', { size: 92, color: '#FFFFFF' }), a + vo(28.96), { rot: 0 });
    back(g, 330, 1030, 1.1, a + vo(29.2), { fill: '#16306B', stroke: '#FFFFFF' });
    back(g, 1560, 1030, 1.1, a + vo(29.4), { fill: '#16306B', stroke: '#FFD27A' });
    const b1 = bubble(g, 120, 170, 1030, 420, 330, 640);
    popIn(b1, a + vo(30.7), { origin: '30% 100%' });
    type(T(b1, 170, 275, 'lo que veías era', { size: 64, anchor: 'start', cls: 'code' }), a + vo(30.9), 1.3, ORANGE);
    type(T(b1, 170, 365, 'solo una ilusión', { size: 64, anchor: 'start', cls: 'code', color: RED }), a + vo(32.1), 1.5);
    fade(b1, a + vo(33.9));
    const b2 = bubble(g, 120, 170, 1030, 420, 330, 640);
    popIn(b2, a + vo(34.0), { origin: '30% 100%' });
    type(T(b2, 170, 275, 'ahora estás más cerca', { size: 58, anchor: 'start', cls: 'code' }), a + vo(34.2), 1.6, ORANGE);
    type(T(b2, 170, 365, 'de lo real', { size: 64, anchor: 'start', cls: 'code', color: GREEN }), a + vo(35.7), 1.2);
    pop(T(g, 1500, 400, '¿le creería?', { size: 130, color: '#FFD27A' }), a + vo(37.1), { rot: -4, sound: 'stamp' });
    pop(T(g, 1500, 590, 'Probablemente no', { size: 90, color: '#FFFFFF', stroke: INK }), a + vo(38.5), { rot: 3, sound: 'stamp' });
    t = 50.89;
  }
  const s5 = newScene('kraft');
  t = TR.flip(s4, s5, t);

  /* 5 · Confundido: las sombras parecen más verdaderas; volver a sentarse (kraft + pincel) */
  setTool('brush');
  { const g = s5.g, a = t, vo = mkVo(a), BR = '#2A1B10';
    const t1 = T(g, CX, 130, 'Se sentiría confundido', { size: 110, color: BR }); write(t1, a + vo(40.0), 1.6);
    const m = mover(g, 960, 1010, 1.0);
    back(m.g, 0, 0, 1.0, a + vo(40.2), { fill: '#5C4630', stroke: BR });
    [[820, 640], [960, 600], [1100, 640]].forEach(([x, y], i) => comic(g, x, y, '?', a + vo(40.9) + i * 0.25, { color: '#7A1F18', size: 110, rot: -6 + i * 6, life: 1.2, sound: 'pop' }));
    fade(t1, a + vo(41.9));
    const t2 = T(g, CX, 130, 'Pensaría que las sombras', { size: 92, color: BR }); write(t2, a + vo(42.0), 1.9);
    const t3 = T(g, CX, 240, 'eran más verdaderas', { size: 96, color: '#7A1F18' }); write(t3, a + vo(43.5), 1.5);
    const dk = el('g', { transform: 'translate(430 860) scale(2.3)' }, g); dk.innerHTML = `<path d="${SIL.dog}" fill="#1E1812" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    appear(dk, a + vo(43.5), 0.4);
    draw(P(g, 'M360,380 L410,440 L520,330', { color: '#1F7A4D', w: 16 }), a + vo(44.6), 0.4, { sound: false });
    write(T(g, 430, 960, 'sombras', { size: 70, color: BR }), a + vo(43.7), 0.8);
    fade(t2, a + vo(45.1)); fade(t3, a + vo(45.1));
    const t4 = T(g, CX, 130, 'que estos objetos', { size: 92, color: BR }); write(t4, a + vo(45.2), 1.5);
    const t5 = T(g, CX, 240, 'borrosos', { size: 110, color: '#7A1F18' }); write(t5, a + vo(46.2), 0.9);
    const bl = el('g', { transform: 'translate(1490 860) scale(2.3)', filter: 'url(#soft)' }, g); bl.innerHTML = `<path d="${SIL.dog}" fill="#C9A24A" stroke="#C9A24A" stroke-width="5"/>`;
    appear(bl, a + vo(45.9), 0.5);
    write(T(g, 1490, 960, 'objetos', { size: 70, color: BR }), a + vo(45.9), 0.8);
    fade(t4, a + vo(47.2)); fade(t5, a + vo(47.2));
    write(T(g, CX, 130, 'Querría volver a sentarse', { size: 98, color: BR }), a + vo(47.4), 1.8);
    write(T(g, CX, 240, 'y mirar lo conocido', { size: 98, color: '#7A1F18' }), a + vo(49.2), 1.7);
    tl.to(m, { x: 520, y: 1030, s: 0.9, duration: S(1.4), ease: 'power2.inOut' }, S(a + vo(47.6)));
    draw(P(g, 'M900,760 C800,700 700,700 600,740 M650,700 L600,740 L655,770', { color: '#7A1F18', w: 10 }), a + vo(48.2), 0.6, { sound: false });
    t = 64.95;
  }
  const s6 = newScene('paper');
  t = TR.slideUp(s5, s6, t);

  /* 6 · El primer gran obstáculo (papel + plumón) */
  setTool('marker');
  { const g = s6.g, a = t, vo = mkVo(a);
    draw(P(g, 'M60,900 L1860,900', { color: INK, w: 7 }), a + 0.1, 0.5, { sound: false });
    back(g, 230, 900, 0.9, a + vo(51.2), { fill: '#6B5E50', stroke: INK });
    const sunp = el('g', {}, g);
    sunp.innerHTML = '<circle cx="1700" cy="700" r="70" fill="#F5C84C" stroke="#2A1F1C" stroke-width="6"/>' + [0,1,2,3,4,5,6,7,8,9].map(k => { const an = k / 10 * Math.PI * 2; return `<line x1="${1700 + Math.cos(an) * 92}" y1="${700 + Math.sin(an) * 92}" x2="${1700 + Math.cos(an) * 125}" y2="${700 + Math.sin(an) * 125}" stroke="#E8A530" stroke-width="8" stroke-linecap="round"/>`; }).join('');
    appear(sunp, a + vo(51.5), 0.5);
    // gran roca que bloquea el camino
    const rock = el('g', {}, g);
    rock.innerHTML = '<path d="M980,900 Q940,700 1040,640 Q1160,590 1250,660 Q1340,760 1300,900 Z" fill="#9C968B" stroke="#2A1F1C" stroke-width="9"/><path d="M1060,720 L1110,760 M1190,700 L1160,780 M1230,800 L1190,850" stroke="#2A1F1C" stroke-width="6" fill="none"/>';
    gsap.set(rock, { y: -700, opacity: 0 });
    tl.to(rock, { y: 0, opacity: 1, duration: S(0.4), ease: 'bounce.out' }, S(a + vo(54.0)));
    sfx('thud', a + vo(54.2), { gain: 1.0 });
    write(T(g, CX, 170, 'Y aquí está', { size: 120 }), a + vo(51.2), 1.4);
    write(T(g, CX, 330, 'el primer gran obstáculo', { size: 130, color: RED }), a + vo(52.6), 2.4);
    stamp(g, 1130, 520, 'OBSTÁCULO', a + vo(54.9), { color: '#B3261E', rot: -8, size: 96 });
    bust(g, 520, 900, 220, a + vo(55.5), 1.0);
    t = 74.5;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
