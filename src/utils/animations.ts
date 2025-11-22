import type { Variants } from 'framer-motion';

/**
 * Page transition variants for fade-to-black with red flash effect
 * Creates a haunting transition between pages
 */
export const pageTransitionVariants: Variants = {
    initial: {
        opacity: 0,
        backgroundColor: '#000000',
    },
    animate: {
        opacity: 1,
        backgroundColor: '#0a0a0a',
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        backgroundColor: '#8B0000', // Dark blood red flash
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

/**
 * Blood drip animation variants
 */
export const bloodDripVariants: Variants = {
    initial: {
        y: -20,
        scaleY: 1,
        opacity: 0,
    },
    animate: {
        y: [0, 100, 200],
        scaleY: [1, 2, 0.5],
        opacity: [1, 0.8, 0],
        transition: {
            duration: 1.2,
            ease: 'easeIn',
            times: [0, 0.5, 1],
        },
    },
};

/**
 * Splatter effect variants
 */
export const splatterVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
        scale: [0, 1.5, 1],
        opacity: [0, 1, 0],
        transition: {
            duration: 0.4,
            delay: 1.2,
        },
    },
};

/**
 * Stagger children animation for movie grid
 */
export const staggerContainerVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

/**
 * Fade in up animation for individual items
 */
export const fadeInUpVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

/**
 * Scale and glow hover effect
 */
export const hoverScaleVariants = {
    rest: {
        scale: 1,
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
};
