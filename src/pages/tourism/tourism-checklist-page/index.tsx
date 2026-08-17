import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismChecklist } from 'components/tourism/tourism-checklist'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../tourism-style.css'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

export const TourismChecklistPage: FunctionComponent = () => {
	usePageTitle('Чек-лист туриста')

	return (
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
	)
}
