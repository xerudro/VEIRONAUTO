/**
 * Veiron Auto - Booking Form JavaScript
 * Author: Veiron Auto Development Team
 * Description: Handles booking form functionality, validation, and interactions
 * Dependencies: Font Awesome (for icons)
 * Last Updated: June 15, 2025
 */

class BookingForm {
    constructor() {
        this.form = document.getElementById('bookingForm');
        if (this.form) {
            this.init();
        }
    }

    /**
     * Initialize the booking form
     */
    init() {
        this.setDefaultDates();
        this.updateLocationsFromConfig();
        this.bindEvents();
        this.initializeAnimations();
        this.debugInfo();
    }

    /**
     * Set default dates for pickup and dropoff
     */
    setDefaultDates() {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Set minimum dates
        const pickupDateInput = document.getElementById('pickupDate');
        const dropoffDateInput = document.getElementById('dropoffDate');
        if (pickupDateInput && dropoffDateInput) {
            pickupDateInput.min = today;
            dropoffDateInput.min = today;
            pickupDateInput.value = today;
            dropoffDateInput.value = tomorrow.toISOString().split('T')[0];
        }
    }

    /**
     * Update locations from config file
     */
    updateLocationsFromConfig() {
        try {
            if (window.VeironConfig?.locations) {
                const pickupSelect = document.getElementById('pickupLocation');
                if (pickupSelect) {
                    // Clear existing options except the first one
                    const firstOption = pickupSelect.querySelector('option[value=""]');
                    pickupSelect.innerHTML = '';
                    if (firstOption) {
                        pickupSelect.appendChild(firstOption);
                    }
                    
                    // Add new options from config
                    const locations = window.VeironConfig?.locations || [
                        { value: 'satu-mare', label: 'Satu Mare' },
                        { value: 'baia-mare', label: 'Baia Mare' },
                        { value: 'oradea', label: 'Oradea' },
                        { value: 'cluj-napoca', label: 'Cluj-Napoca' },
                        { value: 'debrecen-airport', label: 'Debrecen - Airport' },
                        { value: 'budapesta-airport', label: 'Budapesta - Airport' }
                    ];
                    
                    locations.forEach(location => {
                        const option = document.createElement('option');
                        option.value = location.value;
                        option.textContent = location.label;
                        pickupSelect.appendChild(option);
                    });
                    
                    if (window.VeironConfig?.development?.debug) {
                        console.log('Locations updated from config:', window.VeironConfig.locations);
                    }
                }
            } else {
                if (window.VeironConfig?.development?.debug) {
                    console.warn('No locations found in config, using default locations');
                }
            }
        } catch (error) {
            console.error('Error updating locations from config:', error);
        }
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Different dropoff location toggle
        document.getElementById('differentDropoff').addEventListener('change', (e) => {
            this.toggleDropoffLocation(e.target.checked);
        });

        // Pickup date change handler
        document.getElementById('pickupDate').addEventListener('change', (e) => {
            this.handlePickupDateChange(e.target.value);
        });

        // Input validation on blur
        this.addInputValidation();
    }

