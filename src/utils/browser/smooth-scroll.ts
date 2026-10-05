import { TargetedMouseEvent } from 'preact'

import { AnchorLinksType } from 'dic/ANCHOR_LINKS'

/**
 * Плавно прокручивает страницу до якоря (указывается в id)
 *
 * Используется каррирование, чтобы не создавать функцию внутри JSX
 * `onClick={smoothScroll('about')}`.
 *
 * @param href - идентификатор из словаря ANCHOR_LINKS
 *
 * @example
 * ```jsx
 * <button onClick={smoothScroll('contacts')}>К контактам</button>
 * ```
 */
export const smoothScroll = (href: AnchorLinksType) => (event?: TargetedMouseEvent<HTMLButtonElement>) => {
	if (event) {
		event.preventDefault()
	}
	const el = document.querySelector(`#${href}`)
	if (el) {
		const offsetTop = el.getBoundingClientRect()!.top + window.scrollY
		window.scroll({
			top: offsetTop,
			behavior: 'smooth'
		})
	}
}
