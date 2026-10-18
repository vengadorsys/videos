/* EL MITO DE LA CAVERNA — 7:00–8:00 EL ASCENSO (pizarra, 16:9) · sincronizado a vo8.mp3 (+1.2 s) */
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

  /* 1 · Camino empinado y rocoso; la luz aumenta; tropieza; no lo suelta (cueva + gis) */
  const s1 = newScene(BG.solid(DARK)); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    const exit = el('ellipse', { cx: 1650, cy: 230, rx: 460, ry: 340, fill: '#FFF1B0', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(exit, { opacity: 0.85, duration: S(11.0), ease: 'power1.in' }, S(a + 0.3));
    const pts = [[140, 1000], [430, 910], [340, 800], [660, 700], [570, 590], [880, 510], [800, 400], [1130, 330], [1090, 240], [1450, 200]];
    let d = `M${pts[0][0]},${pts[0][1]}`; pts.slice(1).forEach(p => d += ` L${p[0]},${p[1]}`);
    draw(P(g, d, { color: GOLD, w: 12 }), a + 0.2, 1.4, { sound: false });
    [[300, 970], [520, 850], [480, 750], [740, 650], [700, 540], [980, 450], [930, 350], [1260, 280], [200, 1040], [600, 930]].forEach(([x, y], i) => { const s = el('ellipse', { cx: x, cy: y, rx: 22, ry: 13, fill: '#9C968B' }, g); appear(s, a + 0.4 + i * 0.1, 0.2); });
    const m = mover(g, pts[0][0] + 150, pts[0][1], 0.62);
    back(m.g, 0, 0, 1.0, null, { fill: '#2A1B10', stroke: '#E8D9B8' });                 // quien lo arrastra
    const cw = el('g', {}, m.g); back(cw, -250, 0, 0.85, null, { fill: '#5C4630', stroke: '#E8D9B8' });  // el prisionero
    draw(P(m.g, 'M-60,-120 L-190,-90', { color: '#E8D9B8', w: 14 }), a + 0.3, 0.3, { sound: false });
    tl.to(m, { keyframes: pts.slice(1).map((p, i) => ({ x: p[0] + 150, y: p[1], duration: S(1.2), ease: 'none' })) }, S(a + 0.5));
    // tropieza al decir "dolorosa"
    tl.to(cw, { rotation: -35, y: 40, x: -20, duration: S(0.25), ease: 'power2.in' }, S(a + vo(3.1)));
    tl.to(cw, { rotation: 0, y: 0, x: 0, duration: S(0.5), ease: 'power2.out' }, S(a + vo(4.0)));
    comic(g, 760, 520, '¡ouch!', a + vo(3.3), { color: RED, size: 100, rot: -10, life: 1.3, sound: 'thud' });
    const u1 = T(g, 520, 120, 'La subida es larga,', { size: 92, color: CHALK }); write(u1, a + vo(0.0), 1.7);
    const u2 = T(g, 520, 225, 'escarpada', { size: 100, color: CHALK_B }); write(u2, a + vo(1.8), 1.2);
    const u3 = T(g, 520, 340, 'y dolorosa', { size: 130, color: RED }); write(u3, a + vo(3.1), 1.0);
    fade(u1, a + vo(4.5)); fade(u2, a + vo(4.5)); fade(u3, a + vo(4.5));
    write(T(g, 1250, 700, 'Quien lo arrastra', { size: 92, color: CHALK }), a + vo(4.66), 1.3);
    write(T(g, 1350, 820, 'no lo suelta', { size: 110, color: CHALK_O }), a + vo(5.9), 1.1);
    write(T(g, 1380, 940, 'hasta llegar a la superficie', { size: 78, color: CHALK_B }), a + vo(7.4), 2.2);
    t = 13.88;
  }
  const s2 = newScene('paper');
  t = TR.flash(s1, s2, t);

  /* 2 · Sale: la luz del sol lo golpea; queda cegado (papel + plumón) */
  setTool('marker');
  { const g = s2.g, a = t, vo = mkVo(a);
    const SUN = '#F5C84C';
    sunIcon(g, 1500, 230, 120, a + vo(11.2));
    // boca de la cueva abajo a la izquierda
    el('path', { d: 'M0,1080 L0,720 Q200,560 420,720 L420,1080 Z', fill: '#2A2119', stroke: INK, 'stroke-width': 8 }, g);
    draw(P(g, 'M0,960 L1920,960', { color: INK, w: 8 }), a + 0.1, 0.5, { sound: false });
    // rayos que lo golpean
    [0, 1, 2, 3, 4].forEach(i => draw(P(g, `M${1420 - i * 40},${330 + i * 10} L${880 + i * 15},${880 - i * 8}`, { color: '#E8A530', w: 7 }), a + vo(13.0) + i * 0.1, 0.3, { sound: false }));
    const cm = mover(g, 330, 960, 1.2);
    back(cm.g, 0, 0, 1.0, null, { fill: '#5C4630', stroke: INK });
    tl.to(cm, { x: 880, duration: S(2.0), ease: 'power1.out' }, S(a + vo(10.5)));
    tl.to(cm, { x: 780, r: -12, duration: S(0.25), ease: 'power2.out' }, S(a + vo(13.6)));
    const t1 = T(g, 760, 110, 'Y cuando por fin sale,', { size: 90 }); write(t1, a + vo(10.4), 1.8);
    const t2 = T(g, 760, 210, 'la luz del sol lo golpea', { size: 90, color: ORANGE }); write(t2, a + vo(12.3), 1.7);
    comic(g, 1250, 650, '¡PAF!', a + vo(13.7), { color: RED, size: 140, rot: -8, life: 1.4, sound: 'stamp' });
    fade(t1, a + vo(14.9)); fade(t2, a + vo(14.9));
    write(T(g, 760, 110, 'Está tan cegado', { size: 96 }), a + vo(15.33), 1.3);
    write(T(g, 760, 215, 'que no puede ver nada', { size: 90, color: RED }), a + vo(16.5), 1.7);
    write(T(g, 760, 320, 'de lo que ahora llamamos real', { size: 76, color: GRAPHITE, cls: 'kalam' }), a + vo(18.2), 2.2);
    // el resplandor lo va cegando
    const wh = el('rect', { x: -50, y: -50, width: 2020, height: 1180, fill: '#FFFFFF', opacity: 0 }, g);
    tl.to(wh, { opacity: 0.35, duration: S(0.15) }, S(a + vo(13.7)));
    tl.to(wh, { opacity: 0.8, duration: S(5.0) }, S(a + vo(15.4)));
    t = 27.06;
  }
  const s3 = newScene('paper');
  t = TR.eraser(s2, s3, t);

  /* 3 · Ni árboles, ni montañas, ni personas: solo un resplandor blanco (papel + plumón) */
  setTool('marker');
  { const g = s3.g, a = t, vo = mkVo(a);
    const tree = el('g', { transform: 'translate(480 760) scale(2.2)' }, g); tree.innerHTML = `<path d="${SIL.tree}" fill="#3C8A55" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    const mount = el('g', {}, g); mount.innerHTML = '<path d="M720,820 L960,420 L1060,560 L1160,440 L1380,820 Z" fill="#8C857B" stroke="#1E1812" stroke-width="8" stroke-linejoin="round"/><path d="M900,520 L960,420 L1020,520 L990,540 L960,520 L930,545 Z" fill="#FFFFFF" stroke="#1E1812" stroke-width="5"/>';
    const per = el('g', { transform: 'translate(1600 820) scale(2.2)' }, g); per.innerHTML = `<path d="${SIL.man}" fill="#B5705C" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    appear(tree, a + vo(21.0), 0.3); appear(mount, a + vo(22.3), 0.3); appear(per, a + vo(23.7), 0.3);
    write(T(g, 480, 180, 'Ni árboles,', { size: 100 }), a + vo(20.95), 1.2);
    write(T(g, 1050, 180, 'ni montañas,', { size: 100 }), a + vo(22.3), 1.3);
    write(T(g, 1600, 180, 'ni personas', { size: 100 }), a + vo(23.8), 1.3);
    [[330, 560, 640, 860], [740, 420, 1380, 860], [1470, 520, 1740, 840]].forEach(([x1, y1, x2, y2], i) => {
      draw(P(g, `M${x1},${y1} L${x2},${y2} M${x2},${y1} L${x1},${y2}`, { color: RED, w: 16 }), a + vo(21.9 + i * 1.4), 0.4, { sound: false });
    });
    // resplandor blanco que lo invade todo
    const cover = el('circle', { cx: 960, cy: 540, r: 0, fill: '#FFFFFF' }, g);
    tl.to(cover, { attr: { r: 1300 }, duration: S(1.6), ease: 'power2.in' }, S(a + vo(25.6)));
    write(T(g, CX, 540, 'Solo un resplandor blanco', { size: 130, color: '#8A8478' }), a + vo(26.4), 2.0);
    t = 37.1;
  }
  const s4 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.iris(s3, s4, t, { x: 960, y: 540 });

  /* 4 · Platón es realista: el conocimiento no llega de golpe; se necesita costumbre (pizarrón + gis) */
  setTool('chalk');
  { const g = s4.g, a = t, vo = mkVo(a);
    bust(g, 420, 1040, 620, a + vo(29.0), 7);
    write(T(g, 1280, 170, 'Platón es muy realista', { size: 100, color: CHALK_B }), a + vo(28.97), 1.8);
    write(T(g, 1280, 330, 'el conocimiento', { size: 110, color: CHALK }), a + vo(31.2), 1.3);
    write(T(g, 1280, 480, 'no llega de golpe', { size: 120, color: RED }), a + vo(32.5), 1.2);
    // rayo tachado
    draw(P(g, 'M1760,300 L1700,420 L1760,420 L1690,560', { color: CHALK_O, w: 12 }), a + vo(33.1), 0.4, { sound: false });
    write(T(g, 1280, 700, 'Se necesita', { size: 100, color: CHALK }), a + vo(34.1), 1.0);
    write(T(g, 1280, 860, 'costumbre', { size: 190, color: CHALK_O }), a + vo(35.0), 1.1);
    t = 46.5;
  }
  const s5 = newScene('notebook');
  t = TR.slideUp(s4, s5, t);

  /* 5 · Primero sombras y reflejos en el agua; después los objetos mismos (cuaderno + lápiz) */
  setTool('pencil');
  { const g = s5.g, a = t, vo = mkVo(a);
    const t1 = T(g, CX, 110, 'Al principio, el liberado', { size: 96, color: GRAPHITE }); write(t1, a + vo(36.5), 1.7);
    const t2 = T(g, CX, 215, 'solo podrá mirar', { size: 96, color: BLUE }); write(t2, a + vo(38.2), 1.2);
    // izquierda: sombra en la pared y reflejo en el agua
    el('rect', { x: 200, y: 330, width: 560, height: 280, rx: 14, fill: '#F1E3C4', stroke: GRAPHITE, 'stroke-width': 7 }, g);
    const sh = el('g', { transform: 'translate(480 580) scale(1.7)' }, g); sh.innerHTML = `<path d="${SIL.dog}" fill="#1E1812" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    appear(sh, a + vo(40.1), 0.4);
    write(T(g, 480, 700, 'sombras', { size: 80, color: GRAPHITE }), a + vo(40.1), 0.8);
    el('path', { d: 'M200,780 Q480,740 760,780 Q770,900 480,920 Q190,900 200,780 Z', fill: '#9CC3E8', stroke: BLUE, 'stroke-width': 7 }, g);
    const rf = el('g', { transform: 'translate(480 790) scale(1.2,-1.2)', opacity: 0.45 }, g); rf.innerHTML = `<path d="${SIL.dog}" fill="#1E1812"/>`;
    appear(rf, a + vo(41.2), 0.5); gsap.set(rf, { opacity: 0 }); tl.to(rf, { opacity: 0.4, duration: S(0.5) }, S(a + vo(41.2)));
    write(T(g, 480, 1000, 'y reflejos en el agua', { size: 70, color: BLUE }), a + vo(41.2), 1.6);
    fade(t1, a + vo(42.9)); fade(t2, a + vo(42.9));
    // derecha: los objetos mismos
    write(T(g, CX, 110, 'Después,', { size: 100, color: ORANGE }), a + vo(43.07), 0.9);
    write(T(g, CX, 215, 'los objetos mismos', { size: 100, color: GRAPHITE }), a + vo(44.1), 1.4);
    draw(P(g, 'M820,560 L1000,560 M960,525 L1000,560 L960,595', { color: ORANGE, w: 10 }), a + vo(43.6), 0.4, { sound: false });
    const rl = el('g', { transform: 'translate(1380 700) scale(2.3)' }, g); rl.innerHTML = `<path d="${SIL.dog}" fill="#C9A24A" stroke="#1E1812" stroke-width="5" stroke-linejoin="round"/>`;
    appear(rl, a + vo(44.4), 0.4);
    el('rect', { x: 1250, y: 705, width: 280, height: 50, fill: '#9C968B', stroke: GRAPHITE, 'stroke-width': 6 }, g);
    t = 58.3;
  }
  const s6 = newScene(BG.solid('#0B1B3A'));
  t = TR.flip(s5, s6, t);

  /* 6 · Cielo nocturno, luna, estrellas; al final, el sol (noche + gis) */
  setTool('chalk');
  { const g = s6.g, a = t, vo = mkVo(a);
    const rnd = i => { const x = Math.sin(i * 91.7 + 13.3) * 43758.5453; return x - Math.floor(x); };
    for (let i = 0; i < 46; i++) { const st = el('circle', { cx: 80 + rnd(i) * 1760, cy: 60 + rnd(i + 99) * 640, r: 3 + rnd(i + 7) * 5, fill: '#FFFFFF' }, g); appear(st, a + vo(49.4) + i * 0.05, 0.25); }
    const moon = el('path', { d: 'M440,150 A110,110 0 1,0 440,370 A80,110 0 1,1 440,150 Z', fill: '#F2EAC8', stroke: '#E8E0B8', 'stroke-width': 5 }, g);
    appear(moon, a + vo(48.7), 0.6);
    // horizonte y el prisionero mirando hacia arriba
    el('rect', { x: -10, y: 900, width: 1940, height: 200, fill: '#0F1E36' }, g);
    back(g, 560, 960, 1.1, a + vo(45.9), { fill: '#16306B', stroke: '#E8E0B8' });
    // el sol se asoma
    const sunG = el('g', {}, g);
    sunG.innerHTML = '<circle cx="1500" cy="0" r="130" fill="#F5C84C" stroke="#FFE08A" stroke-width="8"/>' + [0,1,2,3,4,5,6,7,8,9,10,11].map(k => { const an = k / 12 * Math.PI * 2; return `<line x1="${1500 + Math.cos(an) * 170}" y1="${Math.sin(an) * 170}" x2="${1500 + Math.cos(an) * 240}" y2="${Math.sin(an) * 240}" stroke="#FFD27A" stroke-width="10" stroke-linecap="round"/>`; }).join('');
    gsap.set(sunG, { y: 1300 });
    tl.to(sunG, { y: 560, duration: S(3.8), ease: 'power2.out' }, S(a + vo(53.8)));
    const dawn = el('rect', { x: -50, y: -50, width: 2020, height: 1180, fill: '#F2A33A', opacity: 0 }, g);
    tl.to(dawn, { opacity: 0.4, duration: S(4.0) }, S(a + vo(53.8)));
    const c1 = T(g, 1000, 120, 'Más tarde,', { size: 96, color: CHALK_B }); write(c1, a + vo(45.9), 1.0);
    const c2 = T(g, 1000, 240, 'el cielo nocturno,', { size: 100, color: CHALK }); write(c2, a + vo(47.1), 1.5);
    const c3 = T(g, 1000, 360, 'la luna, las estrellas', { size: 90, color: '#F2EAC8' }); write(c3, a + vo(48.7), 2.2);
    fade(c1, a + vo(51.0)); fade(c2, a + vo(51.0)); fade(c3, a + vo(51.0));
    write(T(g, 1000, 120, 'Y solo al final,', { size: 100, color: CHALK }), a + vo(51.34), 1.4);
    write(T(g, 1000, 240, 'con paciencia,', { size: 100, color: CHALK_B }), a + vo(52.8), 1.3);
    write(T(g, 1000, 1030, 'podrá levantar la vista hacia el sol', { size: 90, color: '#FFE08A' }), a + vo(54.3), 3.3);
    t = 74.3;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
