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
  // Replace this placeholder with Sevenly's real business email address before publishing.
  const recipient = 'https://formspree.io/f/xvkkgnqn';
  if (recipient.startsWith('https://formspree.io/f/xvkkgnqn')) {
    const mailto = `https://formspree.io/f/xvkkgnqn:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\nLet op: vul het e-mailadres van Sevenly in als ontvanger.')}`;
    window.location.href = https://formspree.io/f/xvkkgnqn;
    document.getElementById('formStatus').textContent = 'De aanvraag is klaargezet in uw e-mailprogramma. Vul het e-mailadres van Sevenly als ontvanger in en verzend de e-mail.';
  } else {
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
});


