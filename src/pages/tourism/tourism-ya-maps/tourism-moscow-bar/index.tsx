import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapsMoscowBar } from 'components/tourism/tourism-maps-moscow-bar'

import '../../tourism-style.css'

// TODO: Золотые настойки: Графин, Васечка и Сионист
// TODO: Ввести тег франшизы
// TODO: Добавить рекомендуемые бары. Например, секретные
// TODO: Ввести рейтинг звездочками
// TODO: Средний чек
// TODO: Что заказывать
// TODO: Добавить алкашки, что открыли со Стёпой за 2024 год

export const TourismMoscowBarPage: FunctionComponent = () => {
	usePageTitle('Московские бары')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Московские бары</h1>
			</TextContainer>
			<TourismMapsMoscowBar />
		</div>
	)
}
