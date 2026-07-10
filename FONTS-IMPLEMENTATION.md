# Retail Font Family Implementation

## Overview
The Kassongo site now uses the **Retail font family** from the `/public/fonts` directory. This professional font family has three variants optimized for different use cases.

## Font Variants

### 1. Retail Display
- **Purpose**: Large headings and hero text
- **Location**: `/public/fonts/RetailDisplayDemo-*.otf`
- **CSS Variable**: `--font-display`
- **Usage**: All `.d1` through `.d6` heading classes

### 2. Retail Text
- **Purpose**: Body text and paragraphs
- **Location**: `/public/fonts/RetailTextDemo-*.otf`
- **CSS Variable**: `--font-text`
- **Usage**: All `.body-1` through `.body-5` text classes, and default body text

### 3. Retail (Base)
- **Purpose**: General UI elements
- **Location**: `/public/fonts/RetailDemo-*.otf`
- **CSS Variable**: `--font-sans`
- **Usage**: Fallback and general elements

## Font Weights Available
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Black**: 900

## How to Use

### In CSS Classes
```jsx
// Headings (uses Retail Display)
<h1 className="d1">Large Hero Heading</h1>
<h2 className="d2">Section Heading</h2>
<h3 className="d3">Subsection</h3>

// Body text (uses Retail Text)
<p className="body-1">Large body text</p>
<p className="body-2">Regular body text</p>
<p className="body-3">Small body text</p>
```

### Direct Font Family Usage
```jsx
// Display font
<div style={{ fontFamily: 'var(--font-display)' }}>...</div>

// Text font
<div style={{ fontFamily: 'var(--font-text)' }}>...</div>

// Sans font
<div style={{ fontFamily: 'var(--font-sans)' }}>...</div>
```

### Tailwind Usage
```jsx
// The fonts are automatically applied through the theme
<p className="font-sans">Uses Retail</p>
<h1 className="font-display">Uses Retail Display</h1>
```

## Font Loading
All fonts use `font-display: swap` for optimal performance:
- Text remains visible during font loading
- Custom fonts swap in when ready
- Fallback fonts ensure readability

## File Structure
```
kasongo-site/
├── public/
│   └── fonts/
│       ├── RetailDemo-*.otf (9 weights)
│       ├── RetailDisplayDemo-*.otf (9 weights)
│       └── RetailTextDemo-*.otf (9 weights)
├── app/
│   ├── globals.css (font-face declarations)
│   └── layout.tsx (font configuration)
```

## License
Font license information is available in `/public/fonts/Befonts-License.txt`

## Benefits
✅ **Professional Typography**: Custom fonts give the brand a unique identity  
✅ **Performance**: Local fonts load faster than external font services  
✅ **Optimized Variants**: Display, Text, and Base variants for different contexts  
✅ **Consistent Branding**: Same fonts across all pages and components  
✅ **Fallback Support**: System fonts ensure text is always readable
