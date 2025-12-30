/**
 * Animation utilities and Tailwind classes for consistent transitions
 */

// Fade in animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

// Slide in from right
export const slideInRight = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: { type: 'spring', damping: 25, stiffness: 200 },
};

// Slide in from bottom
export const slideInBottom = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.3 },
};

// Scale animations
export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2 },
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.3 },
};

// Tailwind animation classes (for non-framer-motion usage)
export const animations = {
  // Fade
  fadeIn: 'animate-in fade-in duration-200',
  fadeOut: 'animate-out fade-out duration-200',

  // Slide
  slideInRight: 'animate-in slide-in-from-right duration-300',
  slideInBottom: 'animate-in slide-in-from-bottom duration-300',
  slideInTop: 'animate-in slide-in-from-top duration-300',

  // Zoom
  zoomIn: 'animate-in zoom-in-95 duration-200',
  zoomOut: 'animate-out zoom-out-95 duration-200',

  // Hover effects
  hoverLift: 'transition-transform hover:-translate-y-1 duration-200',
  hoverScale: 'transition-transform hover:scale-105 duration-200',
  hoverShadow: 'transition-shadow hover:shadow-lg duration-200',

  // Loading
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
};

// Transition classes
export const transitions = {
  all: 'transition-all duration-200',
  colors: 'transition-colors duration-200',
  transform: 'transition-transform duration-200',
  shadow: 'transition-shadow duration-200',
  opacity: 'transition-opacity duration-200',
};