    /**
     * Handle different dropoff location toggle
     * @param {boolean} isChecked - Whether the checkbox is checked
     */
    toggleDropoffLocation(isChecked) {
        const existingGroup = document.getElementById('dropoffLocationGroup');
        
        if (isChecked && !existingGroup) {
            this.createDropoffLocationSelect();
        } else if (!isChecked && existingGroup) {
            // Add fade-out animation before removing
            existingGroup.style.opacity = '0';
            existingGroup.style.transform = 'translateY(-10px)';
            existingGroup.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                existingGroup.remove();
            }, 300);
        }
    }

    /**
     * Create dropoff location select element
     */
    createDropoffLocationSelect() {
        const dropoffLocationGroup = document.createElement('div');
        dropoffLocationGroup.className = 'col-12';
        dropoffLocationGroup.id = 'dropoffLocationGroup';
        
        // Get locations from config or use default ones
        const locations = window.VeironConfig?.locations || [
            { value: 'satu-mare', label: 'Satu Mare' },
            { value: 'baia-mare', label: 'Baia Mare' },
            { value: 'oradea', label: 'Oradea' },
            { value: 'cluj-napoca', label: 'Cluj-Napoca' },
            { value: 'debrecen-airport', label: 'Debrecen - Airport' },
            { value: 'budapesta-airport', label: 'Budapesta - Airport' }
        ];
        
        // Create options HTML
        const optionsHTML = locations.map(location => 
            `<option value="${location.value}">${location.label}</option>`
        ).join('');
        
        dropoffLocationGroup.innerHTML = `
            <label for="dropoffLocation" class="form-label fw-semibold">Locatia de returnare</label>
            <select id="dropoffLocation" name="dropoffLocation" class="form-select form-select-lg" required>
                <option value="">Selecteaza locatia de returnare</option>
                ${optionsHTML}
            </select>
        `;

        // Insert after the pickup location group
        const pickupLocationGroup = document.getElementById('differentDropoff').closest('.col-12');
        pickupLocationGroup.after(dropoffLocationGroup);

        // Add fade-in animation
        dropoffLocationGroup.style.opacity = '0';
        dropoffLocationGroup.style.transform = 'translateY(-10px)';
        dropoffLocationGroup.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            dropoffLocationGroup.style.opacity = '1';
            dropoffLocationGroup.style.transform = 'translateY(0)';
        }, 50);
        
        // Add validation for the new field
        const dropoffLocationSelect = document.getElementById('dropoffLocation');
        dropoffLocationSelect.addEventListener('blur', () => this.validateField(dropoffLocationSelect));
        dropoffLocationSelect.addEventListener('change', () => this.validateField(dropoffLocationSelect));
    }

    /**
     * Handle pickup date change
     * @param {string} pickupDate - Selected pickup date
     */
    handlePickupDateChange(pickupDate) {
        const pickupDateObj = new Date(pickupDate);
        const nextDay = new Date(pickupDateObj);
        nextDay.setDate(nextDay.getDate() + 1);
        
        const dropoffDateInput = document.getElementById('dropoffDate');
        dropoffDateInput.min = nextDay.toISOString().split('T')[0];
        
        // Update dropoff date if it's before or equal to pickup date
        const dropoffDate = new Date(dropoffDateInput.value);
        if (dropoffDate <= pickupDateObj) {
            dropoffDateInput.value = nextDay.toISOString().split('T')[0];
        }
    }

    /**
     * Add input validation
     */
    addInputValidation() {
        const requiredFields = ['pickupLocation', 'pickupDate', 'pickupTime', 'dropoffDate', 'dropoffTime'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('change', () => this.validateField(field));
            }
        });
    }

    /**
     * Validate individual field
     * @param {HTMLElement} field - Field to validate
     */
    validateField(field) {
        const isValid = field.value.trim() !== '';
        
        if (isValid) {
            field.style.borderColor = '#52c41a';
            field.style.boxShadow = '0 0 0 3px rgba(82, 196, 26, 0.1)';
        } else {
            field.style.borderColor = '#ff4d4f';
            field.style.boxShadow = '0 0 0 3px rgba(255, 77, 79, 0.1)';
        }

        setTimeout(() => {
            if (field.style.borderColor !== '#ff4d4f') {
                field.style.borderColor = '#e0e0e0';
                field.style.boxShadow = 'none';
            }
        }, 2000);
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showNotification('Te rugam sa completezi toate campurile obligatorii.', 'error');
            return;
        }

        if (!this.validateDriverLicense()) {
            this.showNotification('Trebuie sa confirmi ca ai permisul de conducere de cel putin 1 an.', 'error');
            return;
        }

        this.submitForm();
    }

    /**
     * Validate entire form
     * @returns {boolean} - Whether form is valid
     */
    validateForm() {
        const requiredFields = ['pickupLocation', 'pickupDate', 'pickupTime', 'dropoffDate', 'dropoffTime'];
        let isValid = true;
        
        // Check if different dropoff is selected and validate that too
        if (document.getElementById('differentDropoff').checked) {
            const dropoffLocation = document.getElementById('dropoffLocation');
            if (dropoffLocation) {
                requiredFields.push('dropoffLocation');
            }
        }
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                field.style.borderColor = '#ff4d4f';
                field.style.boxShadow = '0 0 0 3px rgba(255, 77, 79, 0.1)';
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate driver license checkbox
     * @returns {boolean} - Whether license is confirmed
     */
    validateDriverLicense() {
        return document.getElementById('hasLicense').checked;
    }

    /**
     * Submit the form
     */
    submitForm() {
        const btn = document.querySelector('.choose-car-btn');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 10px;"></i>Se incarca...';
        btn.disabled = true;

        // Collect form data
        const formData = this.collectFormData();
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            console.log('Booking data:', formData);
            this.showNotification('Rezervarea ta a fost initializata! Vei fi redirectionat catre selectia de masini.', 'success');
            
            // Here you would normally redirect to the car selection page
            // window.location.href = 'select-car.html';
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }

    /**
     * Collect all form data
     * @returns {Object} - Form data object
     */
    collectFormData() {
        const formData = {
            pickupLocation: document.getElementById('pickupLocation').value,
            pickupDate: document.getElementById('pickupDate').value,
            pickupTime: document.getElementById('pickupTime').value,
            dropoffDate: document.getElementById('dropoffDate').value,
            dropoffTime: document.getElementById('dropoffTime').value,
            differentDropoff: document.getElementById('differentDropoff').checked,
            hasLicense: document.getElementById('hasLicense').checked,
            travelAbroad: document.getElementById('travelAbroad').checked,
            timestamp: new Date().toISOString()
        };

        // Add dropoff location if different
        if (formData.differentDropoff) {
            const dropoffLocation = document.getElementById('dropoffLocation');
            if (dropoffLocation) {
                formData.dropoffLocation = dropoffLocation.value;
            }
        }

        return formData;
    }

    /**
     * Show notification to user
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    }

    /**
     * Get notification icon based on type
     * @param {string} type - Notification type
     * @returns {string} - Icon class
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || icons.info;
    }

    /**
     * Get notification color based on type
     * @param {string} type - Notification type
     * @returns {string} - Color value
     */
    getNotificationColor(type) {
        const colors = {
            success: '#52c41a',
            error: '#ff4d4f',
            info: '#1890ff',
            warning: '#faad14'
        };
        return colors[type] || colors.info;
    }

    /**
     * Initialize animations
     */
    initializeAnimations() {
        // Add CSS for animations if not already present
        if (!document.querySelector('#booking-animations')) {
            const style = document.createElement('style');
            style.id = 'booking-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Initialize intersection observer for animations
        this.initIntersectionObserver();
    }

    /**
     * Initialize intersection observer for scroll animations
     */
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe booking form for animation
        const bookingForm = document.querySelector('.booking-form');
        if (bookingForm) {
            bookingForm.classList.add('fade-in');
            observer.observe(bookingForm);
        }
    }

    /**
     * Debug information for troubleshooting
     */
    debugInfo() {
        if (window.VeironConfig?.development?.debug) {
            console.log('BookingForm initialized');
            console.log('Available locations:', window.VeironConfig?.locations);
            console.log('Form element:', this.form);
        }
    }
}

