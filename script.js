
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Mobiel navigatiemenu
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute(
    'aria-label',
    isOpen ? 'Menu sluiten' : 'Menu openen'
  );
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');

    if (menuButton) {
      menuButton.textContent = '☰';
      menuButton.setAttribute('aria-label', 'Menu openen');
    }
  });
});

// Diensten koppelen aan het offerteformulier
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.querySelector('select[name="service"]');

    if (select) {
      const wanted = link.dataset.service;
      const option = [...select.options].find(
        o => o.text.toLowerCase() === wanted.toLowerCase()
      );

      if (option) select.value = option.value;
    }
  });
});

// Automatisch het huidige jaartal tonen
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Formspree offerteformulier
const form = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    const originalButtonText = submitButton?.textContent;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Aanvraag verzenden...';
    }

    if (formStatus) {
      formStatus.textContent = 'Uw aanvraag wordt verzonden...';
    }

    try {
      const formData = new FormData(form);

      // Onderwerp van de e-mail die Sevenly ontvangt
      formData.append(
        '_subject',
        `Offerteaanvraag Sevenly - ${formData.get('service')}`
      );

      const response = await fetch(
        'https://formspree.io/f/xvkkgnqn',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Verzenden is niet gelukt.');
      }

      if (formStatus) {
        formStatus.textContent =
          'Bedankt! Uw offerteaanvraag is verzonden. Sevenly Transport & Logistics neemt uw aanvraag in behandeling.';
      }

      form.reset();

    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          'Verzenden is niet gelukt. Probeer het opnieuw of mail naar info@sevenlytransport.nl.';
      }

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          originalButtonText || 'Verstuur aanvraag';
      }
    }
  });
}

