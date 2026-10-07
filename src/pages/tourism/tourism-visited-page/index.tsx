import { AdmOrkugMoscow, Castle, Country, DistrictMoscow, Placefield, PovType, SubjectFederation, Town, TownMoscow } from 'api-types/tourism.types'
import { FunctionComponent } from 'preact'

import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMainStatistic } from 'components/tourism/tourism-main-statistic'
import { TourismStatisticVisualizer } from 'components/tourism/tourism-statistic-visualizer'

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
	// TODO: [BACKEND] вынести в бекенд API из JSON
	const [ jsonCollection ] = useMultiJsonApi<VisitedDataType>({
		admOrkugMoscow:    '/json/tourism/admin-okrug-moscow.json',
		castle:            '/json/tourism/castle.json',
		country:           '/json/tourism/country.json',
		districtMoscow:    '/json/tourism/district-moscow.json',
		placefield:        '/json/tourism/placefield.json',
		subjectFederation: '/json/tourism/subject-federation.json',
		townMoscow:        '/json/tourism/town-moscow.json',
		town:              '/json/tourism/town.json',
	})

	const povList: PovType[] = ([] as PovType[])
		.concat(jsonCollection.admOrkugMoscow.data || [])
		.concat(jsonCollection.castle.data || [])
		.concat(jsonCollection.country.data || [])
		.concat(jsonCollection.districtMoscow.data || [])
		.concat(jsonCollection.placefield.data || [])
		.concat(jsonCollection.subjectFederation.data || [])
		.concat(jsonCollection.townMoscow.data || [])
		.concat(jsonCollection.town.data || [])

	const jsonDateArr = [
		jsonCollection.admOrkugMoscow,
		jsonCollection.castle,
		jsonCollection.country,
		jsonCollection.districtMoscow,
		jsonCollection.placefield,
		jsonCollection.subjectFederation,
		jsonCollection.townMoscow,
		jsonCollection.town,
	]

	return (
		<Layout title="Результаты путешествий" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Результаты путешествий</TourismHeader>
			</TextContainer>

			<LoadSuspense data={jsonDateArr}>
				<EmptyData data={jsonDateArr}>
					<TourismMainStatistic totalStatistic={povList} />
					<TourismStatisticVisualizer pov={povList} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
