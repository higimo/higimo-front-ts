import { FunctionComponent, JSX } from 'preact'

import { AnchorLinksType } from 'dic/ANCHOR_LINKS'

import cs from 'classnames'

import './style.css'

const smoothScroll = (href: AnchorLinksType) => (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
	event.preventDefault()
	const offsetTop = document.querySelector(`#${href}`)?.getBoundingClientRect().top + window.scrollY
	window.scroll({
		top: offsetTop,
		behavior: 'smooth'
	})
}

type PseudoLinkPropsType = {
	className?: string
	href: AnchorLinksType
}
export const PseudoLink: FunctionComponent<PseudoLinkPropsType> = props => {
	return (
		<span
			className={cs('pseudo-link', props.className)}
			onClick={smoothScroll(props.href)}
		>
			{props.children}
		</span>
	)
}
