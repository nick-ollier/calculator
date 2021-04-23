module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            minHeight: {
                'btn-p': '66px',
                'btn-l': '44px'
            },
            minWidth: {
                'btn-p': '66px',
                'btn-l': '44px'
            },
            height: {
                '9/10': '90%'
            },
            width: {
                '95/100': '95%'
            },
            borderRadius: {
                screen: '22px'
            }
        },
        colors: {
            black: '#000000',
            white: '#ffffff',
            orange: { 100: '#ff9528', 200: '#E67C0F' },
            gray: {
                100: '#efefef',
                200: '#a5a5a5',
                300: '#6C6C6C',
                400: '#333333',
                500: '#212121',
                600: '#1B1B1B'
            }
        },
        fontFamily: {
            sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active']
        }
    },
    plugins: []
};
