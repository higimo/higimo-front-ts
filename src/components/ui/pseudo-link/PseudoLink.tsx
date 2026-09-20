import { AnchorLinksType } from 'dic/ANCHOR_LINKS'
import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'
import { smoothScroll } from 'utils/smooth-scroll'

import './style.css'

type PseudoLinkPropsType = ClassNameType & {
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
