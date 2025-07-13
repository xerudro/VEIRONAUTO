// --- Load car prices from JSON ---
let carPricesData = [];

function fetchCarPrices() {
  return fetch('assets/json/cars-and-prices.json')
    .then(res => res.json())
    .then(data => { carPricesData = data; })
    .catch(err => {
      console.error('Failed to load car prices:', err);
      carPricesData = [];
    });
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/(automat|manual|break|sportback|touring|sedan|combi|wagon|estate|van|4x4|limuzina|limousine|coupe|hatchback|sw|\+\d+|\d\+\d+)/g, '')
    .trim();
}

// Mapping between UI display names and JSON model names
const modelMap = {
  'AUDI A3 SPORTBACK': 'AUDI A3 AUTOMAT',
  'SKODA OCTAVIA BREAK': 'SKODA OCTAVIA BREAK AUTOMAT',
  'SKODA OCTAVIA SEDAN': 'SKODA OCTAVIA SEDAN AUTOMAT',
  'SKODA SCALA': 'SKODA SCALA AUTOMAT',
  'VW T-CROSS': 'VW T-CROSS AUTOMAT',
  // Adaugă aici restul dacă ai nevoie
};

function getCarPrice(model, days) {
  if (!carPricesData.length) return null;
  // Folosește mapping dacă există, altfel data-model
  const mappedModel = modelMap[model] || model;
  let car = carPricesData.find(c => c.model === mappedModel);
  if (!car) return null;
  let interval = '1-3';
  if (days >= 15) interval = '15-30';
  else if (days >= 8) interval = '8-14';
  else if (days >= 4) interval = '4-7';
  return car.prices[interval]?.eur || null;
}

// --- Main logic ---
document.addEventListener('DOMContentLoaded', function() {
  fetchCarPrices().then(() => {
    // Update all car cards with correct price
    const carCards = Array.from(document.querySelectorAll('.car-card'));
    const rentalDays = getRentalPeriod();

    carCards.forEach(card => {
      // Folosește main-title pentru mapping, altfel data-model
      let model = card.querySelector('.main-title')?.textContent.trim() || card.getAttribute('data-model');
      const price = getCarPrice(model, rentalDays);
      if (price !== null) {
        card.setAttribute('data-price', price);
        const priceElem = card.querySelector('.car-pricing, .price-per-day');
        if (priceElem) priceElem.textContent = formatPrice(price, currentLang) + (currentLang === 'en' ? ' /day' : ' /zi');
      } else {
        card.setAttribute('data-price', 0);
        const priceElem = card.querySelector('.car-pricing, .price-per-day');
        if (priceElem) priceElem.textContent = 'N/A';
      }
    });
    updateSummaryBar();
  });
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
    const selectedTransmission = Array.from(transmissionInputs).find(i => i.checked)?.value;
    const selectedClasses = Array.from(classInputs).filter(i => i.checked).map(i => i.value);
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
  let currentLang = 'en';
  const eurRate = (window.VeironConfig && window.VeironConfig.eurRate) ? window.VeironConfig.eurRate : 0.20;

  /*
   * Currency Conversion Policy:
   * - All base prices are stored in EUR.
   * - For Romanian language (RO), prices are displayed in RON, converted using eurRate from config.
   * - For English language (EN), prices are displayed in EUR (no conversion).
   * - Conversion formula: RON = EUR / eurRate
   * - eurRate should reflect the value: 1 RON = eurRate EUR (ex: eurRate = 0.20 means 1 RON = 0.20 EUR, so 1 EUR = 5 RON)
   * - When saving reservations, always store the price in EUR.
   */
  function formatPrice(price, lang) {
    if (lang === 'en') {
      return `${price.toFixed(2)} EUR`;
    } else {
      // Convert EUR to RON
      const ron = (price / eurRate).toFixed(2).replace('.', ',');
      return `${ron} RON`;
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

  // --- Car selection on card click: add .selected to .car-card ---
  carCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      document.querySelectorAll('.car-card.selected').forEach(el => el.classList.remove('selected'));
      card.classList.add('selected');
      selectedCard = card;
      updateSummaryBar();
    });
  });
  // (CSS: see .car-card.selected)

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

  // Inject mileage text into all .unlimited-km elements
  function updateMileageText(lang) {
    const mileageText = lang === 'en' ? '300 km included in the price' : '300 km incluse în preț';
    document.querySelectorAll('.car-card .unlimited-km').forEach(el => {
      // Remove all text nodes except the icon
      Array.from(el.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) el.removeChild(node);
      });
      // Add the mileage text
      el.appendChild(document.createTextNode(' ' + mileageText));
    });
  }
  // Call on load and on language switch
  updateMileageText(currentLang);

  // Add event listeners for language switcher
  const langRoBtn = document.getElementById('lang-ro');
  const langEnBtn = document.getElementById('lang-en');
  if (langRoBtn && langEnBtn) {
    langRoBtn.addEventListener('click', function() {
      currentLang = 'ro';
      updateAllPrices('ro');
      updateTexts('ro');
      updateMileageText('ro');
    });
    langEnBtn.addEventListener('click', function() {
      currentLang = 'en';
      updateAllPrices('en');
      updateTexts('en');
      updateMileageText('en');
    });
  }

  // Init prices and texts on load
  updateAllPrices(currentLang);
  updateTexts(currentLang);
}); 