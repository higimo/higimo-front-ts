import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { TourismChecklist } from 'components/tourism/tourism-checklist'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import '../tourism-style.css'

export const TourismChecklistPage: FunctionComponent = () => (
	<Layout title="Чек-лист туриста">
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>
					Чек-лист туриста
				</TourismHeader>
			</TextContainer>

			<TextContainer>
				<TourismSecondary>
					Даже если перезагрузить страницу, отмеченные
					пункты останутся — они запомнились внутри браузера.
					Данные никуда не передавались, так что поотмечав на телефоне,
					продолжить на компьютере уже не выйдет.
				</TourismSecondary>
			</TextContainer>

			<TourismChecklist />
		</div>
	</Layout>
)
