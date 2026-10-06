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
	const [ data ] = useMultiJsonApi<VisitedDataType>({
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
		.concat(data.admOrkugMoscow.data || [])
		.concat(data.castle.data || [])
		.concat(data.country.data || [])
		.concat(data.districtMoscow.data || [])
		.concat(data.placefield.data || [])
		.concat(data.subjectFederation.data || [])
		.concat(data.townMoscow.data || [])
		.concat(data.town.data || [])

	const jsonDateArr = [
		data.admOrkugMoscow,
		data.castle,
		data.country,
		data.districtMoscow,
		data.placefield,
		data.subjectFederation,
		data.townMoscow,
		data.town,
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