/**
 * Utility functions
 */
const BookingUtils = {
    /**
     * Format date for display
     * @param {string} dateString - Date string
     * @returns {string} - Formatted date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Calculate rental duration
     * @param {string} startDate - Start date
     * @param {string} endDate - End date
     * @returns {number} - Duration in days
     */
    calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * Validate Romanian phone number
     * @param {string} phone - Phone number
     * @returns {boolean} - Whether phone is valid
     */
    validatePhone(phone) {
        const phoneRegex = /^(\+40|0040|0)[23789]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    /**
     * Validate email address
     * @param {string} email - Email address
     * @returns {boolean} - Whether email is valid
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Initialize booking form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookingForm();
});

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// To Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const toTopBtn = document.getElementById('toTopBtn');
    
    // Show/hide button based on scroll position
    function toggleToTopButton() {
        if (window.pageYOffset > 300) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleToTopButton);
    
    // Initial check
    toggleToTopButton();
});

// Header Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Language switcher functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Here you can add language switching logic
            const selectedLang = btn.dataset.lang;
            console.log('Language switched to:', selectedLang);
            // You can implement actual language switching here
        });
    });
    
    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to set active nav based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Listen for scroll events to update active navigation
    window.addEventListener('scroll', updateActiveNav);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
});

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

// --- Language switcher logic ---
document.addEventListener('DOMContentLoaded', function() {
    const langRoBtn = document.getElementById('lang-ro');
    const langEnBtn = document.getElementById('lang-en');
    let currentLang = 'ro';
    if (langRoBtn && langEnBtn) {
        langRoBtn.addEventListener('click', function() {
            currentLang = 'ro';
            updateTexts('ro');
        });
        langEnBtn.addEventListener('click', function() {
            currentLang = 'en';
            updateTexts('en');
        });
    }
    updateTexts(currentLang);
});
