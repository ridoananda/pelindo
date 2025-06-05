/**
 * Maritime Theme System for PT. Pelabuhan Indonesia
 * This file contains theme variables that can be used throughout the application
 * to maintain consistent branding and styling.
 */

const theme = {
    colors: {
        // Primary Colors
        primary: {
            900: '#0f172a', // Very Dark Navy Blue
            800: '#1e3a8a', // Dark Navy Blue
            700: '#1e40af', // Navy Blue (Main Brand Color)
            600: '#2563eb', // Medium Blue
            500: '#3b82f6', // Blue
            400: '#60a5fa', // Light Blue
            300: '#93c5fd', // Lighter Blue
            200: '#bfdbfe', // Very Light Blue
            100: '#dbeafe', // Extremely Light Blue
            50: '#eff6ff',  // Almost White Blue
        },

        // Secondary Colors (Ocean-inspired greens/teals)
        secondary: {
            900: '#134e4a', // Dark Teal
            800: '#115e59', // Teal
            700: '#0f766e', // Medium Teal
            600: '#0d9488', // Light Teal
            500: '#14b8a6', // Lightest Teal
            400: '#2dd4bf', // Very Light Teal
            300: '#5eead4', // Almost White Teal
        },

        // Accent Colors
        accent: {
            danger: '#ef4444',     // Red
            warning: '#f59e0b',    // Amber
            success: '#10b981',    // Emerald
            info: '#0ea5e9',       // Sky Blue
        },

        // Neutral Colors
        neutral: {
            900: '#0f172a', // Very Dark Gray
            800: '#1e293b', // Dark Gray
            700: '#334155', // Medium Dark Gray
            600: '#475569', // Medium Gray
            500: '#64748b', // Gray
            400: '#94a3b8', // Light Gray
            300: '#cbd5e1', // Lighter Gray
            200: '#e2e8f0', // Very Light Gray
            100: '#f1f5f9', // Almost White Gray
            50: '#f8fafc',  // White Gray
            white: '#ffffff',
        },
    },

    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
    },

    gradients: {
        primary: 'linear-gradient(to right, #1e40af, #3b82f6)',
        secondaryPrimary: 'linear-gradient(to right, #0f766e, #3b82f6)',
        blue: 'linear-gradient(to right, #1e3a8a, #3b82f6)',
        teal: 'linear-gradient(to right, #134e4a, #14b8a6)',
        dark: 'linear-gradient(to right, #0f172a, #1e293b)',
    },

    typography: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Poppins', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
        },
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
        },
        fontSize: {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem',  // 36px
            '5xl': '3rem',     // 48px
        },
    },

    borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
    },

    // Common maritime-themed background patterns
    patterns: {
        waves: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%2360a5fa' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        compass: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        shipWheel: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%231e40af' fill-opacity='0.05'%3E%3Ccircle cx='40' cy='40' r='30' stroke='%231e40af' stroke-width='2' fill='none'/%3E%3Cpath d='M40 10 L40 20 M40 60 L40 70 M10 40 L20 40 M60 40 L70 40 M18 18 L25 25 M55 55 L62 62 M18 62 L25 55 M55 25 L62 18' stroke='%231e40af' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E\")",
    },

    // Common spacing values
    spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
    },
};

export default theme;
