# System Patterns - Veiron Auto

## Architecture Overview

### Frontend-Only Architecture
- **Static HTML/CSS/JS** - No backend server required for current functionality
- **Client-side validation** - Real-time form validation in browser
- **Config-driven** - Centralized configuration in `config.js`
- **Component-based** - Modular JavaScript classes

## Key Technical Decisions

### 1. Vanilla JavaScript Approach
**Decision**: Use vanilla JavaScript instead of frameworks
**Rationale**: 
- Lightweight and fast loading
- No build process required
- Easy to maintain and debug
- Full control over functionality

**Implementation**:
```javascript
class BookingForm {
    constructor() {
        this.form = document.getElementById('bookingForm');
        this.init();
    }
    // Methods for form handling
}
```

### 2. Configuration-Driven Locations
**Decision**: Centralize location data in config file
**Rationale**:
- Easy to update locations without code changes
- Consistent data across components
- Fallback options for reliability

**Implementation**:
```javascript
// config.js
locations: [
    { value: 'satu-mare', label: 'Satu Mare', coordinates: [47.8017, 22.8572] },
    // ... more locations
]
```

### 3. Dynamic DOM Manipulation
**Decision**: Create form fields dynamically based on user interaction
**Rationale**:
- Clean initial form state
- Progressive disclosure of complexity
- Smooth user experience

**Implementation**:
```javascript
createDropoffLocationSelect() {
    // Dynamically create and insert new form field
    // Add animations and validation
}
```

## Design Patterns Used

### 1. Observer Pattern
**Usage**: Event listeners for form interactions
```javascript
document.getElementById('differentDropoff').addEventListener('change', (e) => {
    this.toggleDropoffLocation(e.target.checked);
});
```

### 2. Factory Pattern
**Usage**: Creating form elements dynamically
```javascript
createDropoffLocationSelect() {
    const dropoffLocationGroup = document.createElement('div');
    // Configure and return element
}
```

### 3. Strategy Pattern
**Usage**: Different validation strategies
```javascript
validateField(field) {
    const isValid = field.value.trim() !== '';
    // Apply different validation strategies based on field type
}
```

## Component Relationships

### File Structure
```
VEIRONAUTO/
├── index.html (Main page)
├── assets/
│   ├── js/
│   │   ├── config.js (Configuration)
│   │   ├── booking.js (Form logic)
│   │   └── swiper-components.js (UI components)
│   └── css/
│       ├── main.css (Main styles)
│       ├── forms.css (Form-specific styles)
│       └── components.css (Reusable components)
```

### Data Flow
1. **Config.js** → Provides location data and settings
2. **Booking.js** → Consumes config, manages form state
3. **HTML** → Provides structure and initial state
4. **CSS** → Provides styling and animations

## State Management

### Form State
- **Pickup location** - Selected city for pickup
- **Dropoff location** - Selected city for return (optional)
- **Dates** - Pickup and return dates
- **Times** - Pickup and return times
- **Validation state** - Field validation status

### State Updates
```javascript
// State changes trigger UI updates
toggleDropoffLocation(isChecked) {
    if (isChecked) {
        this.createDropoffLocationSelect(); // Add field
    } else {
        this.removeDropoffLocationSelect(); // Remove field
    }
}
```

## Error Handling Patterns

### 1. Graceful Degradation
- Fallback to default locations if config fails
- Continue working even if some features fail

### 2. User Feedback
- Real-time validation with visual indicators
- Clear error messages
- Success confirmations

### 3. Debug Mode
```javascript
development: {
    debug: true,
    logLevel: 'info',
    enableConsoleLog: true
}
```

## Performance Patterns

### 1. Lazy Loading
- Form fields created only when needed
- Images loaded on demand

### 2. Event Delegation
- Single event listener for form validation
- Efficient DOM manipulation

### 3. CSS Animations
- Hardware-accelerated transitions
- Smooth user experience

## Security Considerations

### Client-Side Only
- No sensitive data processing
- Form validation for UX only
- No authentication required for current features

### Input Sanitization
- HTML escaping for dynamic content
- Validation of user inputs
- Prevention of XSS attacks

## Scalability Patterns

### 1. Configuration-Driven
- Easy to add new locations
- Simple to modify business rules
- No code changes for content updates

### 2. Modular Design
- Separate concerns (config, logic, styling)
- Easy to extend functionality
- Maintainable codebase

### 3. Responsive Design
- Works on all screen sizes
- Mobile-first approach
- Progressive enhancement 

## Pattern actual populare prețuri (2024-07-06)
- Prețurile pe carduri se populează din array-ul global MODELE_MASINI_PRETURI (assets/js/modele-masini-preturi.js), nu din JSON sau API.
- Selectarea cardului se face la click pe orice card, nu pe buton dedicat.
- Orice modificare de preț se face direct în array-ul JS, fără deploy backend sau modificare JSON. 

// English translation:
- The prices on the cards are populated from the global array MODELE_MASINI_PRETURI (assets/js/modele-masini-preturi.js), not from JSON or an API.
- Card selection is performed by clicking anywhere on the card, not on a dedicated button.
- Any price modification is done directly in the JS array, without backend deployment or JSON modification. 