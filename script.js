/* =========================================================
   Mr. Sushi · Landing 2 "Raspa, gana y llévate a Neki"
   - Aparición suave de secciones
   - Formulario de código + tarjeta para raspar (demo)
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Aparición suave al hacer scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.remove('is-hidden'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) {
      // solo se ocultan los elementos que todavía no están en pantalla
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('is-hidden'); io.observe(el); }
    });
  }

  /* ---------- Formulario + tarjeta para raspar ---------- */
  // Código ganador de demostración: el que aparece en la boleta del prototipo.
  var CODIGO_GANADOR = '64DU2J';

  var form = document.getElementById('code-form');
  var input = document.getElementById('code');
  var msg = document.getElementById('code-msg');
  var modal = document.getElementById('scratch');
  var canvas = document.getElementById('scratch-canvas');
  var prize = document.getElementById('scratch-prize');
  var hint = document.getElementById('scratch-hint');
  var actions = document.getElementById('scratch-actions');
  var codeLabel = document.getElementById('scratch-code');
  var ctx = canvas.getContext('2d');
  var revealed = false, drawing = false, lastPoint = null, isWinner = false, lastFocus = null;

  input.addEventListener('input', function () {
    input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    input.removeAttribute('aria-invalid');
    msg.textContent = '';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var code = input.value.trim().toUpperCase();
    if (code.length !== 6) {
      input.setAttribute('aria-invalid', 'true');
      msg.textContent = 'El código debe tener 6 cifras. Lo encuentras en la parte inferior de tu boleta.';
      input.focus();
      return;
    }
    openScratch(code);
  });

  function openScratch(code) {
    isWinner = code === CODIGO_GANADOR;
    revealed = false;
    codeLabel.textContent = code;
    actions.hidden = true;
    actions.innerHTML = '';
    hint.textContent = 'Arrastra el dedo o el mouse sobre la tarjeta';
    prize.innerHTML = isWinner
      ? '<img src="assets/img/neki_hero.webp" alt=""><strong>¡Ganaste!</strong><span>Neki te espera. Te enviaremos un correo con los pasos para recogerlo.</span>'
      : '<img class="lose" src="assets/svg/h_tranqui_rojo.svg" alt="Si Neki se te escapó... ¡Tranquiiii!"><span>Haz un nuevo pedido de S/50 o más en la web, consigue otro código y vuelve a probar tu suerte.</span>';
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    canvas.classList.remove('done');
    requestAnimationFrame(paintFoil);
    modal.querySelector('.scratch__close').focus();
  }

  function closeScratch() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeScratch(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeScratch(); });

  // Lámina plateada con "MMMMMAKIS", igual que el GIF del mailing
  function paintFoil() {
    var r = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var W = r.width, H = r.height;
    ctx.globalCompositeOperation = 'source-over';
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#D2D2D6'); g.addColorStop(0.5, '#EFEFF1'); g.addColorStop(1, '#C9C9CE');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#A6A6AC';
    ctx.font = '800 ' + Math.round(W / 17) + 'px Archivo, Arial, sans-serif';
    var word = 'MMMMMAKIS', ww = ctx.measureText(word).width + W / 22, lh = W / 11;
    for (var row = 0, y = lh * 0.8; y < H + lh; row++, y += lh) {
      for (var x = (row % 2 ? -ww / 2 : 0); x < W; x += ww) ctx.fillText(word, x, y);
    }
    // pastilla central "RASPA AQUÍ"
    var pw = W * 0.62, ph = W * 0.15;
    ctx.fillStyle = '#111';
    roundRect(W / 2 - pw / 2, H / 2 - ph / 2, pw, ph, ph / 2); ctx.fill();
    ctx.fillStyle = '#F20D18';
    ctx.beginPath(); ctx.arc(W / 2 - pw / 2 + ph / 2 + 4, H / 2, ph * 0.36, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '800 ' + Math.round(W / 17) + 'px Archivo, Arial, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('RASPA AQUÍ', W / 2 + ph * 0.3, H / 2 + 1);
    ctx.font = Math.round(W / 18) + 'px sans-serif';
    ctx.fillText('☝', W / 2 - pw / 2 + ph / 2 + 4, H / 2 + 1);
    ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function pointFrom(e) {
    var r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function scratchLine(a, b) {
    var r = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = r.width * 0.11; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }
  canvas.addEventListener('pointerdown', function (e) {
    if (revealed) return;
    drawing = true; lastPoint = pointFrom(e);
    canvas.setPointerCapture(e.pointerId);
    scratchLine(lastPoint, { x: lastPoint.x + 0.1, y: lastPoint.y });
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!drawing || revealed) return;
    var p = pointFrom(e); scratchLine(lastPoint, p); lastPoint = p;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
    canvas.addEventListener(ev, function () { if (drawing) { drawing = false; checkProgress(); } });
  });

  function checkProgress() {
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    var clear = 0, total = 0;
    for (var i = 3; i < data.length; i += 64) { total++; if (data[i] === 0) clear++; }
    if (clear / total > 0.5) finish();
    else hint.textContent = 'Sigue raspando…';
  }
  function finish() {
    revealed = true;
    canvas.classList.add('done');
    hint.textContent = isWinner ? '¡Felicidades! Guarda tu código.' : '1 código = 1 raspada. Intentos ilimitados.';
    actions.innerHTML = isWinner
      ? '<a class="btn btn--red" href="https://www.mrsushi.pe/pedir" target="_blank" rel="noopener">Ir a Mr. Sushi</a>'
      : '<a class="btn btn--red" href="https://www.mrsushi.pe/pedir" target="_blank" rel="noopener">Ver la carta</a><button class="btn btn--ghost" type="button" data-again>Probar otro código</button>';
    actions.hidden = false;
    var again = actions.querySelector('[data-again]');
    if (again) again.addEventListener('click', function () { closeScratch(); input.value = ''; input.focus(); });
  }
})();
