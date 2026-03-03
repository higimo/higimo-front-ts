import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'
import { useAuth } from 'hook/use-auth'

import { TextContainer } from 'components/ui/text-container'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const AdminPage: FunctionComponent = () => {
	usePageTitle('Настольные игры')

	const { isAuth, isAuthLoaded, redirectToLogin } = useAuth()
	if (!isAuth && isAuthLoaded) {
		redirectToLogin()
	}

	return (
		<div className="obuchenie-page">
			<TextContainer>
				<h1>Административная страница</h1>
			</TextContainer>
			<TextContainer>
				<h2>Каналы</h2>
				<a href={EXTERNAL_LINKS.canalRak}>Раковарня</a> (<a href={EXTERNAL_LINKS.canalRakAdmin}>Админка</a>)
				<br />
				<a href={EXTERNAL_LINKS.canalHigimo}>Хигимо</a>
				<br />
				<a href={EXTERNAL_LINKS.canalScreen}>Скриншотил</a>
			</TextContainer>
			<TextContainer>
				<h2>Хомяк</h2>
				<a href={ROUTE_LINKS.projectTable}>Таблица сделанного портфолио</a>
				<br />
				<a href={ROUTE_LINKS.nokiaIndex}>Нокиа</a>
				<br />
				<a href={ROUTE_LINKS.nokiaPinarik}>Пинарик</a>
				<br />
				<a href={ROUTE_LINKS.libraryAdmin}>Библиотека</a>
				<br />
				<a href={ROUTE_LINKS.typo}>Типография</a>
				<br />
				<a href={ROUTE_LINKS.igLink}>Инста-ссылки</a>
				<br />
				<a href={ROUTE_LINKS.toolIndex}>Тулы</a>
				<br />
				<a href={ROUTE_LINKS.petProjectCreate}>Создание пэт-проекта</a> (<a href={ROUTE_LINKS.petProjectEdit_CONST}>Редактирование проекта</a>)
			</TextContainer>
		</div>
	)
}
