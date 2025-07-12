/**
 * Veiron Auto - Swiper Components
 * Author: Veiron Auto Development Team
 * Description: Reusable Swiper configurations and components
 * Dependencies: Swiper.js
 * Last Updated: June 15, 2025
 */

class VeironSwiper {
    constructor() {
        this.swipers = [];
        this.defaultConfig = {
            // Default Swiper configuration
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
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        };
    }

    /**
     * Initialize hero banner swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initHeroBanner(selector = '.hero-swiper', customConfig = {}) {
        const config = {
            ...this.defaultConfig,
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            },
            on: {
                slideChange: function () {
                    this.updateHeroContent(this.activeIndex);
                }.bind(this)
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'hero', instance: swiper });
        return swiper;
    }

    /**
     * Initialize car gallery swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initCarGallery(selector = '.car-gallery-swiper', customConfig = {}) {
        const config = {
            ...this.defaultConfig,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: '.car-thumbs-swiper'
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                }
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'carGallery', instance: swiper });
        return swiper;
    }

    /**
     * Initialize car thumbnails swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initCarThumbs(selector = '.car-thumbs-swiper', customConfig = {}) {
        const config = {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 10
                }
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'carThumbs', instance: swiper });
        return swiper;
    }

    /**
     * Initialize featured cars swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initFeaturedCars(selector = '.featured-cars-swiper', customConfig = {}) {
        const config = {
            ...this.defaultConfig,
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'featuredCars', instance: swiper });
        return swiper;
    }

    /**
     * Initialize testimonials swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initTestimonials(selector = '.testimonials-swiper', customConfig = {}) {
        const config = {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 40
                }
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'testimonials', instance: swiper });
        return swiper;
    }

    /**
     * Initialize partners/brands swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initPartners(selector = '.partners-swiper', customConfig = {}) {
        const config = {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 25
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 30
                }
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'partners', instance: swiper });
        return swiper;
    }

    /**
     * Initialize fleet showcase swiper
     * @param {string} selector - CSS selector for swiper container
     * @param {Object} customConfig - Custom configuration options
     */
    initFleetShowcase(selector = '.fleet-swiper', customConfig = {}) {
        const config = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'slide',
            speed: 800,
            pagination: {
                el: '.fleet-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.fleet-next',
                prevEl: '.fleet-prev',
            },
            scrollbar: {
                el: '.fleet-scrollbar',
                draggable: true,
                hide: false,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            mousewheel: {
                enabled: false,
            },
            on: {
                slideChange: function () {
                    // Add any custom slide change logic here
                    this.updateFleetCounter(this.activeIndex);
                }.bind(this)
            },
            ...customConfig
        };

        const swiper = new Swiper(selector, config);
        this.swipers.push({ name: 'fleetShowcase', instance: swiper });
        return swiper;
    }

