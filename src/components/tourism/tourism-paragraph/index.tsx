import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TourismSecondaryPropsType = {
	main?: boolean
}

export const TourismSecondary: FunctionComponent<TourismSecondaryPropsType> = ({ children, main = false }) => (
	<p
		className={cs(
			'tourism__paragraph',
			{
				'tourism__paragraph--main': main,
				'tourism__paragraph--secondary': !main,
			}
		)}
	>
		{children}
	</p>
)
