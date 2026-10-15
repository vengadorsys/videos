/* EL MITO DE LA CAVERNA — 1:00–2:00 INTRODUCCIÓN (pizarra, 16:9) · tiempos sincronizados a la locución (vo2.mp3, +0.3 s) */
bootVideo(async (V) => {
  const { el, P, T, H, PAL, INK, draw, write, pop, popIn, type, comic, stamp, wobble, mover, bubble, sfx,
          person, popPerson, image, newScene, show, BG, TR, setTool, tl, S } = V;
  const { orange: ORANGE, blue: BLUE, red: RED, purple: PURPLE, green: GREEN, chalk: CHALK, chalkO: CHALK_O, chalkB: CHALK_B, sepia: SEPIA, cream: CREAM, graphite: GRAPHITE } = PAL;
  const CX = 960;
  // busto-mascota (imagen) discreto: fundido suave, se mece y respira
  const bust = (g, x, y, h, at, life = 5) => {
    const w = h * 582 / 700, m = mover(g, x, y, 1);
    image(m.g, 'busto.png', -w / 2, -h, w, h);
    gsap.set(m.g, { opacity: 0 });
    tl.to(m.g, { opacity: 1, duration: S(0.7) }, S(at));
    tl.fromTo(m, { r: -1.2 }, { r: 1.2, duration: S(1.4), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil(life / 1.4)), immediateRender: false }, S(at));
    tl.fromTo(m, { y: y }, { y: y - 5, duration: S(1.0), ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil(life / 1.0)), immediateRender: false }, S(at));
    return m;
  };
  const arrow = (g, d, tip, at, o = {}) => { // línea + punta de flecha
    draw(P(g, d, { color: o.color || INK, w: 7 }), at, 0.4, { sound: false });
    const [x, y, dx, dy] = tip;
    draw(P(g, `M${x - dx * 30 + dy * 20},${y - dy * 30 - dx * 20} L${x},${y} L${x - dx * 30 - dy * 20},${y - dy * 30 + dx * 20}`, { color: o.color || INK, w: 7 }), at + 0.35, 0.2, { sound: false });
  };
  let t = 0;

  /* A · Busto de Platón (papel + plumón) */
  const s1 = newScene('paper'); show(s1, 0); setTool('marker');
  { const g = s1.g, a = 0.1; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    write(T(g, CX, 200, 'PLATÓN', { size: 180, color: ORANGE }), a + vo(0.9), 0.9);
    bust(g, CX, 1040, 680, a + vo(0), 8);
    write(T(g, 330, 470, 'Sócrates', { size: 120, color: BLUE }), a + vo(2.7), 0.9);
    write(T(g, 330, 570, 'su maestro', { size: 64, cls: 'kalam' }), a + vo(3.5), 0.6);
    arrow(g, 'M470,530 C560,560 620,620 700,680', [700, 680, 0.75, 0.66], a + vo(3.9));
    write(T(g, 1590, 470, 'Aristóteles', { size: 120, color: GREEN }), a + vo(4.9), 1.0);
    write(T(g, 1590, 570, 'su alumno', { size: 64, cls: 'kalam' }), a + vo(5.6), 0.6);
    arrow(g, 'M1230,700 C1330,640 1400,580 1450,540', [1450, 540, 0.7, -0.7], a + vo(5.4));
    t = 7.44;
  }
  const s2 = newScene('kraft');
  t = TR.slideUp(s1, s2, t);

  /* B · Mapa de Atenas (kraft + pincel) */
  setTool('brush');
  { const g = s2.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    const BR = '#2A1B10';
    draw(P(g, 'M120,230 L1260,230 L1260,990 L120,990 Z', { color: BR, w: 8, fill: H('cream') }), a + vo(6.5), 0.7, { sound: false });
    draw(P(g, 'M700,990 Q860,880 1020,900 Q1180,880 1260,780 L1260,990 Z', { color: BLUE, w: 7, fill: H('blue') }), a + vo(6.9), 0.6, { sound: false });
    write(T(g, 1000, 960, 'mar Egeo', { size: 54, color: BLUE, cls: 'kalam' }), a + vo(7.0), 0.5);
    draw(P(g, wobble(660, 640, 330, 220, 1.1, 2), { color: BR, w: 9 }), a + vo(7.5), 0.8);
    draw(P(g, 'M520,610 Q650,470 790,610 Z', { color: BR, w: 7, fill: H('sepia') }), a + vo(7.9), 0.4);
    [570, 620, 670, 720, 760].forEach((x, i) => draw(P(g, `M${x},520 L${x},585`, { color: BR, w: 8 }), a + vo(8.0) + i * 0.06, 0.15, { sound: false }));
    draw(P(g, 'M545,520 L775,520', { color: BR, w: 9 }), a + vo(8.0), 0.2, { sound: false });
    write(T(g, 660, 720, 'ATENAS', { size: 120, color: BR }), a + vo(7.8), 0.8);
    // La Academia: chincheta fuera de las murallas
    draw(P(g, 'M300,470 L300,350', { color: RED, w: 9 }), a + vo(7.1), 0.25, { sound: false });
    draw(P(g, 'M300,350 L400,380 L300,410 Z', { color: RED, w: 7, fill: H('red') }), a + vo(7.3), 0.25, { sound: false });
    write(T(g, 300, 320, 'La Academia', { size: 70, color: RED }), a + vo(7.1), 0.7);
    draw(P(g, 'M300,480 C340,560 400,600 440,640', { color: BR, w: 6 }), a + vo(8.4), 0.4, { sound: false });
    write(T(g, 1590, 330, 'La primera', { size: 78, color: BR }), a + vo(9.7), 0.7);
    write(T(g, 1590, 440, 'gran escuela', { size: 78, color: BR }), a + vo(10.4), 0.7);
    write(T(g, 1590, 550, 'de filosofía', { size: 78, color: BR }), a + vo(11.4), 0.7);
    write(T(g, 1590, 690, 'de Occidente', { size: 92, color: RED }), a + vo(12.7), 0.9);
    bust(g, 1690, 1040, 220, a + vo(12.0), 3);
    t = 17.29;
  }
  const s3 = newScene('sepia');
  t = TR.flip(s2, s3, t);

  /* C · Pergamino "La República" (pergamino + pluma) */
  setTool('quill');
  { const g = s3.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    write(T(g, CX, 190, 'Su obra más famosa', { size: 100, color: SEPIA }), a + vo(14.3), 1.8);
    draw(P(g, 'M520,300 L1400,300 L1400,860 L520,860 Z', { color: SEPIA, w: 8, fill: H('cream') }), a + vo(15.5), 0.8);
    draw(P(g, 'M470,300 Q430,330 470,360 Q510,330 470,300 Z M470,820 Q430,850 470,880 Q510,850 470,820 Z M1450,300 Q1490,330 1450,360 Q1410,330 1450,300 Z M1450,820 Q1490,850 1450,880 Q1410,850 1450,820 Z', { color: SEPIA, w: 7, fill: H('sepia') }), a + vo(16.3), 0.4, { sound: false });
    write(T(g, CX, 480, 'LA', { size: 110, color: SEPIA }), a + vo(17.3), 0.4);
    write(T(g, CX, 650, 'REPÚBLICA', { size: 200, color: RED }), a + vo(17.7), 1.1);
    draw(P(g, 'M640,700 C800,725 1100,690 1290,715', { color: SEPIA, w: 7 }), a + vo(18.8), 0.4);
    stamp(g, 1180, 800, 'Libro VII', a + vo(20.2), { color: RED, rot: -8, size: 84 });
    write(T(g, CX, 960, 'aquí aparece nuestra historia', { size: 86, color: PURPLE }), a + vo(22.3), 1.7);
    draw(P(g, 'M640,820 L640,740 Q720,690 800,740 L800,820', { color: SEPIA, w: 7 }), a + vo(23.2), 0.5, { sound: false });
    t = 30.31;
  }
  const s4 = newScene('chalk', { filter: 'url(#chalk)' });
  t = TR.iris(s3, s4, t, { x: 1180, y: 800 });

  /* D · Pero ojo (pizarrón + gis) */
  setTool('chalk');
  { const g = s4.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    write(T(g, CX, 300, 'Pero ojo:', { size: 190, color: CHALK_O }), a + vo(24.75), 1.0);
    write(T(g, CX, 520, 'no la cuenta', { size: 130, color: CHALK }), a + vo(25.8), 1.0);
    write(T(g, CX, 780, 'Platón', { size: 240, color: CHALK_B }), a + vo(26.7), 1.0);
    draw(P(g, 'M560,600 L1360,900', { color: RED, w: 16 }), a + vo(28.2), 0.3);
    draw(P(g, 'M1360,600 L560,900', { color: RED, w: 16 }), a + vo(28.45), 0.3);
    write(T(g, CX, 990, 'directamente', { size: 90, color: CHALK, cls: 'kalam' }), a + vo(27.5), 1.3);
    t = 36.35;
  }
  const s5 = newScene('graph');
  t = TR.flash(s4, s5, t);

  /* E · Sócrates y Glaucón (papel cuadriculado + lápiz) */
  setTool('pencil');
  { const g = s5.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    write(T(g, CX, 170, 'La cuenta su maestro', { size: 100, color: GRAPHITE }), a + vo(29.6), 1.7);
    write(T(g, CX, 320, 'Sócrates', { size: 180, color: BLUE }), a + vo(31.7), 1.0);
    write(T(g, CX, 430, 'como personaje', { size: 84, color: GRAPHITE, cls: 'kalam' }), a + vo(33.0), 1.4);
    write(T(g, CX, 520, 'dirigiéndose a un joven llamado', { size: 60, color: GRAPHITE, cls: 'kalam' }), a + vo(34.85), 2.0);
    const pm = mover(g, 560, 1030, 1.4), d = person(pm.g, 0, 0, 1, { shirt: '#F2E6C9', hair: '#9A948A', glasses: false, outline: true, ink: GRAPHITE });
    popPerson(d, a + vo(31.7));
    const pg = mover(g, 1380, 1030, 1.1), d2 = person(pg.g, 0, 0, 1, { shirt: 'teal', glasses: false });
    popPerson(d2, a + vo(37.0));
    arrow(g, 'M780,800 C950,740 1100,740 1230,790', [1230, 790, 0.9, 0.3], a + vo(35.2), { color: BLUE });
    write(T(g, 1380, 690, 'Glaucón', { size: 130, color: ORANGE }), a + vo(37.4), 0.9);
    t = 47.8;
  }
  const s6 = newScene('blue');
  t = TR.eraser(s5, s6, t);

  /* F · "Imagina esto…" (azul + globo de diálogo) */
  setTool(null);
  { const g = s6.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    pop(T(g, CX, 170, 'Sócrates le dice:', { size: 110, color: '#FFFFFF' }), a + vo(38.73));
    const bb = bubble(g, 380, 260, 1540, 700, 640, 800);
    popIn(bb, a + vo(40.2), { origin: '30% 100%' });
    type(T(bb, 460, 400, 'Imagina esto...', { size: 96, anchor: 'start', cls: 'code' }), a + vo(40.7), 1.3, ORANGE);
    type(T(bb, 460, 510, 'una imagen de nuestra naturaleza', { size: 52, anchor: 'start', cls: 'code', color: '#5B554C' }), a + vo(43.1), 2.4);
    type(T(bb, 460, 590, 'respecto a la educación', { size: 52, anchor: 'start', cls: 'code', color: '#5B554C' }), a + vo(46.0), 1.8);
    type(T(bb, 460, 660, 'y la ignorancia.', { size: 52, anchor: 'start', cls: 'code', color: RED }), a + vo(48.2), 1.4);
    const pm = mover(g, 640, 1040, 1.1), d = person(pm.g, 0, 0, 1, { shirt: '#F2E6C9', hair: '#9A948A', glasses: false, outline: false });
    popPerson(d, a + vo(39.0));
    const pg = mover(g, 1180, 1040, 0.85), d2 = person(pg.g, 0, 0, 1, { shirt: 'teal', glasses: false });
    popPerson(d2, a + vo(39.4), { sound: false });
    t = 62.2 - 8.0 + 8.0 - 0.0; t = 62.2 - 14.0 + 0.0 + 14.0; t = 62.2 + 0.0; t = (50.2 + 0.3) / 0.8 - 1.0;
  }
  const s7 = newScene('notebook');
  t = TR.slideUp(s6, s7, t);

  /* G · No es un cuento para dormir (cuaderno + lápiz) */
  setTool('pencil');
  { const g = s7.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    write(T(g, 760, 270, 'No es un cuento', { size: 140, color: GRAPHITE }), a + vo(50.3), 1.2);
    write(T(g, 760, 420, 'para dormir', { size: 140, color: GRAPHITE }), a + vo(51.2), 1.0);
    draw(P(g, 'M1500,230 A130,130 0 1,0 1500,500 A95,130 0 1,1 1500,230 Z', { color: GRAPHITE, w: 7, fill: H('yellow') }), a + vo(50.8), 0.5);
    comic(g, 1700, 250, 'zZz', a + vo(51.4), { color: BLUE, size: 110, life: 1.2 });
    draw(P(g, 'M1330,200 L1670,540', { color: RED, w: 16 }), a + vo(52.0), 0.25);
    draw(P(g, 'M1670,200 L1330,540', { color: RED, w: 16 }), a + vo(52.2), 0.25);
    write(T(g, CX, 700, 'Es una herramienta', { size: 140, color: ORANGE }), a + vo(52.4), 1.2);
    write(T(g, CX, 850, 'para entender', { size: 120, color: GRAPHITE }), a + vo(53.9), 1.0);
    t = 68.2;
  }
  const s8 = newScene(BG.sunburst('#E8874F', '#F29A62'));
  t = TR.flip(s7, s8, t);

  /* H · Cómo aprendemos, la verdad, lo que creemos saber (sunburst + texto cinético) */
  setTool(null);
  { const g = s8.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    pop(T(g, CX, 270, 'cómo aprendemos', { size: 150, color: CREAM, stroke: INK }), a + vo(55.04), { sound: 'pop' });
    pop(T(g, CX, 470, 'qué es la verdad', { size: 150, color: CREAM, stroke: INK }), a + vo(57.14), { rot: 4, sound: 'pop' });
    pop(T(g, CX, 680, 'y por qué cuesta tanto', { size: 100, color: '#FFFFFF', stroke: INK }), a + vo(58.75), { rot: -3, sound: 'pop' });
    pop(T(g, CX, 840, 'abandonar lo que', { size: 110, color: CREAM, stroke: INK }), a + vo(60.5), { rot: 2, sound: 'pop' });
    pop(T(g, CX, 990, 'creemos saber', { size: 140, color: '#FFE08A', stroke: INK }), a + vo(61.9), { rot: -2, sound: 'stamp' });
    bust(g, 1740, 1070, 200, a + vo(62.0), 2);
    t = 79.6;
  }
  const s9 = newScene(BG.solid('#2A2119'));
  t = TR.iris(s8, s9, t, { x: 960, y: 990 });

  /* I · Entrar a la cueva (cueva oscura + gis) */
  setTool('chalk');
  { const g = s9.g, a = t; const vo = w => Math.max(0.05, (w + 0.3) / 0.8 - a - 0.15);
    el('path', { d: 'M560,1030 L560,520 Q560,260 960,260 Q1360,260 1360,520 L1360,1030 Z', fill: '#0A0805' }, g);
    draw(P(g, 'M560,1030 L560,520 Q560,260 960,260 Q1360,260 1360,520 L1360,1030', { color: '#BFA27A', w: 12 }), a + vo(64.1), 1.2, { sound: false });
    draw(P(g, 'M400,1030 L1520,1030', { color: '#BFA27A', w: 8 }), a + vo(64.4), 0.6, { sound: false });
    write(T(g, 300, 480, 'Empecemos,', { size: 120, color: CHALK }), a + vo(64.19), 1.4);
    write(T(g, 300, 600, 'entonces', { size: 100, color: CHALK_B }), a + vo(65.1), 0.9);
    write(T(g, 1620, 480, 'por entrar', { size: 110, color: CHALK }), a + vo(65.9), 0.9);
    write(T(g, 1620, 640, 'a la cueva', { size: 150, color: CHALK_O }), a + vo(66.9), 1.1);
    bust(g, 960, 1030, 280, a + vo(65.2), 4);
    t = 86.4;
  }
  return t;
}, { speed: 0.8, width: 1920, height: 1080 });
