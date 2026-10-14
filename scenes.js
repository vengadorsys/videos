/* EL MITO DE LA CAVERNA — 0:00–1:00 HOOK (pizarra, 16:9) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, popIn, type, comic, wobble, mover, bubble, sfx,
          face, emote, arms, wave, blink, wink, hop, wiggle,
          mascot, drawMascot, popMascot, person, popPerson, drawPerson,
          newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const W = 1920, CX = 960;
  let t = 0;

  /* 1 · Pantalla negra, goteo, sombras en la pared */
  const s1 = newScene(BG.solid('#08080B')); show(s1, 0); setTool('chalk');
  { const g = s1.g, a = 0.1;
    // pared tenue con sombras que se mueven
    const wall = el('rect', { x: 1060, y: 150, width: 720, height: 560, rx: 18, fill: '#15151B', stroke: '#2A2A33', 'stroke-width': 4, opacity: 0 }, g);
    tl.to(wall, { opacity: 1, duration: S(0.6) }, S(a + 0.3));
    const sh = [
      ['M1180,640 L1180,520 Q1180,480 1215,480 Q1250,480 1250,520 L1250,640 Z M1215,470 m-26,0 a26,26 0 1,0 52,0 a26,26 0 1,0 -52,0', 1160],
      ['M1380,640 Q1380,560 1440,550 Q1470,500 1520,540 Q1580,540 1570,640 Z', 1380],
      ['M1640,640 L1640,420 M1640,520 L1590,470 M1640,480 L1700,430 M1640,560 L1700,510', 1640],
    ];
    sh.forEach(([d, x0], k) => {
      const p = el('path', { d, fill: '#050507', stroke: '#050507', 'stroke-width': 18, 'stroke-linecap': 'round', opacity: 0 }, g);
      tl.to(p, { opacity: 0.95, duration: S(0.4) }, S(a + 0.6 + k * 0.3));
      tl.to(p, { x: 40 - k * 30, y: -10 * (k % 2 ? -1 : 1), duration: S(1.6 + k * .3), ease: 'sine.inOut', yoyo: true, repeat: 3 }, S(a + 0.6 + k * 0.3));
    });
    // gotas
    const drop = el('ellipse', { cx: 300, cy: 120, rx: 9, ry: 14, fill: '#8FB4D9', opacity: 0 }, g);
    for (let i = 0; i < 4; i++) {
      const s0 = a + 0.2 + i * 2.1;
      tl.fromTo(drop, { y: 0, opacity: 1 }, { y: 780, duration: S(0.9), ease: 'power2.in', immediateRender: false }, S(s0));
      tl.set(drop, { opacity: 0 }, S(s0 + 0.9)); sfx('tick', s0 + 0.9, { gain: 0.9 });
      const rip = el('ellipse', { cx: 300, cy: 900, rx: 5, ry: 2, fill: 'none', stroke: '#8FB4D9', 'stroke-width': 4, opacity: 0 }, g);
      tl.fromTo(rip, { opacity: 1, attr: { rx: 5, ry: 2 } }, { opacity: 0, attr: { rx: 70, ry: 14 }, duration: S(0.7), immediateRender: false }, S(s0 + 0.9));
    }
    write(T(g, 540, 330, '¿Y si todo lo que', { size: 120, color: CHALK }), a + 1.0, 0.9);
    write(T(g, 540, 470, 'has visto en tu vida', { size: 120, color: CHALK }), a + 2.0, 0.9);
    write(T(g, 540, 640, 'fuera solo una sombra?', { size: 130, color: CHALK_O }), a + 3.2, 1.2);
    t = a + 8.0;
  }
  const s2 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.eraser(s1, s2, t);

  /* 2 · La realidad como proyección */
  setTool('chalk');
  { const g = s2.g, a = t;
    write(T(g, CX, 230, '¿Y si lo que llamas "realidad"', { size: 108, color: CHALK }), a + 0.2, 1.2);
    write(T(g, CX, 380, 'fuera apenas una', { size: 108, color: CHALK }), a + 1.6, 0.8);
    write(T(g, CX, 520, 'proyección en una pared', { size: 138, color: CHALK_O }), a + 2.3, 1.3);
    draw(P(g, wobble(CX, 490, 640, 95, 1.1, 2), { color: CHALK, w: 7 }), a + 3.6, 0.8);
    write(T(g, CX, 800, '...y nadie te lo hubiera dicho', { size: 90, color: CHALK_B }), a + 4.5, 1.3);
    write(T(g, CX, 930, 'jamás', { size: 150, color: CHALK_O, rot: -4 }), a + 6.0, 0.6);
    const m = mover(g, 200, 880, 0.8), c = mascot(m.g, 0, 0, 1, { theme: null, ink: CHALK, ground: null, shadow: 'shadowW' });
    popMascot(c, a + 5.2); face(c, a + 5.6, 'wide', { mouth: 'o', emote: '?' });
    t = a + 8.0;
  }
  const s3 = newScene('sepia');
  t = TR.slideUp(s2, s3, t);

  /* 3 · Hace más de 2300 años */
  setTool('quill');
  { const g = s3.g, a = t;
    write(T(g, 560, 220, 'Hace más de', { size: 110, color: SEPIA }), a + 0.2, 0.8);
    write(T(g, 560, 400, '2 300 años', { size: 220, color: RED }), a + 1.0, 1.2);
    draw(P(g, 'M200,440 C500,470 900,430 1160,455', { color: SEPIA, w: 8 }), a + 2.2, 0.5);
    write(T(g, 560, 610, 'un filósofo griego', { size: 110, color: SEPIA }), a + 2.9, 1.1);
    write(T(g, 560, 760, 'imaginó exactamente esto:', { size: 100, color: PAL.purple }), a + 4.2, 1.2);
    // columna griega
    draw(P(g, 'M1450,260 L1790,260 L1790,320 L1450,320 Z', { color: SEPIA, w: 7, fill: H('sepia') }), a + 1.0, 0.3);
    [1490, 1560, 1630, 1700, 1750].forEach((x, i) => draw(P(g, `M${x},320 L${x},880`, { color: SEPIA, w: 12 }), a + 1.3 + i * 0.12, 0.3));
    draw(P(g, 'M1420,880 L1820,880 L1820,950 L1420,950 Z', { color: SEPIA, w: 7, fill: H('sepia') }), a + 2.0, 0.3);
    const m = mover(g, 140, 1010, 0.7), c = mascot(m.g, 0, 0, 1, { theme: 'purple', ink: SEPIA, ground: null, hat: 'crown' });
    popMascot(c, a + 5.2); face(c, a + 5.6, 'determined', { mouth: 'smile' }); arms(c, a + 5.8, { R: -60 });
    t = a + 8.0;
  }
  const s4 = newScene(BG.solid('#2A2119'));
  t = TR.iris(s3, s4, t, { x: 1620, y: 600 });

  /* 4 · La cueva: encadenados, sombras, mundo entero */
  setTool('chalk');
  { const g = s4.g, a = t;
    // cueva
    el('path', { d: 'M40,1080 L40,380 Q80,150 420,110 Q960,40 1500,110 Q1850,170 1880,420 L1880,1080 Z', fill: '#3B2E22' }, g);
    draw(P(g, 'M40,1080 L40,380 Q80,150 420,110 Q960,40 1500,110 Q1850,170 1880,420 L1880,1080', { color: '#BFA27A', w: 9 }), a + 0.1, 1.0, { sound: false });
    // suelo
    draw(P(g, 'M40,930 L1880,930', { color: '#BFA27A', w: 8 }), a + 0.5, 0.5, { sound: false });
    // pared con sombras
    const wall = el('rect', { x: 1180, y: 250, width: 640, height: 520, rx: 14, fill: '#F1E3C4', stroke: '#BFA27A', 'stroke-width': 7, opacity: 0 }, g);
    tl.to(wall, { opacity: 1, duration: S(0.5) }, S(a + 1.0));
    // fuego
    const fire = el('g', { transform: 'translate(120,850)', opacity: 0 }, g);
    fire.innerHTML = '<path d="M0,80 Q-50,20 -10,-40 Q0,-10 25,-60 Q75,0 40,80 Z" fill="#F2A33A" stroke="#C4501F" stroke-width="7"/><path d="M0,80 Q-20,40 5,10 Q25,40 20,80 Z" fill="#FFE08A"/>';
    tl.to(fire, { opacity: 1, duration: S(0.4) }, S(a + 1.2)); sfx('swell', a + 1.2, { gain: 0.5 });
    tl.to(fire, { scaleY: 1.12, transformOrigin: '50% 100%', duration: S(0.25), yoyo: true, repeat: 40 }, S(a + 1.2));
    // prisioneros mirando a la pared
    [0, 1, 2].forEach(i => {
      const pm = mover(g, 520 + i * 170, 930, 0.8), d = person(pm.g, 0, 0, 1, { ink: '#E8D9B8', outline: true, shirt: ['teal', '#B5705C', '#7A8FC4'][i] });
      popPerson(d, a + 1.8 + i * 0.3, { sound: i === 0 ? 'boing' : false });
      draw(P(g, `M${520 + i * 170 - 10},930 q-18,30 -40,24`, { color: '#BFA27A', w: 6 }), a + 2.3 + i * 0.3, 0.3, { sound: false });
    });
    // sombras en la pared (se mueven)
    [['M1290,700 L1290,560 Q1290,520 1320,520 Q1350,520 1350,560 L1350,700 Z M1320,480 m-28,0 a28,28 0 1,0 56,0 a28,28 0 1,0 -56,0', 0],
     ['M1470,700 Q1470,610 1530,600 Q1560,550 1610,590 Q1670,590 1660,700 Z', 1],
     ['M1730,700 L1730,470 M1730,570 L1690,520 M1730,530 L1780,480', 2]].forEach(([d, k]) => {
      const p = el('path', { d, fill: '#2A2119', stroke: '#2A2119', 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0 }, g);
      tl.to(p, { opacity: 0.9, duration: S(0.4) }, S(a + 4.0 + k * 0.4));
      tl.to(p, { x: -25 - k * 10, duration: S(1.3), ease: 'sine.inOut', yoyo: true, repeat: 6 }, S(a + 4.0 + k * 0.4));
    });
    sfx('swell', a + 4.0, { gain: 0.6 });
    write(T(g, CX, 215, 'Encadenados desde niños', { size: 104, color: CHALK }), a + 0.6, 1.3);
    write(T(g, 620, 430, 'convencidos de que las sombras', { size: 62, color: CHALK_B }), a + 5.6, 1.4);
    write(T(g, 620, 560, 'eran el mundo entero', { size: 96, color: CHALK_O }), a + 7.2, 1.2);
    t = a + 12.5;
  }
  const s5 = newScene('blue');
  t = TR.flash(s4, s5, t);

  /* 5 · Parece ciencia ficción */
  setTool(null);
  { const g = s5.g, a = t;
    pop(T(g, CX, 250, 'Parece ciencia ficción...', { size: 140, color: '#FFFFFF' }), a + 0.2);
    pop(T(g, CX, 480, 'pero es una de las ideas', { size: 100, color: '#FFD27A', cls: 'kalam' }), a + 2.0, { rot: -2 });
    pop(T(g, CX, 640, 'MÁS INFLUYENTES', { size: 190, color: '#FFFFFF', stroke: INK }), a + 3.2, { sound: 'stamp' });
    pop(T(g, CX, 810, 'de la historia del pensamiento', { size: 88, color: '#FFFFFF', cls: 'kalam' }), a + 4.6, { rot: 2 });
    const m = mover(g, 1450, 900, 1.3), c = mascot(m.g, 0, 0, 1, { ground: null });
    popMascot(c, a + 1.0); face(c, a + 1.4, 'wide', { mouth: 'o' }); face(c, a + 4.0, 'star', { mouth: 'grin', emote: 'sparkle' }); hop(c, a + 4.4, 2);
    t = a + 7.5;
  }
  const s6 = newScene('notebook');
  t = TR.flip(s5, s6, t);

  /* 6 · Hoy la vas a conocer completa */
  setTool('pencil');
  { const g = s6.g, a = t;
    write(T(g, CX + 30, 200, 'Hoy la vas a conocer', { size: 130, color: GRAPHITE }), a + 0.2, 1.2);
    write(T(g, CX + 30, 360, 'completa', { size: 190, color: ORANGE }), a + 1.6, 0.9);
    write(T(g, CX + 30, 500, 'paso a paso', { size: 120, color: GRAPHITE }), a + 2.6, 0.9);
    draw(P(g, 'M500,540 C800,570 1200,520 1480,545', { color: BLUE, w: 8 }), a + 3.6, 0.5);
    ['1', '2', '3', '4'].forEach((n, i) => {
      const x = 420 + i * 340;
      draw(P(g, wobble(x, 760, 70, 70, 1, 2), { color: BLUE, w: 7 }), a + 3.5 + i * 0.35, 0.3, { sound: false });
      write(T(g, x, 790, n, { size: 90, color: BLUE }), a + 3.7 + i * 0.35, 0.2);
      if (i < 3) draw(P(g, `M${x + 90},760 L${x + 250},760 M${x + 220},735 L${x + 250},760 L${x + 220},785`, { color: GRAPHITE, w: 6 }), a + 3.8 + i * 0.35, 0.2, { sound: false });
    });
    t = a + 7.0;
  }
  const s7 = newScene('paper');
  t = TR.slideUp(s6, s7, t);

  /* 7 · Tu teléfono */
  setTool('marker');
  let mx = 380, my = 830, ms = 1.5;
  { const g = s7.g, a = t;
    write(T(g, 700, 190, 'Y al final, quizá mires', { size: 120 }), a + 0.2, 1.2);
    write(T(g, 700, 340, 'tu teléfono', { size: 190, color: RED }), a + 1.6, 1.0);
    write(T(g, 700, 480, 'de otra forma', { size: 120 }), a + 2.8, 0.9);
    // teléfono
    draw(P(g, 'M1300,260 L1620,260 Q1650,260 1650,290 L1650,1000 Q1650,1030 1620,1030 L1300,1030 Q1270,1030 1270,1000 L1270,290 Q1270,260 1300,260 Z', { color: INK, w: 9, fill: H('gray') }), a + 3.3, 0.8);
    draw(P(g, 'M1310,320 L1610,320 L1610,960 L1310,960 Z', { color: INK, w: 6, fill: H('blue') }), a + 4.0, 0.5, { sound: false });
    const sh = el('path', { d: 'M1460,700 L1460,610 Q1460,575 1490,575 Q1520,575 1520,610 L1520,700 Z M1490,555 m-24,0 a24,24 0 1,0 48,0 a24,24 0 1,0 -48,0', fill: INK, opacity: 0 }, g);
    tl.to(sh, { opacity: 0.9, duration: S(0.4) }, S(a + 4.6));
    tl.to(sh, { x: -40, duration: S(1.0), ease: 'sine.inOut', yoyo: true, repeat: 3 }, S(a + 4.6));
    const m = mover(g, mx, my, ms), c = mascot(m.g, 0, 0, 1);
    drawMascot(c, a + 3.4, 1.1); face(c, a + 4.8, 'wide', { mouth: 'o', emote: '?' }); wiggle(c, a + 5.4, 2);
    t = a + 7.5;
  }
  const s8 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.zoomInto(s7, s8, t, { x: mx + ms * (10 + 133.5), y: my + ms * 62 });

  /* 8 · Pero antes: ¿quién la contó y por qué? */
  setTool('chalk');
  { const g = s8.g, a = t;
    write(T(g, CX, 250, 'Pero antes...', { size: 150, color: CHALK_B }), a + 0.2, 1.0);
    write(T(g, CX, 480, 'tienes que saber', { size: 110, color: CHALK }), a + 1.5, 1.0);
    write(T(g, 560, 700, '¿quién la contó', { size: 170, color: CHALK_O }), a + 2.6, 1.2);
    write(T(g, 1280, 880, 'y por qué?', { size: 170, color: CHALK_O }), a + 4.0, 0.9);
    const m = mover(g, 1480, 500, 1.3), c = mascot(m.g, 0, 0, 1, { theme: null, ink: CHALK, ground: null, shadow: 'shadowW' });
    popMascot(c, a + 3.0); face(c, a + 3.4, 'determined', { mouth: 'flat', emote: '?' }); wink(c, a + 5.2);
    t = a + 9.0;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
