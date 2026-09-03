import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TourismSecondaryPropsType = {
	main?: boolean
	className?: string
}

export const TourismSecondary: FunctionComponent<TourismSecondaryPropsType> = ({ children, main = false, className }) => (
	<p
		className={cs(
			'tourism__paragraph',
			{
				'tourism__paragraph--main': main,
				'tourism__paragraph--secondary': !main,
			},
			className,
		)}
	>
		{children}
	</p>
)
