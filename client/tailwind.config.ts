import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	darkMode: ['class', '[data-mode="dark"]'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				aquamarin: '#7FFFD4',
				textColor: 'var(--color-textColor)',
				background: 'var(--color-bg)',
				logo: 'var(--color-logo)',
				backgroundSf: 'var(--color-bg-soft)',
				textColorSf: 'var(--color-textColor-soft)',
				border: 'var(--color-border)'
			}
		}
	},
	plugins: []
}

export default config
