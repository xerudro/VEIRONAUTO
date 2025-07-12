/**
 * Veiron Auto - Configuration File
 * Author: Veiron Auto Development Team
 * Description: Central configuration for the website
 * Last Updated: June 15, 2025
 */

const VeironConfig = {
    // Company Information
    company: {
        name: 'Veiron Auto',
        slogan: 'Simplu Si Rapid',
        description: 'Servicii de inchiriere auto rapide si simple',
        
        // Contact Information
        contact: {
            email: 'contact@veironauto.ro',
            phone: '+40123456789',
            whatsapp: '+40123456789',
            address: 'Strada Exemplu Nr. 123, Bucuresti, Romania'
        },
        
        // Business Hours
        hours: {
            monday: '08:00 - 18:00',
            tuesday: '08:00 - 18:00',
            wednesday: '08:00 - 18:00',
            thursday: '08:00 - 18:00',
            friday: '08:00 - 18:00',
            saturday: '09:00 - 16:00',
            sunday: '10:00 - 14:00'
        }
    },

    // Available Locations
    locations: [
        { value: 'satu-mare', label: 'Satu Mare', coordinates: [47.8017, 22.8572] },
        { value: 'baia-mare', label: 'Baia Mare', coordinates: [47.6572, 23.5881] },
        { value: 'oradea', label: 'Oradea', coordinates: [47.0722, 21.9217] },
        { value: 'cluj-napoca', label: 'Cluj-Napoca', coordinates: [46.7833, 23.6] },
        { value: 'debrecen-airport', label: 'Debrecen - Airport', coordinates: [47.4889, 21.6153] },
        { value: 'budapesta-airport', label: 'Budapesta - Airport', coordinates: [47.4369, 19.2556] }
    ],

    // Available Time Slots
    timeSlots: [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ],

    // Form Validation Rules
    validation: {
        minRentalDays: 1,
        maxRentalDays: 90,
        minDriverAge: 21,
        minLicenseYears: 1,
        advanceBookingDays: 0, // Can book same day
        maxAdvanceBookingDays: 365
    },

    // API Endpoints (for future use)
    api: {
        baseUrl: 'https://api.veironauto.ro',
        endpoints: {
            booking: '/api/bookings',
            cars: '/api/cars',
            locations: '/api/locations',
            contact: '/api/contact'
        }
    },

    // Theme Colors
    theme: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#52c41a',
        danger: '#ff4d4f',
        warning: '#faad14',
        info: '#1890ff',
        light: '#f8f9fa',
        dark: '#343a40'
    },    // Feature Flags
    features: {
        enableWhatsApp: true,
        enableGoogleMaps: true,
        enableEmailNotifications: true,
        enableSMSNotifications: false,
        enablePaymentGateway: false, // For future implementation
        enableMultiLanguage: false, // For future implementation
        enableUserAccounts: false, // For future implementation
        enableSwiper: true, // Swiper.js carousel functionality
        enableLazyLoading: true, // Image lazy loading
        enablePWA: false // Progressive Web App features
    },

    // Swiper Configuration
    swiper: {
        // Default settings for all swipers
        defaults: {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            a11y: {
                enabled: true,
            }
        },

        // Specific configurations for different swiper types
        heroBanner: {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            speed: 1000
        },

        carGallery: {
            spaceBetween: 20,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            thumbs: {
                enabled: true,
                spaceBetween: 10,
                slidesPerView: 4
            }
        },

        featuredCars: {
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        },

        testimonials: {
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 }
            }
        }
    },

    // Content for future swiper implementations
    content: {
        // Hero banner slides content
        heroBanners: [
            {
                title: 'Inchiriaza Masina Perfecta',
                subtitle: 'Alege din gama noastra variata de vehicule',
                image: 'assets/images/hero/hero-slide-1.jpg',
                cta: 'Vezi Masini',
                link: '#cars'
            },
            {
                title: 'Livrare Gratuita',
                subtitle: 'In limitele orasului pentru confortul tau',
                image: 'assets/images/hero/hero-slide-2.jpg',
                cta: 'Afla Mai Mult',
                link: '#services'
            },
            {
                title: 'Asistenta 24/7',
                subtitle: 'Suntem aici pentru tine oricand',
                image: 'assets/images/hero/hero-slide-3.jpg',
                cta: 'Contact',
                link: '#contact'
            }
        ],

        // Sample testimonials
        testimonials: [
            {
                text: 'Serviciu excelent! Masina era curata si in stare perfecta. Recomand cu incredere!',
                author: 'Maria Popescu',
                role: 'Client',
                avatar: 'assets/images/testimonials/client-1.jpg',
                rating: 5
            },
            {
                text: 'Foarte profesionali si punctuali. Livrarea a fost facuta la timp si fara probleme.',
                author: 'Alexandru Ionescu',
                role: 'Client',
                avatar: 'assets/images/testimonials/client-2.jpg',
                rating: 5
            },
            {
                text: 'Preturile sunt foarte competitive si calitatea serviciului este de top!',
                author: 'Elena Radu',
                role: 'Client',
                avatar: 'assets/images/testimonials/client-3.jpg',
                rating: 5
            }
        ]
    },

    // SEO Settings
    seo: {
        keywords: 'inchirieri auto, car rental, Bucuresti, masini de inchiriat, Veiron Auto',
        ogImage: 'assets/images/og-image.jpg',
        favicon: 'assets/images/favicon.ico'
    },

    // Email Templates (for PHP implementation)
    emailTemplates: {
        bookingConfirmation: {
            subject: 'Confirmare Rezervare - Veiron Auto',
            template: 'booking-confirmation.html'
        },
        adminNotification: {
            subject: 'Rezervare Noua - Veiron Auto',
            template: 'admin-notification.html'
        }
    },

    // Development Settings
    development: {
        debug: true,
        logLevel: 'info',
        enableConsoleLog: true
    },

    eurRate: 0.20, // 1 RON = 0.20 EUR
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VeironConfig;
}

// Make it available globally in the browser
if (typeof window !== 'undefined') {
    window.VeironConfig = VeironConfig;
}
