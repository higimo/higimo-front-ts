import { FunctionComponent } from 'preact'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { useGlobalContext } from 'context/global'
import { Logotype } from 'components/ui/logotype-mini'
import { OnlyAdmin } from 'components/util/only-admin'

const menu = [
	{
		href: ROUTE_LINKS.projectIndex,
		name: 'Сделал',
	},
	{
		href: ROUTE_LINKS.listListIndex,
		name: 'Спискота',
	},
	{
		href: ROUTE_LINKS.accordIndex,
		name: 'Аккорды',
	},
	{
		href: ROUTE_LINKS.tourismIndex,
		name: 'Путешествую',
	},
] as const

const secretMenu = [
	// TODO: всё же сделать публичным
	{
		href: ROUTE_LINKS.listListIndex,
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
	const { isNotFound } = useGlobalContext()
	if (isNotFound) {
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
