import { JSX } from 'preact'
import { AnchorLinksType } from 'dic/ANCHOR_LINKS'

export const smoothScroll = (href: AnchorLinksType) => (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
	if (event) {
		event.preventDefault()
	}
	const offsetTop = document.querySelector(`#${href}`)!.getBoundingClientRect()!.top + window.scrollY
	window.scroll({
		top: offsetTop,
		behavior: 'smooth'
	})
}
