import { FunctionComponent } from 'preact'

import { NasheType } from 'api-types/nashe.types'
import { ScheduleTable } from 'components/data/concert/schedule-table'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import './style.css'

type NasheLineupItemPropsType = {
	curYear: number
	mainScene: NasheType[]
	secondScene: NasheType[]
}

const headers = ['Дата', 'Время', 'Название']

export const NasheLineupItem: FunctionComponent<NasheLineupItemPropsType> = ({
	curYear,
	mainScene,
	secondScene,
}) => (
	<div className="nashe-lineup">
		<TextContainer>
			<TourismHeader main>
				Нашествие {curYear}
			</TourismHeader>
			<TourismSecondary>
				<span style={{ color: 'var(--color-accent)' }}>★</span> — посетил
			</TourismSecondary>
		</TextContainer>

		<TextContainer>
			<TourismHeader secondary>
				Главная сцена
			</TourismHeader>
			<ScheduleTable headers={headers} data={mainScene} />
		</TextContainer>
		<TextContainer>
			<TourismHeader secondary>
				Сцена 2.0
			</TourismHeader>
			<ScheduleTable headers={headers} data={secondScene} />
		</TextContainer>
	</div>
)
