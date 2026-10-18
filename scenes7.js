/* EL MITO DE LA CAVERNA — 6:00–7:00 LA RESISTENCIA (pizarra, 16:9) · sincronizado a vo7.mp3 (voz x1.02, +0.3 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          image, bubble, popIn, person, popPerson, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960, GOLD = '#BFA27A', DARK = '#2A2119', F = 1.02, D = 0.3;
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

  /* 1 · Retrocede, se cubre los ojos: la verdad duele (cueva oscura + gis) */
  const s1 = newScene(BG.solid(DARK)); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    const glow = el('ellipse', { cx: 1750, cy: 760, rx: 700, ry: 520, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.55, duration: S(1.0) }, S(a + 0.2));
    flame(g, 1700, 840, 1.3, a + 0.2);
    const m = mover(g, 1000, 680, 0.85);
    m.g.innerHTML = '<path d="M-270,20 Q-270,-240 0,-250 Q270,-240 270,20 Q270,240 0,260 Q-270,240 -270,20 Z" fill="#E8B994" stroke="#E8D9B8" stroke-width="8"/><path d="M-280,-60 Q-290,-290 0,-300 Q290,-290 280,-60 Q180,-190 0,-180 Q-180,-190 -280,-60 Z" fill="#2A1F1C" stroke="#E8D9B8" stroke-width="6"/><path d="M-40,40 Q0,90 40,40" fill="none" stroke="#2A1F1C" stroke-width="7"/><path d="M-100,160 Q0,120 100,160" fill="none" stroke="#2A1F1C" stroke-width="9" stroke-linecap="round"/><path d="M0,-250 Q270,-240 270,20 Q270,240 0,260 Z" fill="#F2A33A" opacity="0.3"/>';
    const eyes = el('g', {}, m.g); eyes.innerHTML = '<ellipse cx="-100" cy="-30" rx="46" ry="30" fill="#fff" stroke="#2A1F1C" stroke-width="6"/><circle cx="-100" cy="-28" r="14" fill="#2A1F1C"/><ellipse cx="100" cy="-30" rx="46" ry="30" fill="#fff" stroke="#2A1F1C" stroke-width="6"/><circle cx="100" cy="-28" r="14" fill="#2A1F1C"/>';
    const hand = el('g', {}, m.g); hand.innerHTML = '<rect x="-190" y="-90" width="380" height="120" rx="50" fill="#E8B994" stroke="#2A1F1C" stroke-width="8"/><path d="M-110,-70 L-110,10 M-30,-72 L-30,12 M50,-72 L50,12 M130,-70 L130,10" stroke="#2A1F1C" stroke-width="5" fill="none"/>';
    gsap.set(hand, { opacity: 0, y: 60 });
    tl.to(hand, { opacity: 1, y: 0, duration: S(0.4) }, S(a + vo(1.7)));
    // retrocede, alejándose del fuego
    tl.to(m, { x: 640, duration: S(1.1), ease: 'power2.out' }, S(a + vo(1.5)));
    const l1 = T(g, CX, 110, 'Y es que la verdad no siempre', { size: 88, color: CHALK }); write(l1, a + vo(0.0), 2.0);
    const l2 = T(g, CX, 215, 'se siente como una liberación', { size: 88, color: CHALK_O }); write(l2, a + vo(1.9), 2.1);
    fade(l1, a + vo(4.2)); fade(l2, a + vo(4.2));
    write(T(g, CX, 110, 'A veces se siente', { size: 96, color: CHALK }), a + vo(4.4), 1.5);
    write(T(g, CX, 230, 'como DOLOR', { size: 170, color: RED }), a + vo(5.8), 1.0);
    [[0, -330, 0, -430], [330, -240, 430, -330], [-330, -240, -430, -330], [-380, 40, -500, 60], [380, 40, 500, 60]].forEach(([x1, y1, x2, y2], i) => {
      const gx = el('g', { transform: 'translate(640 680)' }, g);
      draw(P(gx, `M${x1},${y1} L${(x1 + x2) / 2 + 20},${(y1 + y2) / 2 - 20} L${x2},${y2}`, { color: RED, w: 9 }), a + vo(6.0) + i * 0.08, 0.2, { sound: false });
    });
    t = 8.7;
  }
  const s2 = newScene('sepia');
  t = TR.eraser(s1, s2, t);

  /* 2 · Huir de la luz, regresar a lo cómodo (pergamino + pluma) */
  setTool('quill');
  { const g = s2.g, a = t, vo = mkVo(a);
    back(g, 930, 930, 1.0, a + vo(7.5), { fill: '#6B5E50', stroke: SEPIA });
    const t1 = T(g, CX, 100, 'El prisionero liberado', { size: 92, color: SEPIA }); write(t1, a + vo(7.3), 1.6);
    const t2 = T(g, CX, 210, 'querría huir de la luz,', { size: 100, color: RED }); write(t2, a + vo(9.0), 1.9);
    sunIcon(g, 250, 560, 80, a + vo(9.7));
    draw(P(g, 'M840,620 L520,620 M560,590 L520,620 L560,650', { color: RED, w: 12 }), a + vo(10.3), 0.5, { sound: false });
    draw(P(g, 'M110,430 L390,700 M390,430 L110,700', { color: RED, w: 11 }), a + vo(10.6), 0.3, { sound: false });
    fade(t1, a + vo(11.0)); fade(t2, a + vo(11.0));
    write(T(g, CX, 100, 'regresar a lo que entiende,', { size: 92, color: SEPIA }), a + vo(11.2), 2.2);
    write(T(g, CX, 210, 'a lo cómodo', { size: 130, color: PURPLE }), a + vo(13.6), 1.2);
    // cueva cómoda con sofá
    draw(P(g, 'M1300,930 L1300,640 Q1500,520 1700,640 L1700,930', { color: SEPIA, w: 10, fill: '#3A2D22' }), a + vo(11.6), 0.8, { sound: false });
    const sofa = el('g', {}, g);
    sofa.innerHTML = '<rect x="1370" y="800" width="260" height="100" rx="30" fill="#B5705C" stroke="#2A1F1C" stroke-width="7"/><rect x="1350" y="760" width="60" height="140" rx="26" fill="#B5705C" stroke="#2A1F1C" stroke-width="7"/><rect x="1590" y="760" width="60" height="140" rx="26" fill="#B5705C" stroke="#2A1F1C" stroke-width="7"/>';
    appear(sofa, a + vo(13.4), 0.5);
    draw(P(g, 'M1020,620 L1280,620 M1240,590 L1280,620 L1240,650', { color: PURPLE, w: 12 }), a + vo(12.4), 0.5, { sound: false });
    t = 18.36;
  }
  const s3 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.slideUp(s2, s3, t);

  /* 3 · Platón lo sabía: cambiar de creencias duele; la certeza falsa produce vértigo (pizarrón + gis) */
  setTool('chalk');
  { const g = s3.g, a = t, vo = mkVo(a);
    write(T(g, CX, 110, 'Platón lo sabía bien:', { size: 110, color: CHALK_B }), a + vo(15.17), 1.8);
    bust(g, 420, 1040, 600, a + vo(15.4), 8);
    const c1 = T(g, 1300, 400, 'cambiar de creencias', { size: 96, color: CHALK }); write(c1, a + vo(17.1), 1.8);
    const c2 = T(g, 1300, 560, 'duele', { size: 200, color: RED }); write(c2, a + vo(18.4), 0.9);
    fade(c1, a + vo(19.5)); fade(c2, a + vo(19.5));
    write(T(g, 1300, 400, 'Abandonar la certeza,', { size: 90, color: CHALK }), a + vo(19.6), 1.6);
    write(T(g, 1300, 510, 'aunque sea falsa,', { size: 84, color: CHALK_B, cls: 'kalam' }), a + vo(21.4), 1.4);
    write(T(g, 1300, 650, 'produce', { size: 100, color: CHALK }), a + vo(23.1), 0.7);
    write(T(g, 1300, 820, 'vértigo', { size: 190, color: CHALK_O }), a + vo(23.8), 0.9);
    // espiral de vértigo
    let d = 'M1300,950'; for (let k = 1; k <= 60; k++) { const an = k * 0.35, r = 4 + k * 1.6; d += ` L${(1300 + Math.cos(an) * r).toFixed(1)},${(950 + Math.sin(an) * r * 0.5).toFixed(1)}`; }
    draw(P(g, d, { color: CHALK_B, w: 6 }), a + vo(23.9), 0.9, { sound: false });
    t = 30.29;
  }
  const s4 = newScene('graph');
  t = TR.iris(s3, s4, t, { x: 1300, y: 820 });

  /* 4 · Defender una idea por familiar, no por verdadera (cuaderno cuadriculado + lápiz) */
  setTool('pencil');
  { const g = s4.g, a = t, vo = mkVo(a);
    const l1 = T(g, CX, 100, 'Cuántas veces hemos', { size: 92, color: GRAPHITE }); write(l1, a + vo(24.9), 1.6);
    const l2 = T(g, CX, 205, 'defendido una idea', { size: 100, color: BLUE }); write(l2, a + vo(26.4), 1.8);
    const pm = mover(g, 960, 1030, 1.5), d = person(pm.g, 0, 0, 1, { shirt: 'teal', glasses: false });
    popPerson(d, a + vo(25.5));
    draw(P(g, 'M780,430 L1140,430 L1140,590 L780,590 Z', { color: GRAPHITE, w: 8, fill: H('yellow') }), a + vo(27.0), 0.6);
    write(T(g, 960, 540, 'mi idea', { size: 100, color: GRAPHITE }), a + vo(27.5), 0.8);
    fade(l1, a + vo(28.4)); fade(l2, a + vo(28.4));
    write(T(g, CX, 100, 'no porque fuera verdadera,', { size: 90, color: GRAPHITE }), a + vo(28.5), 1.8);
    draw(P(g, 'M300,520 L560,780 M560,520 L300,780', { color: RED, w: 20 }), a + vo(29.9), 0.4, { sound: false });
    write(T(g, 430, 900, 'verdadera', { size: 80, color: RED }), a + vo(29.2), 1.0);
    write(T(g, CX, 205, 'sino porque era familiar', { size: 96, color: GREEN }), a + vo(30.6), 2.2);
    draw(P(g, 'M1350,660 L1450,770 L1640,520', { color: GREEN, w: 22 }), a + vo(32.0), 0.5, { sound: false });
    write(T(g, 1500, 900, 'familiar', { size: 80, color: GREEN }), a + vo(31.6), 1.0);
    t = 41.0;
  }
  const s5 = newScene('blue');
  t = TR.flash(s4, s5, t);

  /* 5 · "Esto sí lo comprendo": mira las sombras (azul + globo de pensamiento) */
  setTool(null);
  { const g = s5.g, a = t, vo = mkVo(a);
    pop(T(g, CX, 110, 'El prisionero mira las sombras', { size: 96, color: '#FFFFFF' }), a + vo(33.65), { rot: 0 });
    wallShadows(g, 980, 300, 800, 380, a + vo(34.5), 6.0, { seed: 2 });
    back(g, 430, 1030, 1.15, a + vo(34.0), { fill: '#16306B', stroke: '#FFFFFF' });
    pop(T(g, 700, 220, 'y piensa:', { size: 86, color: '#FFD27A' }), a + vo(36.2), { rot: 0, sound: false });
    const bb = bubble(g, 120, 250, 820, 470, 420, 700);
    popIn(bb, a + vo(37.3), { origin: '40% 100%' });
    type(T(bb, 170, 380, 'esto sí lo comprendo', { size: 52, anchor: 'start', cls: 'code', color: '#2A1F1C' }), a + vo(37.6), 2.0, ORANGE);
    t = 49.1;
  }
  const s6 = newScene('kraft');
  t = TR.flip(s5, s6, t);

  /* 6 · Alguien lo toma por la fuerza y lo arrastra (kraft + pincel) */
  setTool('brush');
  { const g = s6.g, a = t, vo = mkVo(a), BR = '#2A1B10';
    draw(P(g, 'M0,1010 L1920,1010', { color: BR, w: 9 }), a + 0.1, 0.5, { sound: false });
    const l1 = T(g, CX, 130, 'Pero ahora alguien', { size: 110, color: BR }); write(l1, a + vo(40.24), 1.5);
    const l2 = T(g, CX, 255, 'lo toma por la fuerza', { size: 110, color: '#B3261E' }); write(l2, a + vo(41.9), 1.7);
    const m = mover(g, 0, 0, 1);
    back(m.g, 330, 1010, 1.35, null, { fill: '#2A1B10', stroke: '#E8D9B8' });
    const fr = el('g', {}, m.g); back(fr, 850, 1010, 1.0, null, { fill: '#5C4630', stroke: BR });
    draw(P(m.g, 'M420,880 L780,900', { color: '#E8D9B8', w: 14 }), a + vo(42.2), 0.4, { sound: false });
    tl.fromTo(m, { x: -40 }, { x: 700, duration: S(3.3), ease: 'power1.inOut', immediateRender: false }, S(a + vo(43.4)));
    comic(g, 1000, 560, '¡no!', a + vo(44.2), { color: '#B3261E', size: 120, rot: -8, life: 1.3, sound: 'pop' });
    fade(l1, a + vo(43.4)); fade(l2, a + vo(43.4));
    write(T(g, CX, 130, 'y lo arrastra,', { size: 120, color: BR }), a + vo(43.5), 1.2);
    write(T(g, CX, 255, 'sin permitirle escoger', { size: 110, color: '#B3261E' }), a + vo(45.2), 1.9);
    t = 58.04;
  }
  const s7 = newScene(BG.solid(DARK));
  t = TR.iris(s6, s7, t, { x: 960, y: 900 });

  /* 7 · La subida áspera y empinada; afuera, algo más intenso que el fuego (cueva + gis) */
  setTool('chalk');
  { const g = s7.g, a = t, vo = mkVo(a);
    const exit = el('ellipse', { cx: 1600, cy: 250, rx: 420, ry: 320, fill: '#FFF1B0', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(exit, { opacity: 0.95, duration: S(5.0), ease: 'power1.in' }, S(a + vo(52.6)));
    // subida áspera: zigzag empinado con piedras
    const pts = [[160, 1000], [420, 900], [330, 800], [640, 700], [560, 600], [860, 520], [800, 420], [1110, 340], [1060, 250], [1420, 190]];
    let d = `M${pts[0][0]},${pts[0][1]}`; pts.slice(1).forEach(p => d += ` L${p[0]},${p[1]}`);
    draw(P(g, d, { color: GOLD, w: 12 }), a + vo(47.6), 1.8, { sound: false });
    [[300, 960], [520, 840], [470, 740], [720, 640], [700, 540], [960, 440], [920, 340], [1230, 280]].forEach(([x, y], i) => { const s = el('ellipse', { cx: x, cy: y, rx: 20, ry: 12, fill: '#9C968B' }, g); appear(s, a + vo(48.2) + i * 0.15, 0.2); });
    const cm = mover(g, pts[0][0], pts[0][1], 0.5);
    back(cm.g, 0, 0, 1.0, null, { fill: '#5C4630', stroke: '#E8D9B8' });
    tl.to(cm, { keyframes: pts.slice(1).map(p => ({ x: p[0], y: p[1], duration: S(0.5), ease: 'none' })) }, S(a + vo(47.7)));
    const u1 = T(g, 1100, 700, 'Lo saca de la cueva', { size: 84, color: CHALK }); write(u1, a + vo(47.54), 1.6);
    const u2 = T(g, 1250, 820, 'por una subida áspera', { size: 84, color: CHALK_B }); write(u2, a + vo(49.0), 1.9);
    const u3 = T(g, 1350, 940, 'y empinada', { size: 100, color: CHALK_O }); write(u3, a + vo(50.5), 1.4);
    fade(u1, a + vo(52.4)); fade(u2, a + vo(52.4)); fade(u3, a + vo(52.4));
    write(T(g, 1100, 700, 'Y lo que le espera afuera', { size: 84, color: CHALK }), a + vo(52.63), 2.0);
    write(T(g, 1250, 830, 'es todavía más intenso', { size: 90, color: CHALK_B }), a + vo(55.2), 2.2);
    write(T(g, 1350, 980, 'que el fuego', { size: 140, color: '#F2A33A' }), a + vo(58.0), 1.3);
    const flash = el('rect', { x: -50, y: -50, width: 2020, height: 1180, fill: '#FFFFFF', opacity: 0 }, g);
    tl.to(flash, { opacity: 0.55, duration: S(0.5) }, S(a + vo(57.4)));
    t = 73.9;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
