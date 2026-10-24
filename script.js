const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
  menuButton.textContent = isOpen ? '×' : '☰';
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) { menuButton.textContent = '☰'; menuButton.setAttribute('aria-label', 'Menu openen'); }
}));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const select = document.querySelector('select[name="service"]');
  if (select) {
    const wanted = link.dataset.service;
    const option = [...select.options].find(o => o.text.toLowerCase() === wanted.toLowerCase());
    if (option) select.value = option.value;
  }
}));
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('quoteForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Offerteaanvraag Sevenly - ${data.get('service')}`;
  const fields = [
    ['Naam / bedrijfsnaam', data.get('name')],
    ['E-mailadres', data.get('email')],
    ['Telefoonnummer', data.get('phone') || 'Niet opgegeven'],
    ['Type transport', data.get('service')],
    ['Vertrekplaats', data.get('origin')],
    ['Bestemming', data.get('destination')],
    ['Gewenste datum', data.get('date') || 'Niet opgegeven'],
    ['Containertype', data.get('container') || 'Niet opgegeven'],
    ['Extra informatie', data.get('details') || 'Geen aanvullende informatie']
  ];
  const body = fields.map(([label, value]) => `${label}: ${value}`).join('\n');
  
  document.getElementById('formStatus').textContent = 'Uw e-mailprogramma wordt geopend met de aanvraag. Controleer de gegevens en verzend de e-mail daar.';
  
  // Jouw e-mailadres is hier ingevuld
  const recipient = 'info@sevenlytransport.nl';
  
  // De mail wordt nu direct naar jouw adres verzonden via het e-mailprogramma van de bezoeker
  window.location.href = `info@sevenlytransport.nl:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

