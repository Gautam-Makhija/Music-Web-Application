module.exports = {
	purge: ['./src/**/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			width: ['responsive', 'hover', 'focus']
		}
	},
	plugins: [],
}