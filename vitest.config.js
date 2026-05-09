import path from 'path'
import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
	plugins: [preact()],
	test: {
		// environment: 'node',
		environment: 'jsdom',
		globals: true,
		include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
		setupFiles: ['./vitest.setup.js'],
	},
	resolve: {
		alias: {
			'components': path.resolve(__dirname, './src/components'),
			'assets': path.resolve(__dirname, './src/assets'),
			'api-types': path.resolve(__dirname, './src/api-types'),
			'context': path.resolve(__dirname, './src/context'),
			'hook': path.resolve(__dirname, './src/hook'),
			'dic': path.resolve(__dirname, './src/dic'),
			'pages': path.resolve(__dirname, './src/pages'),
			'utils': path.resolve(__dirname, './src/utils'),
			'vendor': path.resolve(__dirname, './src/vendor'),
			'fixtures': path.resolve(__dirname, './src/fixtures'),
		}
	},
});
