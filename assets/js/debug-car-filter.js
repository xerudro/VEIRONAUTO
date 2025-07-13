// Debugging for car filter logic
// Log every filter change and visible/hidden cards

document.addEventListener('DOMContentLoaded', function() {
  const carCards = Array.from(document.querySelectorAll('.car-card'));
  const transmissionInputs = document.querySelectorAll('.cars-sidebar input[name="transmission"]');
  const classInputs = document.querySelectorAll('.cars-sidebar input[type="checkbox"]');

  function logFilterState() {
    const selectedTransmission = Array.from(transmissionInputs).find(i => i.checked)?.nextSibling.textContent.trim().toLowerCase();
    const selectedClasses = Array.from(classInputs).filter(i => i.checked).map(i => i.nextSibling.textContent.trim().toLowerCase());
    console.log('[DEBUG] Filter changed: transmission =', selectedTransmission, ', classes =', selectedClasses);
    carCards.forEach(card => {
      const typeClass = Array.from(card.classList).find(cls => cls.startsWith('car-type-'));
      const transmission = card.getAttribute('data-transmission');
      const visible = card.style.display !== 'none';
      console.log('[DEBUG] Card:', card.getAttribute('data-model'), '| type:', typeClass, '| transmission:', transmission, '| visible:', visible);
    });
  }

  transmissionInputs.forEach(i => i.addEventListener('change', logFilterState));
  classInputs.forEach(i => i.addEventListener('change', logFilterState));

  // Initial log
  logFilterState();
}); 