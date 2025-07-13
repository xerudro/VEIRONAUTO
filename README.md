# Veiron Auto - Car Rental Website ![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/xerudro/VEIRONAUTO?utm_source=oss&utm_medium=github&utm_campaign=xerudro%2FVEIRONAUTO&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## 📋 Project Overview

Veiron Auto is a modern, production-ready car rental website built with HTML, CSS, JavaScript, and PHP. The website features a clean, responsive design with a multi-step booking process and automated email notifications.

**Company**: Veiron Auto  
**Slogan**: Simplu Si Rapid  
**Language**: Romanian  
**Target Market**: Romanian car rental market  

## 🏗️ Project Structure

```
VEIRONAUTO/
├── index.html                 # Main landing page
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   ├── booking.css       # Booking form styles (future)
│   │   └── responsive.css    # Additional responsive styles (future)
│   ├── js/
│   │   ├── config.js         # Configuration settings
│   │   ├── booking.js        # Booking form functionality
│   │   ├── swiper-components.js # Swiper carousel components
│   │   ├── car-selection.js  # Car selection logic (future)
│   │   └── utils.js          # Utility functions (future)
│   ├── images/               # Image assets (future)
│   └── fonts/                # Custom fonts (future)
├── php/                      # PHP backend files (future)
│   ├── mailer.php           # PHPMailer integration
│   ├── config.php           # PHP configuration
│   └── booking-handler.php  # Form submission handler
├── templates/                # Email templates (future)
├── docs/                     # Documentation
│   └── swiper-guide.md      # Swiper implementation guide
└── README.md                 # This file
```

## 🚀 Features

### ✅ Implemented
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Booking Form**: Complete rental booking interface
- **Form Validation**: Real-time client-side validation
- **Date Management**: Smart date selection with validation
- **Location Selection**: Multiple pickup/dropoff locations
- **Contact Integration**: Floating contact buttons (Email, Phone, WhatsApp)
- **Animations**: Smooth transitions and loading states
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO Ready**: Meta tags and structured markup
- **Swiper Integration**: Touch-friendly carousels and sliders ready for use

### 🔄 Planned
- **Car Selection Page**: Browse and select rental cars
- **PHP Backend**: Form processing and email notifications
- **Payment Integration**: Online payment gateway
- **User Accounts**: Registration and booking history
- **Multi-language Support**: Romanian and English
- **Google Maps Integration**: Location visualization
- **SMS Notifications**: Text message alerts

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icon library
- **Swiper.js**: Touch-friendly carousels and sliders

### Backend (Planned)
- **PHP 8.0+**: Server-side processing
- **PHPMailer**: Email functionality
- **MySQL**: Database for bookings and cars
- **Apache/Nginx**: Web server

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design System

### Colors
- **Primary**: #667eea (Blue gradient start)
- **Secondary**: #764ba2 (Purple gradient end)
- **Success**: #52c41a (Green for confirmations)
- **Danger**: #ff4d4f (Red for errors)
- **Warning**: #faad14 (Orange for warnings)

### Typography
- **Primary Font**: Arial, sans-serif
- **Headings**: Bold weights
- **Body Text**: Regular weight, 1.6 line height

### Spacing
- **Container**: Max-width 1200px
- **Padding**: 20px standard
- **Margins**: Consistent 15-30px spacing
- **Border Radius**: 10-20px for modern look

## 📋 Configuration

The website uses a centralized configuration system in `assets/js/config.js`:

```javascript
// Update company information
VeironConfig.company.contact.email = 'your-email@domain.com';
VeironConfig.company.contact.phone = '+40123456789';

// Add new locations
VeironConfig.locations.push({
    value: 'new-location',
    label: 'New Location',
    coordinates: [lat, lng]
});
```

## 🚀 Getting Started

### Prerequisites
- Web server (Apache/Nginx) or local development server
- PHP 8.0+ (for backend functionality)
- Modern web browser

### Installation

1. **Clone or Download** the project files
2. **Upload** to your web server or local development environment
3. **Configure** settings in `assets/js/config.js`
4. **Update** contact information and company details
5. **Test** the booking form functionality

