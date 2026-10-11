import cs from 'classnames'

import { useRoute } from 'preact-iso'

import { HorizontalMenu, HorizontalElement } from 'components/ui/horizontal-menu'

import { compareRoute } from 'utils/url-route/compare-route'
import { nokiaMenuLinks } from 'components/nokia/nokia-menu/nokia-menu-links'

import './style.css'

export const NokiaMenu = () => {
	const { path } = useRoute()

	return (
		<div className="nokia__menu">
			<HorizontalMenu>
				{nokiaMenuLinks.map(menuLink => (
					<HorizontalElement>
						<a
							href={menuLink.href}
							className={cs('menu__item', {
								'menu__item--active': compareRoute(menuLink.href, path)
							})}
						>
							{menuLink.title}
						</a>
					</HorizontalElement>
				))}
			</HorizontalMenu>
		</div>
	)
}
