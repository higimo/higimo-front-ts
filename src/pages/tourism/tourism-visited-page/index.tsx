import { AdmOrkugMoscow, Castle, Country, DistrictMoscow, Placefield, PovType, SubjectFederation, Town, TownMoscow } from 'components/tourism/types'
import { FunctionComponent } from 'preact'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { TextContainer } from 'components/ui/text-container'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
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

export const TourismVisitedPage: FunctionComponent = () => {
	usePageTitle('Результаты путешествий')

	// TODO: [BACKEND] вынести в бекенд API из JSON
	const [ admOrkugMoscow ]    = useJsonApi<AdmOrkugMoscow[]>('/json/tourism/admin-okrug-moscow.json')
	const [ castle ]            = useJsonApi<Castle[]>('/json/tourism/castle.json')
	const [ country ]           = useJsonApi<Country[]>('/json/tourism/country.json')
	const [ districtMoscow ]    = useJsonApi<DistrictMoscow[]>('/json/tourism/district-moscow.json')
	const [ placefield ]        = useJsonApi<Placefield[]>('/json/tourism/placefield.json')
	const [ subjectFederation ] = useJsonApi<SubjectFederation[]>('/json/tourism/subject-federation.json')
	const [ townMoscow ]        = useJsonApi<TownMoscow[]>('/json/tourism/town-moscow.json')
	const [ town ]              = useJsonApi<Town[]>('/json/tourism/town.json')

	const statusList = [
		admOrkugMoscow.status, castle.status, country.status,
		districtMoscow.status, placefield.status, subjectFederation.status,
		townMoscow.status, town.status,
	]
	const isLoading = useLoadingState(statusList)
	const isError = statusList.some(status => status === 'ERROR')

	if (isLoading) {
		return <Loading />
	}

	const data: PovType[] = ([] as PovType[])
			.concat(admOrkugMoscow.data)
			.concat(castle.data)
			.concat(country.data)
			.concat(districtMoscow.data)
			.concat(placefield.data)
			.concat(subjectFederation.data)
			.concat(townMoscow.data)
			.concat(town.data)

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
						<TourismMainStatistic totalStatistic={data} />
						<TourismStatisticVisualizer pov={data} />
					</>
				)
			)}
		</div>
	)
}
