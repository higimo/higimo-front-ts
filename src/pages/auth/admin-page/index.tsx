import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useAuth } from 'hook/fetch/use-auth'

import { TextContainer } from 'components/ui/text-container'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const AdminPage: FunctionComponent = () => {
	usePageTitle('Админка')

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
			</TextContainer>
			<div class="container-row">
				<div class="container-panel--50">
					<TextContainer>
						<h3>Пиши портфолио</h3>
						<br />
						<a href={ROUTE_LINKS.projectTable}>Таблица сделанного портфолио</a>
						<br />
						<a href={ROUTE_LINKS.petProjectCreate}>Создание пэт-проекта</a> (<a href={ROUTE_LINKS.petProjectEdit_CONST}>Редактирование проекта</a>)
					</TextContainer>
				</div>
				<div class="container-panel--50">
					<TextContainer>
						<h3>Описывай свою жизнь</h3>
						<br />
						<a href={ROUTE_LINKS.nokiaIndex}>Нокиа</a>
						<br />
						<a href={ROUTE_LINKS.nokiaPinarik}>Пинарик</a>
					</TextContainer>
				</div>
				<div class="container-panel--50">
					<TextContainer>
						<h3>Разбирай коллекцию</h3>
						<br />
						<a href={ROUTE_LINKS.libraryAdmin}>Библиотека</a>
					</TextContainer>
					<TextContainer>
						Разрабатывай
						<br />
						<a href={ROUTE_LINKS.typo}>Типография</a>
					</TextContainer>
				</div>
			</div>
			<TextContainer>
				<h3>Чё-то там</h3>
				<br />
				<a href={ROUTE_LINKS.igLink}>Инста-ссылки</a>
			</TextContainer>
		</div>
	)
}
