// --- Load car prices from local array ---
// import { MODELE_MASINI_PRETURI } from './modele-masini-preturi.js';

let carPricesData = window.MODELE_MASINI_PRETURI || [];

function fetchCarPrices() {
  // Nu mai fac fetch, doar returnez Promise.resolve()
  return Promise.resolve();
}

function normalize(str) {
  return str?.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function getCarPrice(model, days) {
  if (!carPricesData.length) return null;
  const normModel = normalize(model);
  let car = carPricesData.find(c => normalize(c.model) === normModel);
  if (!car) {
    const first2 = normModel.split(' ').slice(0,2).join(' ');
    car = carPricesData.find(c => normalize(c.model).startsWith(first2));
  }
  if (!car) return null;
  let interval = '1-3';
  if (days >= 15) interval = '15-30';
  else if (days >= 8) interval = '8-14';
  else if (days >= 4) interval = '4-7';
  return car.prices[interval]?.ron || null;
}

// --- Main logic ---
document.addEventListener('DOMContentLoaded', function() {
  fetchCarPrices().then(() => {
    const carCards = Array.from(document.querySelectorAll('.car-card'));
    const rentalDays = getRentalPeriod();
    carCards.forEach(card => {
      let model = card.getAttribute('data-model');
      if (!model) {
        model = card.querySelector('.main-title')?.textContent.trim();
      }
      const price = getCarPrice(model, rentalDays);
      if (price !== null) {
        card.setAttribute('data-price', price);
        const priceElem = card.querySelector('.price-per-day');
        if (priceElem) priceElem.textContent = formatPrice(price, currentLang) + (currentLang === 'en' ? ' /day' : ' /zi');
      } else {
        card.setAttribute('data-price', 0);
        const priceElem = card.querySelector('.price-per-day');
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

  function filtreazaMasini() {
    const transmisieSelectata = Array.from(transmissionInputs).find(i => i.checked)?.value;
    const claseSelectate = Array.from(classInputs).filter(i => i.checked).map(i => i.value);
    carCards.forEach(card => {
      const transmisie = card.getAttribute('data-transmission');
      const clasa = card.getAttribute('data-class');
      let afiseaza = true;
      if (transmisieSelectata && transmisie !== transmisieSelectata) afiseaza = false;
      if (claseSelectate.length && !claseSelectate.includes(clasa)) afiseaza = false;
      card.style.display = afiseaza ? '' : 'none';
    });
    // Debug log
    console.log('Filtru transmisie:', transmisieSelectata, 'Filtru clase:', claseSelectate);
    console.log('Carduri afișate:', carCards.filter(c => c.style.display !== 'none').map(c => c.getAttribute('data-model')));
  }

  transmissionInputs.forEach(i => i.addEventListener('change', filtreazaMasini));
  classInputs.forEach(i => i.addEventListener('change', filtreazaMasini));

  // --- Currency & Language Switch Logic ---
  let currentLang = 'ro';
  const eurRate = (window.VeironConfig && window.VeironConfig.eurRate) ? window.VeironConfig.eurRate : 0.20;

  function formatPrice(priceEur, lang) {
    if (lang === 'en') {
      return `${priceEur.toFixed(2)} EUR`;
    } else {
      const eurRate = (window.VeironConfig && window.VeironConfig.eurRate) ? window.VeironConfig.eurRate : 5.07; // fallback to 5.07 if not set
      const ron = (priceEur * eurRate).toFixed(2).replace('.', ',');
      return `${ron} RON`;
    }
  }

  // --- Car selection and cost calculation (refactorizat pentru robustete) ---
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

  // Modific updateAllPrices să folosească updateSummaryBar
  function updateAllPrices(lang) {
    carCards.forEach(card => {
      const basePrice = parseFloat(card.getAttribute('data-price'));
      const priceElem = card.querySelector('.price-per-day');
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