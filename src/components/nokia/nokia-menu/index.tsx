import cs from 'classnames'

import { useRoute } from 'preact-iso'

import { HorizontalMenu, HorizontalElement } from 'components/ui/horizontal-menu'

import { compareRoute } from 'utils/url-route/compare-route'

import { NOKIA_MENU_LINK } from 'data/nokia-menu-links'

import './style.css'

export const NokiaMenu = () => {
	const { path } = useRoute()

	return (
		<div className="nokia__menu">
			<HorizontalMenu>
				{NOKIA_MENU_LINK.map(menuLink => (
					<HorizontalElement>
						<a
							href={menuLink.href as string}
							className={cs('menu__item', {
								'menu__item--active': compareRoute(menuLink.href as string, path)
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
