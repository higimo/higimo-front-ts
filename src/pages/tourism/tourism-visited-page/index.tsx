import { AdmOrkugMoscow, Castle, Country, DistrictMoscow, Placefield, PovType, SubjectFederation, Town, TownMoscow } from 'components/tourism/types'
import { FunctionComponent } from 'preact'

import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMainStatistic } from 'components/tourism/tourism-main-statistic/TourismMainStatistic'
import { TourismStatisticVisualizer } from 'components/tourism/tourism-statistic-visualizer/TourismStatisticVisualizer'

import '../tourism-style.css'

import './style.css'

// TODO: [FEATURE] Следующим этапом подгружу оставшиеся списки для посещений:
// крепости, памятники, музеи, POI Москвы, станции метро Москвы. И введу метку «хочу».
// Потому что ЗАТО я хочу посетить только один — Центр подготовки космонавтов, но хорошо бы собрать и остальные.
// Когда дособеру — можно будет и на БД переносить.
// TODO: [FEATURE] Наконец, надо задизайнить процесс, как писать «отчёты» о городах.
// Может быть, я начну с парочки в markdown, чтобы сформулировать стиль и форму.

type VisitedDataType = {
	admOrkugMoscow: AdmOrkugMoscow[]
	castle: Castle[]
	country: Country[]
	districtMoscow: DistrictMoscow[]
	placefield: Placefield[]
	subjectFederation: SubjectFederation[]
	townMoscow: TownMoscow[]
	town: Town[]
}

export const TourismVisitedPage: FunctionComponent = () => {
	usePageTitle('Результаты путешествий')

	// TODO: [BACKEND] вынести в бекенд API из JSON
	const [ data ] = useMultiJsonApi<VisitedDataType>({
		admOrkugMoscow: '/json/tourism/admin-okrug-moscow.json',
		castle: '/json/tourism/castle.json',
		country: '/json/tourism/country.json',
		districtMoscow: '/json/tourism/district-moscow.json',
		placefield: '/json/tourism/placefield.json',
		subjectFederation: '/json/tourism/subject-federation.json',
		townMoscow: '/json/tourism/town-moscow.json',
		town: '/json/tourism/town.json',
	})

	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	const povList: PovType[] = ([] as PovType[])
			.concat(data.data.admOrkugMoscow!)
			.concat(data.data.castle!)
			.concat(data.data.country!)
			.concat(data.data.districtMoscow!)
			.concat(data.data.placefield!)
			.concat(data.data.subjectFederation!)
			.concat(data.data.townMoscow!)
			.concat(data.data.town!)

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Результаты путешествий</TourismHeader>
			</TextContainer>

			{(isError
				? (<NotFoundData />)
				: (
					<>
						<TourismMainStatistic totalStatistic={povList} />
						<TourismStatisticVisualizer pov={povList} />
					</>
				)
			)}
		</div>
	)
}
