import { FunctionComponent } from 'preact'

import { Logotype } from 'components/ui/logotype/Logotype'
import { OnlyAdmin } from 'components/util/only-admin'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import { isNotFound } from 'context/not-found-signal'

import './style.css'

const menu = [
	{
		href: ROUTE_LINK.projectIndex,
		name: 'Сделал',
	},
	{
		href: ROUTE_LINK.serviceIndex,
		name: 'Сервисы',
	},
	{
		href: ROUTE_LINK.accordIndex,
		name: 'Аккорды',
	},
	{
		href: ROUTE_LINK.tourismIndex,
		name: 'Путешествую',
	},
	{
		href: ROUTE_LINK.merchantIndex,
		name: 'Магазин',
	},
	{
		href: ROUTE_LINK.listListMain,
		name: 'Спискота',
	},
] as const

const secretMenu = [
	// TODO: [BACKEND] всё же сделать публичным, но сейчас бэк сломан
	{
		href: ROUTE_LINK.nokiaIndex,
		name: 'Нокиа',
	},
	{
		href: ROUTE_LINK.adminIndex,
		name: 'Админ',
	},
] as const

type HeaderPropsType = {}

export const MainHeader: FunctionComponent<HeaderPropsType> = () => {
	if (isNotFound.value) {
		return null
	}

	return (
		<header className="main-header">
			<div className="main-header__container">
				<Logotype />
				<div className="main-header__menu">
					{menu.map(i => (
						<a key={i.href} href={i.href}>{i.name}</a>
					))}
					<OnlyAdmin>
						{secretMenu.map(i => (
							<a key={i.href} href={i.href}>{i.name}</a>
						))}
					</OnlyAdmin>
				</div>
			</div>
		</header>
	)
}
