import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Heading } from 'components/ui/heading/Heading'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { TourismChecklist } from 'components/tourism/ui/tourism-checklist'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import '../tourism-style.css'

export const TourismChecklistPage: FunctionComponent = () => (
	<Layout title="Чек-лист туриста" className="tourism-identy-page">
		<TourismMainMenu />

		<TextContainer>
			<Breadcrumps />
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism">Чек-лист туриста</Heading>
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
	</Layout>
)
