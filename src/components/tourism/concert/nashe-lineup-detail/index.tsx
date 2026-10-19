import { FunctionComponent } from 'preact'
import { NasheType } from 'api-types/nashe.types'

import { Heading } from 'components/ui/heading'
import { NasheScheduleTable } from 'components/tourism/concert/nashe-schedule-table'
import { TextContainer } from 'components/ui/text-container'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import './style.css'

type NasheLineupDetailPropsType = {
	curYear: number
	mainScene: NasheType[]
	secondScene: NasheType[]
}

const headers = ['Дата', 'Время', 'Название']

export const NasheLineupDetail: FunctionComponent<NasheLineupDetailPropsType> = ({
	curYear,
	mainScene,
	secondScene,
}) => (
	<div className="nashe-lineup">
		<TextContainer>
			<Heading variant="tourism">Нашествие {curYear}</Heading>
			<TourismSecondary>
				<span style={{ color: 'var(--color-accent)' }}>★</span> — посетил
			</TourismSecondary>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>
				Главная сцена
			</Heading>
			<NasheScheduleTable headers={headers} data={mainScene} />
		</TextContainer>
		<TextContainer>
			<Heading variant="tourism" level={2}>
				Сцена 2.0
			</Heading>
			<NasheScheduleTable headers={headers} data={secondScene} />
		</TextContainer>
	</div>
)
