// Back to Top Button Functionality
// Handles scroll detection and smooth scrolling to top

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top-btn');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // Show button after scrolling 200px
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Handle click event for smooth scrolling
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Smooth scroll to the target (element with id="top")
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                // Fallback: scroll to top of page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}); 