# Harbour Color System Documentation

## Overview

This document describes the unified color system implemented for the Harbour project, which supports both light and dark themes through CSS custom properties (CSS variables).

## Theme Architecture

### Color Palette Structure

The color system is built on a foundation of semantic color tokens that automatically adapt between light and dark themes. The system uses a three-tier approach:

1. **Base Colors** - Raw color values in 50-900 scale
2. **Semantic Tokens** - Purpose-driven color assignments
3. **Component Usage** - How colors are applied in components

### Base Color Scales

#### Primary Colors (Blue)
- `--color-primary-50` to `--color-primary-900`
- Used for primary actions, links, and brand elements

#### Secondary Colors (Teal)
- `--color-secondary-50` to `--color-secondary-900`
- Used for secondary actions and accents

#### Neutral Colors (Grays)
- `--color-neutral-50` to `--color-neutral-900`
- Used for text, borders, and surfaces

#### Status Colors
- **Success**: `--color-success-50` to `--color-success-900`
- **Warning**: `--color-warning-50` to `--color-warning-900`
- **Danger**: `--color-danger-50` to `--color-danger-900`
- **Info**: `--color-info-50` to `--color-info-900`

## Semantic Color Tokens

### Surface Colors
```css
--color-background      /* Main page background */
--color-surface         /* Card/container backgrounds */
--color-surface-variant /* Alternative surface color */
--color-surface-elevated /* Elevated surfaces (modals, etc.) */
```

### Text Colors
```css
--color-text-primary    /* Primary text content */
--color-text-secondary  /* Secondary text content */
--color-text-tertiary   /* Tertiary/helper text */
--color-text-inverse    /* Text on colored backgrounds */
```

### Border Colors
```css
--color-border-primary   /* Standard borders */
--color-border-secondary /* Subtle borders */
--color-border-focus     /* Focus states */
```

### Interactive Colors
```css
--color-primary         /* Primary buttons/links */
--color-primary-hover   /* Hover states */
--color-primary-active  /* Active/pressed states */
--color-primary-light   /* Light backgrounds */
```

## Theme Switching

### Implementation
The theme system uses the `data-theme` attribute on the document root:

```html
<html data-theme="light">  <!-- Light theme -->
<html data-theme="dark">   <!-- Dark theme -->
```

### Theme Switcher Component
The `ThemeSwitcher` component provides a toggle button that:
- Persists theme preference in localStorage
- Updates the DOM attribute
- Provides accessible labels and icons

## Usage Guidelines

### Using CSS Variables
Always use semantic tokens instead of base colors:

```scss
/* ✅ Good - Uses semantic token */
.my-component {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

/* ❌ Avoid - Uses raw values */
.my-component {
  background: #ffffff;
  color: #333333;
  border: 1px solid #e0e0e0;
}
```

### Button Classes
Standard button classes are available:

```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-success">Success Action</button>
<button className="btn-warning">Warning Action</button>
<button className="btn-danger">Danger Action</button>
<button className="btn-info">Info Action</button>
```

### Utility Classes
Text and background utilities:

```jsx
<div className="text-primary bg-surface">
  <p className="text-secondary">Secondary text</p>
</div>
```

## Migration from Old Colors

### Before (Legacy)
```scss
.header {
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button {
  background: #007bff;
  color: white;
  
  &:hover {
    background: #0056b3;
  }
}
```

### After (New System)
```scss
.header {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-md);
}

.button {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  
  &:hover {
    background: var(--color-primary-hover);
  }
}
```

## Shadows and Effects

The system includes consistent shadow tokens:

```css
--shadow-sm  /* Small shadows */
--shadow-md  /* Medium shadows */
--shadow-lg  /* Large shadows */
--shadow-xl  /* Extra large shadows */
```

## Gradients

Background gradients adapt to theme:

```css
--gradient-primary  /* Main background gradient */
--gradient-surface  /* Surface gradients */
```

## Testing Themes

To test your components in both themes:

1. Use the theme switcher in the header
2. Manually toggle by setting `localStorage.setItem('harbour-theme', 'dark')`
3. Check that all elements remain legible and maintain proper contrast

## Accessibility

The color system ensures:
- WCAG AA contrast ratios for all text
- Proper focus indicators
- Theme preference persistence
- Semantic color usage for status indicators

## Contributing

When adding new components:

1. Use semantic color tokens
2. Test in both light and dark themes
3. Ensure proper contrast ratios
4. Use existing shadow and border tokens
5. Follow the established naming conventions
