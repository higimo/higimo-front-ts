import { FunctionComponent } from 'preact'
import { Coord } from 'utils.type'

import { useLazyLoadData } from 'hook/use-lazy-load-data'
import { usePageTitle } from 'hook/use-page-title'

import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { PovType } from 'components/tourism/data/russia-city2'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import 'pages/tourism/tourism-style.css'
import './style.css'

export const TourismFatherTrackPage: FunctionComponent = () => {
	const stateData = useLazyLoadData<{
		mainTrack: Coord[],
		cities: PovType[],
	}>(import('components/tourism/data/father-track'))

	const lines = stateData?.mainTrack
	const cities = stateData?.cities

	usePageTitle('Путешествие с отцом')

	if (!stateData) {
		return <Loading />
	}

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			{/* <Breadcrumps /> */}
			<TextContainer>
				<h1>Путешествие с отцом</h1>
			</TextContainer>
			<TextContainer className="car-list">
				74 часа на дорогу
				14 городов

				<h2>День 1</h2>
				<div>
					<div class="car-roadmap">10:00 Выезд из Нижнего Новгорода</div>
					<div class="car-teleport">1ч 30м</div>
					<div class="car-roadmap car-roadmap--maybe">11:30—14:30 3ч Выкса</div>
					<div class="car-teleport">8ч 50м</div>
					<div class="car-roadmap">18:50—23:00 5ч Саратов (21:50)</div>
					<div class="night-stay">Ночёвка в Саратове</div>
				</div>

				<h2>День 2</h2>
				<div>
					<div class="car-roadmap">10:00 Выезд из Саратова</div>
					<div class="car-teleport">6ч</div>
					<div class="car-roadmap">16:00—21:00 5ч Волгоград</div>
					<div class="night-stay">Ночёвка в Волгограде</div>
				</div>

				<h2>День 3</h2>
				<div>
					10:00 Выезд из Волгограда
					<div class="car-teleport">5ч</div>
					15:00—19:00 4ч Астрахань
					<div class="night-stay">Ночёвка в Астрахани</div>
				</div>

				<h2>День 4</h2>
				<div>
					10:00 Выезд из Астрахани
					<div class="car-teleport">4ч</div>
					14:00—17:00 3ч Элиста
					<div class="car-teleport">3ч</div>
					20:00—23:00 3ч Ставрополь
					<div class="night-stay">Ночёвка в Ставрополе</div>
				</div>

				<h2>День 5</h2>
				<div>
					10:00 Выезд из Ставрополя
					<div class="car-teleport">3ч</div>
					13:00—14:00 1ч Суворовские термальные ванны
					<div class="car-teleport">6ч (через Джилы-Су)</div>
					21:00—23:00 2ч Пятигорск / Черкесск / Невинномысск
					<div class="night-stay">Ночёвка</div>
				</div>

				<h2>День 6 (ночь в горах)</h2>
				<div>
					10:00 Выезд
					<div class="car-teleport">13ч</div>
					23:00 5ч Красная Поляна
					<div class="night-stay">Ночёвка в Красная Поляна</div>
				</div>

				<h2>День 7 (ночь на море)</h2>
				<div>
					10:00 Выезд из Красной поляны
					<div class="car-teleport">8ч</div>
					18:00—23:00 5ч Геленджик
					<div class="car-teleport">2ч</div>
					<div class="night-stay">Ночёвка в Геленджике</div>
					<div class="car-roadmap car-roadmap--maybe">11:30—14:30 3ч Выкса (за 8ч до Краснодара)</div>
				</div>

				<h2>День 8 (ночь в Ростове)</h2>
				<div>
					10:00 Выезд из Геленджика
					<div class="car-teleport">3ч</div>
					13:00—18:00 5ч Краснодар
					<div class="car-teleport">3ч</div>
					21:00—23:00 2ч Ростов-на-Дону
					<div class="night-stay">Ночёвка в Ростове-на-Дону</div>
				</div>

				<h2>День 9</h2>
				<div>
					10:00—11:00 1ч Ростов-на-Дону
					<div class="car-teleport">7ч</div>
					18:00—21:00 3ч Воронеж
					<div class="car-teleport">7ч</div>

				</div>
				<h2>21:00 Финиш в Москве</h2>
				<div>
					Орёл
					Курск
				</div>
			</TextContainer>
			<TourismMapGeo<PovType, Coord>
				lines={lines}
				items={cities}
			/>
		</div>
	)
}

export default TourismFatherTrackPage
