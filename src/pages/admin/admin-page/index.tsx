import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/fetch/use-auth'

import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const AdminPage: FunctionComponent = () => {
	const { isAuth, isAuthLoaded, redirectToLogin } = useAuth()
	if (!isAuth && isAuthLoaded) {
		redirectToLogin()
	}

	return (
		<Layout title="Админка" className="obuchenie-page">
			<TextContainer>
				<h1>Административная страница</h1>
			</TextContainer>

			<TextContainer>
				<h2>Каналы</h2>
				<a href={EXTERNAL_LINK.canalRak}>Раковарня</a> (<a href={EXTERNAL_LINK.canalRakAdmin}>Админка</a>)
				<br />
				<a href={EXTERNAL_LINK.canalHigimo}>Хигимо</a>
				<br />
				<a href={EXTERNAL_LINK.canalScreen}>Скриншотил</a>
			</TextContainer>

			<TextContainer>
				<h2>Хомяк</h2>
			</TextContainer>

			<div class="container-row">

				<div class="container-panel--50">
					<TextContainer>
						<h3>Пиши портфолио</h3>
						<br />
						<a href={ROUTE_LINK.projectTable}>Таблица сделанного портфолио</a>
						<br />
						<a href={ROUTE_LINK.petProjectCreate}>Создание пэт-проекта</a> (<a href={ROUTE_LINK.petProjectEdit_CONST}>Редактирование проекта</a>)
					</TextContainer>
				</div>

				<div class="container-panel--50">
					<TextContainer>
						<h3>Описывай свою жизнь</h3>
						<br />
						<a href={ROUTE_LINK.nokiaIndex}>Нокиа</a>
						<br />
						<a href={ROUTE_LINK.nokiaPinarik}>Пинарик</a>
					</TextContainer>
				</div>

				<div class="container-panel--50">
					<TextContainer>
						<h3>Разбирай коллекцию</h3>
						<br />
						<a href={ROUTE_LINK.libraryForm}>Библиотека</a>
					</TextContainer>
					<TextContainer>
						Разрабатывай
						<br />
						<a href={ROUTE_LINK.typo}>Типография</a>
					</TextContainer>
				</div>
			</div>

			<TextContainer>
				<h3>Чё-то там</h3>
				<br />
				<a href={ROUTE_LINK.igLink}>Инста-ссылки</a>
			</TextContainer>
		</Layout>
	)
}
