'use strict';

const filters = [...document.querySelectorAll('[data-filter]')];
const groups = [...document.querySelectorAll('[data-category]')];
function filterServices(category, announce = true) {
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  groups.forEach(group => { group.hidden = group.dataset.category !== category; });
  const selected = filters.find(button => button.dataset.filter === category);
  if (announce) document.getElementById('filter-status').textContent = `Mostrando servicios de ${selected.textContent.toLowerCase()}.`;
}
filters.forEach(button => button.addEventListener('click', () => filterServices(button.dataset.filter)));
filterServices('barberia', false);

const opener = document.getElementById('load-booking');
const closer = document.getElementById('close-booking');
const consent = document.getElementById('booking-consent');
const container = document.getElementById('booking-frame-container');
const frame = document.getElementById('booking-frame');
const status = document.getElementById('booking-status');
let timeout;
opener.addEventListener('click', () => {
  consent.hidden = true;
  container.hidden = false;
  status.textContent = 'Cargando la agenda de Treatwell…';
  frame.src = frame.dataset.src;
  frame.focus();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    status.textContent = 'Si no ves la agenda, usa el enlace «Abrir en otra pestaña» que aparece debajo.';
  }, 12000);
});
frame.addEventListener('load', () => {
  if (!frame.getAttribute('src')) return;
  clearTimeout(timeout);
  // Cross-origin load is not proof of success; retain the visible fallback.
  status.textContent = 'Elige tu servicio dentro de la agenda. Si no se muestra, utiliza el enlace de respaldo inferior.';
});
closer.addEventListener('click', () => {
  clearTimeout(timeout);
  frame.removeAttribute('src');
  container.hidden = true;
  consent.hidden = false;
  opener.focus();
});
