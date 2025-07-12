# Swiper Integration Guide - Veiron Auto

## 📋 Overview

Swiper.js has been integrated into the Veiron Auto website to provide smooth, touch-friendly carousels and sliders. This document outlines how to use and customize the Swiper components.

## 🛠️ Installation

Swiper is already included via CDN in the main HTML file:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="assets/js/swiper-components.js"></script>
```

## 🎨 Available Components

### 1. Hero Banner Swiper
Perfect for homepage banners with fade transitions:

```html
<div class="swiper hero-swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="hero-slide-content">
                <h2>Slide Title</h2>
                <p>Slide description</p>
                <button class="cta-button">Call to Action</button>
            </div>
        </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>
```

**Initialize:**
```javascript
veironSwiper.initHeroBanner('.hero-swiper');
```

### 2. Car Gallery Swiper
For showcasing car images with thumbnails:

```html
<div class="car-gallery-container">
    <div class="swiper car-gallery-swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="car-image.jpg" alt="Car Image">
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
    <div class="swiper car-thumbs-swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="car-thumb.jpg" alt="Thumbnail">
            </div>
        </div>
    </div>
</div>
```

**Initialize:**
```javascript
veironSwiper.initCarGallery('.car-gallery-swiper');
veironSwiper.initCarThumbs('.car-thumbs-swiper');
```

### 3. Featured Cars Swiper
Display available cars in a responsive grid:

```html
<div class="swiper featured-cars-swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="car-card">
                <img src="car.jpg" alt="Car">
                <div class="car-info">
                    <h3>Car Name</h3>
                    <p class="car-price">€50/day</p>
                    <button class="book-now-btn">Book Now</button>
                </div>
            </div>
        </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>
```

**Initialize:**
```javascript
veironSwiper.initFeaturedCars('.featured-cars-swiper');
```

### 4. Testimonials Swiper
Customer reviews and testimonials:

```html
<div class="swiper testimonials-swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>"Great service and excellent cars!"</p>
                </div>
                <div class="testimonial-author">
                    <img src="customer.jpg" alt="Customer">
                    <div class="author-info">
                        <h4>Customer Name</h4>
                        <span>Customer Title</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>
```

**Initialize:**
```javascript
veironSwiper.initTestimonials('.testimonials-swiper');
```

### 5. Partners/Brands Swiper
Display partner logos or car brands:

```html
<div class="swiper partners-swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <img src="partner-logo.jpg" alt="Partner">
        </div>
    </div>
</div>
```

**Initialize:**
```javascript
veironSwiper.initPartners('.partners-swiper');
```

## ⚙️ Configuration

### Global Configuration
Edit `assets/js/config.js` to modify default settings:

```javascript
VeironConfig.swiper.defaults = {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    // ... other settings
};
```

### Component-Specific Configuration
```javascript
VeironConfig.swiper.featuredCars = {
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
};
```

## 🎯 Custom Usage

### Initialize with Custom Options
```javascript
// Custom hero banner
veironSwiper.initHeroBanner('.my-hero', {
    effect: 'cube',
    autoplay: { delay: 8000 },
    pagination: { dynamicBullets: true }
});

// Custom car gallery
veironSwiper.initCarGallery('.my-gallery', {
    spaceBetween: 40,
    autoplay: false,
    navigation: false
});
```

### Access Swiper Instances
```javascript
// Get specific swiper instance
const heroSwiper = veironSwiper.getInstance('hero');

// Control manually
heroSwiper.slideNext();
heroSwiper.slidePrev();
heroSwiper.autoplay.stop();
heroSwiper.autoplay.start();
```

### Event Handling
```javascript
// Listen to slide changes
const swiper = veironSwiper.initFeaturedCars('.featured-cars', {
    on: {
        slideChange: function () {
            console.log('Slide changed to:', this.activeIndex);
        },
        reachEnd: function () {
            console.log('Reached last slide');
        }
    }
});
```

## 📱 Responsive Breakpoints

Default breakpoints are configured for optimal mobile experience:

```javascript
breakpoints: {
    320: {  // Mobile portrait
        slidesPerView: 1,
        spaceBetween: 10
    },
    768: {  // Tablet
        slidesPerView: 2,
        spaceBetween: 20
    },
    1024: { // Desktop
        slidesPerView: 3,
        spaceBetween: 30
    }
}
```

## 🎨 Styling

### Custom CSS Classes
All swipers include custom CSS classes for styling:

- `.hero-swiper` - Hero banner styles
- `.car-gallery-swiper` - Car gallery main slider
- `.car-thumbs-swiper` - Car gallery thumbnails
- `.featured-cars-swiper` - Featured cars grid
- `.testimonials-swiper` - Customer testimonials
- `.partners-swiper` - Partner/brand logos

### Customizing Navigation
```css
.swiper-button-next.custom,
.swiper-button-prev.custom {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    width: 45px;
    height: 45px;
}
```

### Customizing Pagination
```css
.swiper-pagination.custom .swiper-pagination-bullet {
    background: #667eea;
    width: 12px;
    height: 12px;
}
```

## 🚀 Performance Tips

### Lazy Loading
Enable lazy loading for images:

```html
<div class="swiper-slide">
    <img data-src="large-image.jpg" class="swiper-lazy" alt="Car">
    <div class="swiper-lazy-preloader"></div>
</div>
```

```javascript
veironSwiper.initFeaturedCars('.featured-cars', {
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1
    }
});
```

### Preload Images
For critical images, preload them:

```javascript
const criticalImages = [
    'hero-slide-1.jpg',
    'hero-slide-2.jpg'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = `assets/images/${src}`;
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Swiper not initializing**
   - Check if Swiper CSS/JS files are loaded
   - Ensure DOM is ready before initialization
   - Verify correct HTML structure

2. **Images not displaying**
   - Check image paths
   - Ensure proper aspect ratios
   - Verify image loading

3. **Responsive issues**
   - Test breakpoint configurations
   - Check CSS conflicts
   - Verify viewport meta tag

### Debug Mode
Enable debug logging:

```javascript
VeironConfig.development.debug = true;
```

## 📊 Browser Support

Swiper.js supports:
- Chrome 55+
- Firefox 55+
- Safari 10+
- Edge 15+
- iOS Safari 10+
- Android Chrome 55+

## 🔄 Future Enhancements

Planned Swiper implementations:
- **Virtual slides** for large datasets
- **3D effects** for premium feel
- **Video backgrounds** in hero slides
- **Parallax scrolling** integration
- **Touch gestures** enhancement
- **Keyboard navigation** improvement

---

**Last Updated**: June 15, 2025  
**Version**: 1.0.0
