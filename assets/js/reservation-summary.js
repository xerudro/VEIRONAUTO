// English Reservation Summary Logic
// Handles car selection data passing to additional services page

document.addEventListener('DOMContentLoaded', function() {
    // Add NEXT button functionality to pass selected car data
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Get current URL parameters
            const params = new URLSearchParams(window.location.search);
            
            // Get selected car information
            const selectedCar = document.querySelector('.car-card.selected');
            if (selectedCar) {
                const carName = selectedCar.querySelector('.car-card-header').textContent.split(' ')[0] + ' ' + selectedCar.querySelector('.car-card-header').textContent.split(' ')[1]; // Get first two words (brand + model)
                const carPrice = selectedCar.getAttribute('data-price');
                
                // Add car information to parameters
                params.set('car', carName);
                params.set('price', carPrice);
            }
            
            // Redirect to additional services page with all parameters
            window.location.href = 'additional-services.html?' + params.toString();
        });
    }
}); 