    /**
     * Update hero content based on active slide
     * @param {number} activeIndex - Index of active slide
     */
    updateHeroContent(activeIndex) {
        // This method can be customized based on your hero content structure
        const heroContents = document.querySelectorAll('.hero-content-item');
        heroContents.forEach((content, index) => {
            if (index === activeIndex) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    /**
     * Update fleet counter display
     * @param {number} activeIndex - Index of active slide
     */
    updateFleetCounter(activeIndex) {
        const fleetTypes = [
            'Masini Economice',
            'Masini Premium', 
            'SUV & Family',
            'Masini Sport',
            'Masini Electrice'
        ];
        
        // Update any fleet counter display if it exists
        const fleetCounter = document.querySelector('.fleet-counter');
        if (fleetCounter && fleetTypes[activeIndex]) {
            fleetCounter.textContent = `${activeIndex + 1} / ${fleetTypes.length} - ${fleetTypes[activeIndex]}`;
        }
    }

    /**
     * Get swiper instance by name
     * @param {string} name - Name of the swiper
     * @returns {Object|null} - Swiper instance or null
     */
    getInstance(name) {
        const swiperObj = this.swipers.find(s => s.name === name);
        return swiperObj ? swiperObj.instance : null;
    }

    /**
     * Destroy all swiper instances
     */
    destroyAll() {
        this.swipers.forEach(swiperObj => {
            if (swiperObj.instance && typeof swiperObj.instance.destroy === 'function') {
                swiperObj.instance.destroy(true, true);
            }
        });
        this.swipers = [];
    }

    /**
     * Pause all autoplay
     */
    pauseAllAutoplay() {
        this.swipers.forEach(swiperObj => {
            if (swiperObj.instance && swiperObj.instance.autoplay) {
                swiperObj.instance.autoplay.stop();
            }
        });
    }

    /**
     * Resume all autoplay
     */
    resumeAllAutoplay() {
        this.swipers.forEach(swiperObj => {
            if (swiperObj.instance && swiperObj.instance.autoplay) {
                swiperObj.instance.autoplay.start();
            }
        });
    }
}

/**
 * Swiper HTML Templates
 * Ready-to-use HTML structures for different swiper types
 */
const SwiperTemplates = {
    /**
     * Hero Banner Template
     */
    heroBanner: `
        <div class="swiper hero-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="hero-slide-content">
                        <h2>Slide 1 Title</h2>
                        <p>Slide description</p>
                        <button class="cta-button">Call to Action</button>
                    </div>
                </div>
                <!-- Add more slides as needed -->
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    `,

    /**
     * Car Gallery Template
     */
    carGallery: `
        <div class="car-gallery-container">
            <div class="swiper car-gallery-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="car-image-1.jpg" alt="Car Image">
                    </div>
                    <!-- Add more slides as needed -->
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="swiper car-thumbs-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="car-thumb-1.jpg" alt="Car Thumbnail">
                    </div>
                    <!-- Add more thumbnails as needed -->
                </div>
            </div>
        </div>
    `,

    /**
     * Featured Cars Template
     */
    featuredCars: `
        <div class="swiper featured-cars-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="car-card">
                        <img src="featured-car-1.jpg" alt="Featured Car">
                        <div class="car-info">
                            <h3>Car Name</h3>
                            <p class="car-price">€50/day</p>
                            <button class="book-now-btn">Book Now</button>
                        </div>
                    </div>
                </div>
                <!-- Add more car cards as needed -->
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    `,

    /**
     * Testimonials Template
     */
    testimonials: `
        <div class="swiper testimonials-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <p>"Great service and excellent cars!"</p>
                        </div>
                        <div class="testimonial-author">
                            <img src="customer-1.jpg" alt="Customer">
                            <div class="author-info">
                                <h4>Customer Name</h4>
                                <span>Customer Title</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Add more testimonials as needed -->
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    `,

    /**
     * Fleet Showcase Template
     */
    fleetShowcase: `
        <div class="fleet-showcase">
            <div class="swiper fleet-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="fleet-slide">
                            <img src="fleet-image-placeholder.jpg" alt="Fleet Category" class="fleet-image">
                            <div class="fleet-overlay">
                                <div class="fleet-content">
                                    <h3>Fleet Category</h3>
                                    <p>Category description</p>
                                    <div class="fleet-stats">
                                        <span><i class="fas fa-car"></i> 10+ Vehicule</span>
                                        <span><i class="fas fa-euro-sign"></i> De la 30€/zi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-next fleet-next"></div>
                <div class="swiper-button-prev fleet-prev"></div>
                <div class="swiper-pagination fleet-pagination"></div>
                <div class="swiper-scrollbar fleet-scrollbar"></div>
            </div>
            <div class="fleet-info-banner">
                <div class="fleet-info-content">
                    <div class="fleet-stat-item">
                        <i class="fas fa-car"></i>
                        <div>
                            <span class="stat-number">40+</span>
                            <span class="stat-label">Vehicule Disponibile</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

// Global instance for easy access
let veironSwiper;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    veironSwiper = new VeironSwiper();
      // Auto-initialize swipers if they exist
    if (document.querySelector('.hero-swiper')) {
        veironSwiper.initHeroBanner();
    }
    
    if (document.querySelector('.fleet-swiper')) {
        veironSwiper.initFleetShowcase();
    }
    
    if (document.querySelector('.car-gallery-swiper')) {
        veironSwiper.initCarGallery();
    }
    
    if (document.querySelector('.car-thumbs-swiper')) {
        veironSwiper.initCarThumbs();
    }
    
    if (document.querySelector('.featured-cars-swiper')) {
        veironSwiper.initFeaturedCars();
    }
    
    if (document.querySelector('.testimonials-swiper')) {
        veironSwiper.initTestimonials();
    }
      if (document.querySelector('.partners-swiper')) {
        veironSwiper.initPartners();
    }
});

// Pause autoplay when page is not visible
document.addEventListener('visibilitychange', () => {
    if (veironSwiper) {
        if (document.hidden) {
            veironSwiper.pauseAllAutoplay();
        } else {
            veironSwiper.resumeAllAutoplay();
        }
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VeironSwiper, SwiperTemplates };
}
