// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Resalta la sección visible en el menú
const links = [...menu.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

// Formulario: abre tu correo con el mensaje listo
// Cambia este correo por el tuyo
const MI_CORREO = 'tu-correo@ejemplo.com';
const form = document.getElementById('form');
const msg = form.querySelector('.form-msg');

form.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const mensaje = form.mensaje.value.trim();
  if (!nombre || !mensaje) {
    msg.textContent = 'Completa tu nombre y el mensaje, por favor.';
    return;
  }
  const asunto = encodeURIComponent('Mensaje desde tu portafolio – ' + nombre);
  const cuerpo = encodeURIComponent(mensaje);
  window.location.href = `mailto:${MI_CORREO}?subject=${asunto}&body=${cuerpo}`;
  msg.textContent = 'Se abrirá tu aplicación de correo para enviar el mensaje.';
});

// Año del pie de página
document.getElementById('year').textContent = new Date().getFullYear();
