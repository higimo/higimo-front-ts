import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TourismSecondaryPropsType = ClassNameType & {
	main?: boolean
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
