/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blood: {
                    50: '#fee2e2',
                    100: '#fecaca',
                    500: '#DC143C',
                    700: '#8B0000',
                    900: '#450000',
                },
                darkness: {
                    900: '#0a0a0a',
                    800: '#1a1a1a',
                    700: '#2a2a2a',
                },
            },
            fontFamily: {
                creepy: ['Creepster', 'cursive'],
                nosifer: ['Nosifer', 'cursive'],
                butcherman: ['Butcherman', 'cursive'],
            },
            animation: {
                'blood-drip': 'bloodDrip 1.2s ease-in forwards',
                'fog-drift': 'fogDrift 20s ease-in-out infinite',
                'flicker': 'flicker 0.15s infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                bloodDrip: {
                    '0%': { transform: 'translateY(0) scaleY(1)', opacity: '1' },
                    '50%': { transform: 'translateY(50%) scaleY(2)', opacity: '0.8' },
                    '100%': { transform: 'translateY(100%) scaleY(0.5)', opacity: '0' },
                },
                fogDrift: {
                    '0%, 100%': { transform: 'translateX(0) translateY(0)' },
                    '50%': { transform: 'translateX(100px) translateY(-50px)' },
                },
                flicker: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(220, 20, 60, 0.8)' },
                },
            },
        },
    },
    plugins: [],
}
