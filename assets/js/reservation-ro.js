document.addEventListener('DOMContentLoaded', function() {
  // --- Helper: parse query string for rental period ---
  function getRentalPeriod() {
    const params = new URLSearchParams(window.location.search);
    const start = params.get('start');
    const end = params.get('end');
    if (!start || !end) return 1;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 1);
  }
  const rentalDays = getRentalPeriod();

  // --- Filtering logic ---
  const carCards = Array.from(document.querySelectorAll('.car-card'));
  const transmissionInputs = document.querySelectorAll('.cars-sidebar input[name="transmission"]');
  const classInputs = document.querySelectorAll('.cars-sidebar input[type="checkbox"]');

  function filterCars() {
    const selectedTransmission = Array.from(transmissionInputs).find(i => i.checked)?.nextSibling.textContent.trim().toLowerCase();
    const selectedClasses = Array.from(classInputs).filter(i => i.checked).map(i => i.nextSibling.textContent.trim().toLowerCase());
    carCards.forEach(card => {
      const transmission = card.getAttribute('data-transmission');
      const carClass = card.getAttribute('data-class');
      let show = true;
      if (selectedTransmission && transmission !== selectedTransmission) show = false;
      if (selectedClasses.length && !selectedClasses.includes(carClass)) show = false;
      card.style.display = show ? '' : 'none';
    });
  }
  transmissionInputs.forEach(i => i.addEventListener('change', filterCars));
  classInputs.forEach(i => i.addEventListener('change', filterCars));

  // --- Currency & Language Switch Logic ---
  let currentLang = 'ro';
  const eurRate = (window.VeironConfig && window.VeironConfig.eurRate) ? window.VeironConfig.eurRate : 0.20;

  function formatPrice(priceRon, lang) {
    if (lang === 'en') {
      const eur = (priceRon * eurRate).toFixed(2);
      return `${eur} EUR`;
    } else {
      return `${priceRon.toFixed(2).replace('.', ',')} RON`;
    }
  }

  // --- Car selection and cost calculation ---
  let selectedCard = null;

  function updateSummaryBar() {
    const summaryValue = document.querySelector('.summary-value');
    if (summaryValue && selectedCard) {
      const pricePerDay = parseFloat(selectedCard.getAttribute('data-price'));
      const total = Math.round(pricePerDay * rentalDays * 100) / 100;
      summaryValue.textContent = formatPrice(total, currentLang);
    } else if (summaryValue) {
      summaryValue.textContent = currentLang === 'en' ? '0 EUR' : '0 RON';
    }
  }

  carCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('car-select-btn')) {
        if (selectedCard) selectedCard.classList.remove('selected');
        card.classList.add('selected');
        selectedCard = card;
        updateSummaryBar();
      }
    });
  });

  function updateAllPrices(lang) {
    carCards.forEach(card => {
      const basePrice = parseFloat(card.getAttribute('data-price'));
      const priceElem = card.querySelector('.car-pricing');
      if (priceElem) {
        priceElem.textContent = formatPrice(basePrice, lang) + (lang === 'en' ? ' /day' : ' /zi');
      }
    });
    updateSummaryBar();
  }

  // --- Translation logic ---
  function updateTexts(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (window.TRANSLATIONS[lang][key]) {
        el.textContent = window.TRANSLATIONS[lang][key];
      }
    });
  }

  // Add event listeners for language switcher
  const langRoBtn = document.getElementById('lang-ro');
  const langEnBtn = document.getElementById('lang-en');
  if (langRoBtn && langEnBtn) {
    langRoBtn.addEventListener('click', function() {
      currentLang = 'ro';
      updateAllPrices('ro');
      updateTexts('ro');
    });
    langEnBtn.addEventListener('click', function() {
      currentLang = 'en';
      updateAllPrices('en');
      updateTexts('en');
    });
  }

  // Init prices and texts on load
  updateAllPrices(currentLang);
  updateTexts(currentLang);
}); 