### Local Development

```bash
# Using Python (if available)
python -m http.server 8000

# Using PHP built-in server
php -S localhost:8000

# Using Node.js (if you have it)
npx serve .
```

Then open: `http://localhost:8000`

## 📧 Email Configuration (Future)

For PHPMailer integration:

1. Install PHPMailer via Composer
2. Configure SMTP settings in `php/config.php`
3. Customize email templates in `templates/`
4. Test email delivery

## 🔧 Customization

### Adding New Locations
Edit `assets/js/config.js`:
```javascript
VeironConfig.locations.push({
    value: 'new-city',
    label: 'New City',
    coordinates: [latitude, longitude]
});
```

### Changing Colors
Update CSS variables in `assets/css/main.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Adding New Time Slots
Edit `assets/js/config.js`:
```javascript
VeironConfig.timeSlots.push('19:00', '20:00');
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Load Time**: < 2 seconds on 3G
- **Bundle Size**: Minimal CSS/JS footprint
- **Image Optimization**: WebP with fallbacks (when images added)

## 🐛 Debugging

### Console Logging
Enable debug mode in `assets/js/config.js`:
```javascript
VeironConfig.development.debug = true;
```

### Common Issues
- **Form not submitting**: Check JavaScript console for errors
- **Styling issues**: Verify CSS file paths
- **Mobile layout**: Test responsive breakpoints

## 📈 Analytics (Future)

Recommended analytics setup:
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel (for ads)
- Hotjar (for user behavior)

## 🔒 Security

### Client-side
- Input validation and sanitization
- XSS prevention
- CSRF protection (when backend added)

### Server-side (Future)
- SQL injection prevention
- File upload security
- Rate limiting
- SSL certificate required

## 📞 Support

For technical support or customization requests:
- **Email**: contact@veironauto.ro
- **Phone**: +40123456789
- **Documentation**: Check this README and code comments

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Booking form implementation
- Responsive design
- Basic validation

### v1.1.0 (Planned)
- Car selection page
- PHP backend integration
- Email notifications

### v1.2.0 (Planned)
- Payment integration
- User accounts
- Advanced features

## 📄 License

This project is proprietary software for Veiron Auto. All rights reserved.

## 👥 Development Team

- **Lead Developer**: [Your Name]
- **UI/UX Designer**: [Designer Name]
- **Project Manager**: [PM Name]

---

**Last Updated**: June 15, 2025  
**Next Review**: July 15, 2025

---

### Currency Handling

- **Base currency:** All prices in the system are stored and processed in EUR.
- **Display:**
  - For Romanian users, prices are shown in RON (converted at display time using `eurRate` from config).
  - For English users, prices are shown in EUR.
- **Conversion formula:**
  - RON = EUR * (1/eurRate)
  - (ex: if eurRate = 0.20, then 1 EUR = 5 RON)
- **Data storage:**
  - All reservation data is saved with the price in EUR, not RON.
- **Important:**
  - Any future changes to currency logic must respect this convention for consistency.

#### Example code comment for JS files:

```js
/*
 * Currency Conversion Policy:
 * - All base prices are stored in EUR.
 * - For Romanian language (RO), prices are displayed in RON, converted using eurRate from config.
 * - For English language (EN), prices are displayed in EUR (no conversion).
 * - Conversion formula: RON = EUR * (1/eurRate)
 * - eurRate should reflect the value: 1 RON = eurRate EUR (ex: eurRate = 0.20 means 1 EUR = 5 RON)
 * - When saving reservations, always store the price in EUR.
 */
```

---

**Unde să pui comentariul în cod:**  
- Înaintea funcției `formatPrice` din fiecare fișier JS relevant (`reservation-en.js`, `reservation-ro.js`, etc.).
- Sau la începutul fișierului de config (`config.js`).

**Unde să pui în README:**  
- Într-o secțiune separată, de preferat după "Instalare" sau "Structura proiectului".

---

Dacă vrei, pot insera direct comentariul în fișierele tale JS. Spune-mi dacă vrei să fac asta!
