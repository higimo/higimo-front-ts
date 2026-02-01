import cs from 'classnames'

import { useRoute } from 'preact-iso'

import { compareRoute } from 'utils/compare-route'

import { HorizontalMenu, HorizontalElement } from 'components/ui/horizontal-menu'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const menuLinks = [
	{ href: ROUTE_LINKS.nokiaIndex, title: 'Встречи' },
	{ href: ROUTE_LINKS.nokiaPeople, title: 'Люди' },
	{ href: ROUTE_LINKS.nokiaForm, title: 'Добавить встречу' },
	{ href: ROUTE_LINKS.nokiaPeopleForm, title: '+ person' },
	{ href: ROUTE_LINKS.nokiaStatistic, title: 'Статистика' },
	{ href: ROUTE_LINKS.nokiaPinarik, title: 'Пинарик' },
]

export const NokiaMenu = () => {
	const { path } = useRoute()

	return (
		<div className="nokia__menu">
			<HorizontalMenu>
				{menuLinks.map(menuLink => (
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
