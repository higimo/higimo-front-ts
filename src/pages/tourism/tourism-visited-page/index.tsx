import { AdmOrkugMoscow, Castle, Country, DistrictMoscow, Placefield, PovType, SubjectFederation, Town, TownMoscow } from 'components/tourism/types'
import { FunctionComponent } from 'preact'

import { useEffect, useState } from 'preact/hooks'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useJsonApi } from 'hook/fetch/use-json-api'

import { TextContainer } from 'components/ui/text-container'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
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

type PovListType = { isLoading: true, data: null } | { isLoading: false, data: PovType[] }

const usePovList = (): PovListType => {
	const [result, setResult] = useState<PovListType>({
		isLoading: true,
		data: null,
	})

	// TODO: [BACKEND] вынести в бекенд API из JSON
	const admOrkugMoscow    = useJsonApi<AdmOrkugMoscow[]>('/json/tourism/admin-okrug-moscow.json')
	const castle            = useJsonApi<Castle[]>('/json/tourism/castle.json')
	const country           = useJsonApi<Country[]>('/json/tourism/country.json')
	const districtMoscow    = useJsonApi<DistrictMoscow[]>('/json/tourism/district-moscow.json')
	const placefield        = useJsonApi<Placefield[]>('/json/tourism/placefield.json')
	const subjectFederation = useJsonApi<SubjectFederation[]>('/json/tourism/subject-federation.json')
	const townMoscow        = useJsonApi<TownMoscow[]>('/json/tourism/town-moscow.json')
	const town              = useJsonApi<Town[]>('/json/tourism/town.json')

	useEffect(() => {
		const isLoading = admOrkugMoscow === null || castle === null || country === null
			|| districtMoscow === null || placefield === null || subjectFederation === null
			|| townMoscow === null || town === null
		if (isLoading) {
			if (!result.isLoading) {
				setResult({ isLoading: true, data: null })
			}
			return
		}

		const combined: PovType[] = ([] as unknown as PovType[])
			.concat(admOrkugMoscow)
			.concat(castle)
			.concat(country)
			.concat(districtMoscow)
			.concat(placefield)
			.concat(subjectFederation)
			.concat(townMoscow)
			.concat(town)
		setResult({ isLoading: false, data: combined })
	}, [admOrkugMoscow, castle, country, districtMoscow, placefield, subjectFederation, townMoscow, town])

	return result
}

export const TourismVisitedPage: FunctionComponent = () => {
	usePageTitle('Результаты путешествий')

	const { isLoading, data } = usePovList()

	if (isLoading) {
		return <Loading />
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

			<TourismMainStatistic totalStatistic={data} />

			<TourismStatisticVisualizer pov={data} />
		</div>
	)
}
