import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
// import { NasheAlbums } from 'components/data/concert/nashe-albums'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'

import '../../tourism-style.css'
import './style.css'

export const NasheIndexPage: FunctionComponent = () => {
	document.title = 'Нашествие'

	return (
		<div className="nashe-index-page tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<PrecentationContainer>
				<TextContainer>
					Я дважды был на Нашествии. В 2017 и 2018 годах.
				</TextContainer>
			</PrecentationContainer>
			{/* TODO: вывести фотоотчёты */}
			{/* <PrecentationContainer>
				<TextContainer>
					<h2>Фотоотчёты во ВКонтакте</h2>
				</TextContainer>
				<NasheAlbums />
			</PrecentationContainer> */}
			<PrecentationContainer>
				<TextContainer>
					<h2>Лайнапы</h2>
				</TextContainer>
				<TextContainer>
					<p>
						С подсветами того, что я посетил.
					</p>
				</TextContainer>
				<NasheLineupGallery />
			</PrecentationContainer>
		</div>
	)
}
