import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { analyzer } from 'vite-bundle-analyzer'

import { createHtmlPlugin } from 'vite-plugin-html'

// HtmlTagDescriptor

// https://vitejs.dev/config/
export default defineConfig(
	({ mode }) => {
		const isProduction = mode === 'production';

		const proxy = {
			'/api': {
				target: 'https://higimo.ru/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				configure: (proxy) => {
					proxy.on('proxyRes', (proxyRes) => {
						proxyRes.headers.connection = 'keep-alive';
						proxyRes.headers['cache-control'] = 'no-cache';
					});
				},
			},
			'/assets': {
				target: 'https://higimo.ru/assets',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/assets/, ''),
				configure: (proxy) => {
					proxy.on('proxyRes', (proxyRes) => {
						proxyRes.headers.connection = 'keep-alive';
						proxyRes.headers['cache-control'] = 'no-cache';
					});
				},
			},
			'/img': {
				target: 'https://higimo.ru/img',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/img/, ''),
				configure: (proxy) => {
					proxy.on('proxyRes', (proxyRes) => {
						proxyRes.headers.connection = 'keep-alive';
						proxyRes.headers['cache-control'] = 'no-cache';
					});
				},
			},
			'/json': {
				target: 'https://higimo.ru/json',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/json/, ''),
				configure: (proxy) => {
					proxy.on('proxyRes', (proxyRes) => {
						proxyRes.headers.connection = 'keep-alive';
						proxyRes.headers['cache-control'] = 'no-cache';
					});
				},
			},
		}

		const htmlPlugin = createHtmlPlugin({
			// minify: true,
			minify: false,
			entry: 'src/index.tsx',
			// template: 'src/index.html',
			inject: {
				data: {
					title: 'index',
				},
				tags: [
					{
						injectTo: 'head-prepend',
						tag: 'title',
						children: 'higimo — the webmaster'
					},
					{
						injectTo: 'head-prepend',
						tag: 'meta',
						attrs: { name: 'yandex-verification', content: '56ebd4aad15dc60d' },
						children: 'higimo — the webmaster'
					},
					{
						injectTo: 'head-prepend',
						tag: 'meta',
						attrs: { name: 'p:domain_verify', content: '7bc1d5a2611146299347a66b0c5fde59' },
						children: 'higimo — the webmaster'
					},
					{
						injectTo: 'body',
						tag: 'script',
						children: '(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter34085560 = new Ya.Metrika({ id:34085560, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, ecommerce:"dataLayer" }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");'
					},
					{
						injectTo: 'body',
						tag: 'div',
						children: '<noscript><div><img src="https://mc.yandex.ru/watch/34085560" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'
					},
				],
			},
		})

		return {
			plugins: [
				preact(),
				isProduction ? htmlPlugin : undefined,
				analyzer(),
			],
			server: {
				proxy: !isProduction ? proxy : undefined
			},
			build: {
				rollupOptions: {
					output: {
						manualChunks: {
							'markdown-it': ['markdown-it'],
						},
					},
				},
			},
		}
	}
);
