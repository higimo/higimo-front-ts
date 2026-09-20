import { FunctionComponent } from 'preact'

import { Logotype } from 'components/ui/logotype-mini'
import { OnlyAdmin } from 'components/util/only-admin'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import { isNotFound } from 'context/global'

import './style.css'

const menu = [
	{
		href: ROUTE_LINKS.projectIndex,
		name: 'Сделал',
	},
	{
		href: ROUTE_LINKS.serviceIndex,
		name: 'Сервисы',
	},
	{
		href: ROUTE_LINKS.accordIndex,
		name: 'Аккорды',
	},
	{
		href: ROUTE_LINKS.tourismIndex,
		name: 'Путешествую',
	},
	{
		href: ROUTE_LINKS.merchantIndex,
		name: 'Магазин',
	},
] as const

const secretMenu = [
	// TODO: [BACKEND] всё же сделать публичным, но сейчас бэк сломан
	{
		href: ROUTE_LINKS.listListMain,
		name: 'Спискота',
	},
	{
		href: ROUTE_LINKS.nokiaIndex,
		name: 'Нокиа',
	},
	{
		href: ROUTE_LINKS.adminIndex,
		name: 'Админ',
	},
] as const

type HeaderPropsType = {}
export const Header: FunctionComponent<HeaderPropsType> = () => {
	if (isNotFound.value) {
		return null
	}

	return (
		<header className="main-header">
			<div className="main-header__container">
				<Logotype />
				<div className="main-header__menu">
					{menu.map(i => <a href={i.href} key={i.href}>{i.name}</a>)}
					<OnlyAdmin>
						{secretMenu.map(i => <a href={i.href} key={i.href}>{i.name}</a>)}
					</OnlyAdmin>
				</div>
			</div>
		</header>
	)
}
