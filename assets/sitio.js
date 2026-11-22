// Casa Buztina · configuración y funciones compartidas por todas las páginas.

// Número de WhatsApp con lada (por ejemplo 528112345678) y dirección del taller.
var WHATSAPP = '528129063495';
var DIRECCION = 'Las Brisas, Monterrey, N.L.';

// Links de pago de Mercado Pago, uno por paquete. Mientras estén vacíos, el botón abre WhatsApp.
var MERCADOPAGO = {
  'torno-4': '', 'torno-8': '', 'torno-12': '',
  'manual-4': '', 'manual-8': '', 'manual-12': ''
};

document.addEventListener('DOMContentLoaded', function () {
  // Botones que abren WhatsApp con un mensaje ya escrito.
  if (WHATSAPP) {
    document.querySelectorAll('a[data-wa]').forEach(function (a) {
      a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(a.getAttribute('data-wa'));
    });
  }

  // Botones de pago con Mercado Pago.
  Object.keys(MERCADOPAGO).forEach(function (k) {
    var a = document.querySelector('a[data-mp="' + k + '"]');
    if (a && MERCADOPAGO[k]) { a.href = MERCADOPAGO[k]; a.removeAttribute('data-wa'); }
  });

  // Dirección en el pie de página.
  var d = document.getElementById('direccion');
  if (d && DIRECCION) { d.textContent = DIRECCION; d.hidden = false; }

  // Menú en celular.
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  // Carrusel de piezas de alumnas y alumnos.
  var slides = document.querySelectorAll('#piezas .slide');
  var contador = document.getElementById('contador');
  var boton = document.getElementById('pausa');
  if (slides.length && contador && boton) {
    var i = 0, n = slides.length;
    var pausado = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pad = function (k) { return k < 10 ? '0' + k : String(k); };
    var mostrar = function (k) {
      slides[i].style.opacity = 0; slides[i].setAttribute('aria-hidden', 'true');
      i = k; slides[i].style.opacity = 1; slides[i].removeAttribute('aria-hidden');
      contador.textContent = pad(i + 1) + ' / ' + pad(n);
    };
    var etiqueta = function () { boton.textContent = pausado ? 'Reanudar' : 'Pausar'; };
    etiqueta();
    boton.addEventListener('click', function () { pausado = !pausado; etiqueta(); });
    setInterval(function () { if (!pausado && !document.hidden) mostrar((i + 1) % n); }, 800);
  }
});
