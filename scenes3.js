/* EL MITO DE LA CAVERNA — 2:00–3:00 LA CUEVA (pizarra, 16:9) · sincronizado a vo3.mp3 (+0.3 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, type, comic, stamp, wobble, mover, sfx,
          person, popPerson, image, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960, GOLD = '#BFA27A';
  const bust = (g, x, y, h, at, life = 5) => {
    const w = h * 582 / 700, m = mover(g, x, y, 1);
    image(m.g, 'busto.png', -w / 2, -h, w, h);
    gsap.set(m.g, { opacity: 0 });
    tl.to(m.g, { opacity: 1, duration: S(0.7) }, S(at));
    tl.fromTo(m, { r: -1.2 }, { r: 1.2, duration: S(1.4), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil(life / 1.4)), immediateRender: false }, S(at));
    tl.fromTo(m, { y: y }, { y: y - 5, duration: S(1.0), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil(life / 1.0)), immediateRender: false }, S(at));
    return m;
  };
  const fade = (obj, at) => tl.to(obj, { opacity: 0, duration: S(0.25) }, S(at));
  const mkVo = a => w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
  // fila de prisioneros (mirando al frente): devuelve cabezas y cuellos para cadenas
  const prisoners = (g, xs, feet, sc, at, shirts) => xs.map((x, i) => {
    const pm = mover(g, x, feet, sc), d = person(pm.g, 0, 0, 1, { shirt: shirts[i % shirts.length], glasses: false, outline: false });
    popPerson(d, at + i * 0.3, { sound: i === 0 ? 'boing' : false });
    return { x, neck: feet - sc * 205 };
  });
  const SHIRTS = ['teal', '#B5705C', '#7A8FC4', '#C9A24A'];
  let t = 0;

  /* 1 · Corte lateral: la entrada hacia la luz (papel + plumón) */
  const s1 = newScene('paper'); show(s1, 0); setTool('marker');
  let rock;
  { const g = s1.g, a = 0.1, vo = mkVo(a);
    // sol
    el('circle', { cx: 1690, cy: 150, r: 70, fill: '#F5C84C', stroke: INK, 'stroke-width': 6 }, g);
    for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2; el('line', { x1: 1690 + Math.cos(an) * 95, y1: 150 + Math.sin(an) * 95, x2: 1690 + Math.cos(an) * 130, y2: 150 + Math.sin(an) * 130, stroke: '#E8A530', 'stroke-width': 8, 'stroke-linecap': 'round' }, g); }
    // terreno en corte
    draw(P(g, 'M0,330 L1520,330 L1700,330 L1920,330 L1920,1080 L0,1080 Z', { color: INK, w: 7, fill: '#8B6B4A' }), a + vo(0.3), 1.0, { sound: false });
    // larga entrada inclinada que baja desde la superficie
    draw(P(g, 'M1500,330 L1680,330 L1180,820 L1020,820 Z', { color: INK, w: 6, fill: '#F6E7B8' }), a + vo(3.6), 0.9, { sound: false });
    // cámara de la cueva
    draw(P(g, 'M260,880 Q250,700 640,690 Q1180,700 1230,880 Q1180,1030 640,1040 Q270,1030 260,880 Z', { color: INK, w: 6, fill: '#2A2119' }), a + vo(4.6), 1.0, { sound: false });
    // rayo de luz que baja por la entrada
    const beam = el('path', { d: 'M1500,330 L1680,330 L1130,830 L930,830 Z', fill: '#FFF0A8', opacity: 0 }, g);
    tl.to(beam, { opacity: 0.45, duration: S(0.8) }, S(a + vo(5.9)));
    sfx('swell', a + vo(5.9), { gain: 0.6 });
    write(T(g, 800, 105, 'Imagina una caverna subterránea,', { size: 84 }), a + vo(0.0), 3.0);
    write(T(g, 700, 195, 'con una larga entrada', { size: 66, cls: 'kalam', color: SEPIA }), a + vo(3.5), 1.5);
    write(T(g, 700, 282, 'abierta hacia la luz', { size: 66, cls: 'kalam', color: ORANGE }), a + vo(5.2), 1.4);
    // roca (la que "cae" en la transición de descenso)
    const rg = el('g', { transform: 'translate(300,330)' }, g); rock = el('g', {}, rg);
    el('path', { d: 'M-80,0 Q-90,-70 -20,-90 Q60,-95 85,-30 Q100,0 80,0 Z', fill: '#9C968B', stroke: INK, 'stroke-width': 6 }, rock);
    t = 9.6;
  }
  const s2 = newScene(BG.solid('#2A2119'));
  t = TR.whipDown(s1, s2, t, { drop: rock });

  /* 2 · Dentro: personas encadenadas (cueva oscura + gis) */
  setTool('chalk');
  { const g = s2.g, a = t, vo = mkVo(a);
    draw(P(g, 'M40,1080 L40,380 Q80,150 420,110 Q960,40 1500,110 Q1850,170 1880,420 L1880,1080', { color: GOLD, w: 9 }), a + 0.05, 0.9, { sound: false });
    draw(P(g, 'M40,950 L1880,950', { color: GOLD, w: 8 }), a + 0.2, 0.5, { sound: false });
    const l1 = T(g, CX, 250, 'Dentro, hay personas que viven ahí', { size: 90, color: CHALK });
    write(l1, a + vo(7.7), 2.8);
    const l2 = T(g, CX, 380, 'desde que nacieron', { size: 120, color: CHALK_O });
    write(l2, a + vo(10.7), 1.8);
    const ps = prisoners(g, [520, 760, 1000, 1240], 950, 0.9, a + vo(8.8), SHIRTS);
    fade(l1, a + vo(12.4)); fade(l2, a + vo(12.4));
    const l3 = T(g, CX, 250, 'encadenadas por las piernas', { size: 100, color: CHALK });
    write(l3, a + vo(13.4), 2.2);
    const l4 = T(g, CX, 370, 'y por el cuello', { size: 120, color: RED });
    write(l4, a + vo(15.5), 1.4);
    ps.forEach((p, i) => {
      draw(P(g, `M${p.x - 32},940 q16,28 32,0 q16,-28 32,0`, { color: CHALK_B, w: 7 }), a + vo(14.6) + i * 0.15, 0.3, { sound: false });
      draw(P(g, `M${p.x - 26},${p.neck} L${p.x + 26},${p.neck}`, { color: CHALK_B, w: 8 }), a + vo(16.2) + i * 0.15, 0.25, { sound: false });
      draw(P(g, `M${p.x - 24},${p.neck + 6} l-16,22 l16,20 l-16,22`, { color: CHALK_B, w: 6 }), a + vo(16.4) + i * 0.15, 0.3, { sound: false });
    });
    fade(l3, a + vo(17.2)); fade(l4, a + vo(17.2));
    write(T(g, CX, 250, 'no pueden moverse', { size: 110, color: CHALK }), a + vo(17.5), 1.4);
    write(T(g, CX, 380, 'ni girar la cabeza', { size: 120, color: CHALK_O }), a + vo(19.3), 1.5);
    t = 26.9;
  }
  const s3 = newScene('sepia');
  t = TR.slideUp(s2, s3, t);

  /* 3 · Solo miran al frente (pergamino + pluma) */
  setTool('quill');
  { const g = s3.g, a = t, vo = mkVo(a);
    draw(P(g, 'M1180,260 L1820,260 L1820,930 L1180,930 Z', { color: SEPIA, w: 8, fill: H('gray') }), a + vo(25.6), 0.7, { sound: false });
    draw(P(g, 'M80,930 L1880,930', { color: SEPIA, w: 8 }), a + 0.1, 0.5, { sound: false });
    prisoners(g, [260, 470, 680, 890], 930, 0.9, a + 0.2, SHIRTS);
    const t1 = T(g, 640, 170, 'Solo pueden mirar', { size: 100, color: SEPIA });
    write(t1, a + vo(22.0), 1.5);
    const t2 = T(g, 640, 290, 'hacia delante,', { size: 120, color: PURPLE });
    write(t2, a + vo(23.5), 1.0);
    // mirada al frente
    [0, 1, 2, 3].forEach(i => draw(P(g, `M${300 + i * 210},700 L1170,${540 + i * 40}`, { color: ORANGE, w: 6 }), a + vo(24.4) + i * 0.1, 0.5, { sound: false }));
    const t3 = T(g, 640, 430, 'hacia el fondo de la cueva', { size: 76, color: SEPIA, cls: 'kalam' });
    write(t3, a + vo(24.5), 2.0);
    fade(t1, a + vo(26.6)); fade(t2, a + vo(26.6)); fade(t3, a + vo(26.6));
    write(T(g, 640, 170, 'Nunca han visto a sus compañeros,', { size: 80, color: SEPIA }), a + vo(26.9), 2.4);
    write(T(g, 640, 290, 'ni siquiera a sí mismos,', { size: 90, color: PURPLE }), a + vo(29.5), 2.0);
    [-1, 0, 1].forEach(k => draw(P(g, `M${365 + k * 210 + 30},640 l24,24 m0,-24 l-24,24`, { color: RED, w: 9 }), a + vo(28.4) + (k + 1) * 0.2, 0.2, { sound: false }));
    write(T(g, 640, 410, 'ni el exterior', { size: 110, color: RED }), a + vo(32.2), 1.2);
    // sol tachado
    el('circle', { cx: 1500, cy: 110, r: 46, fill: '#F5C84C', stroke: SEPIA, 'stroke-width': 5 }, g);
    draw(P(g, 'M1450,60 L1550,160 M1550,60 L1450,160', { color: RED, w: 10 }), a + vo(32.6), 0.3, { sound: false });
    t = 41.8;
  }
  const s4 = newScene('kraft');
  t = TR.flip(s3, s4, t);

  /* 4 · La misma pared de piedra (kraft + pincel) */
  setTool('brush');
  { const g = s4.g, a = t, vo = mkVo(a), BR = '#2A1B10';
    write(T(g, CX, 170, 'Toda su vida', { size: 130, color: BR }), a + vo(33.9), 1.2);
    draw(P(g, 'M360,260 L1560,260 L1560,880 L360,880 Z', { color: BR, w: 9, fill: H('gray') }), a + vo(35.0), 0.8);
    [400, 540, 680].forEach((y, i) => draw(P(g, `M360,${y} L1560,${y}`, { color: BR, w: 6 }), a + vo(36.0) + i * 0.1, 0.25, { sound: false }));
    for (let r = 0; r < 4; r++) for (let c = 1; c < 6; c++) {
      const x = 360 + c * 200 + (r % 2 ? 100 : 0); if (x >= 1560) continue;
      draw(P(g, `M${x},${260 + r * 140 - (r === 0 ? 0 : 0)} L${x},${260 + (r + 1) * 140}`, { color: BR, w: 6 }), a + vo(36.3) + (r * 5 + c) * 0.02, 0.15, { sound: false });
    }
    const b1 = T(g, CX, 990, 'frente a una misma pared de piedra', { size: 90, color: BR });
    write(b1, a + vo(36.5), 2.4);
    fade(b1, a + vo(39.9));
    write(T(g, CX, 1010, 'Para ellos, no existe otra cosa', { size: 86, color: '#7A1F18' }), a + vo(40.0), 3.0);
    bust(g, 1770, 1060, 190, a + vo(41.0), 2.5);
    t = 54.1;
  }
  const s5 = newScene('blue');
  t = TR.eraser(s4, s5, t);

  /* 5 · No saben que están presos (azul + texto cinético) */
  setTool(null);
  { const g = s5.g, a = t, vo = mkVo(a);
    pop(T(g, CX, 250, 'No saben', { size: 180, color: '#FFFFFF' }), a + vo(43.8));
    pop(T(g, CX, 420, 'que están presos', { size: 150, color: '#FFD27A' }), a + vo(44.7), { rot: -3 });
    pop(T(g, CX, 600, 'porque nunca han conocido', { size: 100, color: '#FFFFFF', cls: 'kalam' }), a + vo(46.1), { rot: 2 });
    pop(T(g, CX, 800, 'nada distinto', { size: 190, color: '#FFFFFF', stroke: INK }), a + vo(48.2), { sound: 'stamp' });
    prisoners(g, [320, 540, 760, 980], 1060, 0.45, a + vo(45.0), SHIRTS);
    t = 62.5;
  }
  const s6 = newScene(BG.solid('#2A2119'));
  t = TR.iris(s5, s6, t, { x: 980, y: 900 });

  /* 6 · Detrás de ellos... algo lo cambia todo (cueva + gis) */
  setTool('chalk');
  { const g = s6.g, a = t, vo = mkVo(a);
    draw(P(g, 'M40,1080 L40,380 Q80,150 420,110 Q960,40 1500,110 Q1850,170 1880,420 L1880,1080', { color: GOLD, w: 9 }), a + 0.05, 0.8, { sound: false });
    draw(P(g, 'M40,950 L1880,950', { color: GOLD, w: 8 }), a + 0.2, 0.5, { sound: false });
    // pared al fondo (derecha)
    el('rect', { x: 1380, y: 300, width: 440, height: 560, rx: 14, fill: '#F1E3C4', stroke: GOLD, 'stroke-width': 7, opacity: 0.0 }, g);
    prisoners(g, [820, 1020, 1220], 950, 0.9, a + 0.3, SHIRTS);
    // resplandor detrás de ellos (izquierda): crece
    const glow = el('ellipse', { cx: 250, cy: 800, rx: 330, ry: 260, fill: '#F2A33A', opacity: 0, filter: 'url(#soft)' }, g);
    tl.to(glow, { opacity: 0.55, duration: S(1.6) }, S(a + vo(53.0)));
    const fire = el('g', { transform: 'translate(250,870)', opacity: 0 }, g);
    fire.innerHTML = '<path d="M0,80 Q-50,20 -10,-40 Q0,-10 25,-60 Q75,0 40,80 Z" fill="#F2A33A" stroke="#C4501F" stroke-width="7"/><path d="M0,80 Q-20,40 5,10 Q25,40 20,80 Z" fill="#FFE08A"/>';
    tl.to(fire, { opacity: 1, duration: S(0.5) }, S(a + vo(54.3))); sfx('swell', a + vo(54.3), { gain: 0.7 });
    write(T(g, CX, 190, 'Y justo detrás de ellos,', { size: 110, color: CHALK }), a + vo(50.5), 2.0);
    write(T(g, CX, 310, 'fuera de su vista,', { size: 100, color: CHALK_B }), a + vo(52.6), 1.5);
    write(T(g, CX, 480, 'está sucediendo algo', { size: 100, color: CHALK }), a + vo(54.5), 1.8);
    write(T(g, CX, 640, 'que lo cambia todo', { size: 150, color: CHALK_O }), a + vo(56.4), 1.9);
    t = 74.1;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
