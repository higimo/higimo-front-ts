import { AnchorLinksType } from 'dic/route/ANCHOR_LINK'
import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'
import { smoothScroll } from 'utils/browser/smooth-scroll'

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
