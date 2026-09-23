import cs from 'classnames'

import { FunctionComponent, h } from 'preact'

import './style.css'

type TourismHeaderPropsType = {}
	& (
		| { main: boolean, secondary?: undefined }
		| { main?: undefined, secondary: boolean }
	)

export const TourismHeader: FunctionComponent<TourismHeaderPropsType> = ({ children, main, secondary }) => h(
	(main ? 'h1' : 'h2'),
	{
		className: cs({
			'tourism__header--main': main,
			'tourism__header--secondary': secondary,
		})
	},
	children
)
