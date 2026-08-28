import { FunctionComponent } from 'preact'

import { useLazyLoadData } from 'hook/use-lazy-load-data'
import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'

import { TourismMainStatistic } from 'components/tourism/tourism-main-statistic/TourismMainStatistic'
import { TourismStatisticVisualizer } from 'components/tourism/tourism-statistic-visualizer/TourismStatisticVisualizer'
import { PovType } from 'components/tourism/data/types'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { Breadcrumps } from 'components/ui/breadcrumps'

import '../tourism-style.css'

import './style.css'
import { TourismHeader } from 'components/tourism/tourism-header'

// TODO: [FEATURE] Следующим этапом подгружу оставшиеся списки для посещений:
// крепости, памятники, музеи, POI Москвы, станции метро Москвы. И введу метку «хочу».
// Потому что ЗАТО я хочу посетить только один — Центр подготовки космонавтов, но хорошо бы собрать и остальные.
// Когда дособеру — можно будет и на БД переносить.
// TODO: [FEATURE] Наконец, надо задизайнить процесс, как писать «отчёты» о городах.
// Может быть, я начну с парочки в markdown, чтобы сформулировать стиль и форму.

export const TourismVisitedPage: FunctionComponent = () => {
	usePageTitle('Результаты путешествий')

	const stateData = useLazyLoadData<{ russiaCity: PovType[] }>(import('components/tourism/data/common'))

	if (!stateData) {
		return null
	}
	if ((stateData?.russiaCity?.length || 0) === 0) {
		return null
	}

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Результаты путешествий</TourismHeader>
			</TextContainer>

			<TourismMainStatistic totalStatistic={stateData.russiaCity} />

			<TourismStatisticVisualizer pov={stateData.russiaCity} />
		</div>
	)
}
