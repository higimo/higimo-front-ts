import { FunctionComponent } from 'preact'

import { h } from 'preact'

type MaybeLinkPropsType = {
	className?: string
	href?: string
	isHref?: boolean
}
export const MaybeLink: FunctionComponent<MaybeLinkPropsType> = ({
	href,
	isHref = true,
	className,
	children
}) => {
	return h(
		(!!href && !!isHref ? 'a' : 'span'),
		{
			className: className,
			...(!!href && !!isHref ? { href: href } : {})
		},
		children
	)
}
