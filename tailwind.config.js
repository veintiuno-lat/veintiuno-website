/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx,css}', './src/**/*.css'],
  theme: {
  	extend: {
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '16px'
  			},
  			screens: {
  				lg: '1024px'
  			}
  		},
  		colors: {
  			bitcoin: '#F7931A',
  			'bitcoin-light': '#F7931A',
  			'bitcoin-dark': '#F7931A',
  			'custom-black': '#171717',
  			'custom-gray': '#525252',
  			'custom-gray-light': '#CDCDCD',
  			'custom-border': '#D9D9D9',
  			coral: {
  				'50': '#fff5f5',
  				'100': '#ffebeb',
  				'200': '#ffd6d6',
  				'300': '#ffb3b3',
  				'400': '#ff8080',
  				'500': '#FF6B6B',
  				'600': '#e65555',
  				'700': '#cc4040',
  				'800': '#b32a2a',
  				'900': '#991515'
  			},
  			teal: {
  				'50': '#f0fdfa',
  				'100': '#ccfbf1',
  				'200': '#99f6e4',
  				'300': '#5eead4',
  				'400': '#2dd4bf',
  				'500': '#4ECDC4',
  				'600': '#0d9488',
  				'700': '#0f766e',
  				'800': '#115e59',
  				'900': '#134e4a'
  			},
  			gold: {
  				'50': '#fffef7',
  				'100': '#fffceb',
  				'200': '#fff7c2',
  				'300': '#fff189',
  				'400': '#ffe234',
  				'500': '#FFD93D',
  				'600': '#eab308',
  				'700': '#ca8a04',
  				'800': '#a16207',
  				'900': '#854d0e'
  			},
  			'gray-50': '#FAFAFA',
  			'gray-100': '#F5F5F5',
  			'gray-200': '#E5E5E5',
  			'gray-300': '#D4D4D4',
  			'gray-400': '#A3A3A3',
  			'gray-500': '#737373',
  			'gray-600': '#525252',
  			'gray-700': '#404040',
  			'gray-800': '#262626',
  			'gray-900': '#171717',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  				fontFamily: {
			sans: [
				'Space Grotesk',
				'Inter',
				'system-ui',
				'sans-serif'
			],
			heading: [
				'Inter',
				'system-ui',
				'sans-serif'
			],
			body: [
				'Space Grotesk',
				'Inter',
				'system-ui',
				'sans-serif'
			],
			button: [
				'Space Grotesk',
				'Inter',
				'system-ui',
				'sans-serif'
			]
		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1.5',
  					letterSpacing: '0.015rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.5',
  					letterSpacing: '0.015rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.6',
  					letterSpacing: '0.015rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.6',
  					letterSpacing: '0.015rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.5',
  					letterSpacing: '-0.030rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '1.4',
  					letterSpacing: '-0.045rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.060rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '-0.075rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.1rem'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1.05',
  					letterSpacing: '-0.1rem'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1',
  					letterSpacing: '-0.2rem'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1',
  					letterSpacing: '-0.2rem'
  				}
  			]
  		},
  		fontWeight: {
  			thin: '100',
  			extralight: '200',
  			light: '300',
  			normal: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700',
  			extrabold: '800',
  			black: '900'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.4s ease-out',
  			float: 'float 3s ease-in-out infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			}
  		},
  		boxShadow: {
  			minimal: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  			'minimal-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  			'minimal-xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
