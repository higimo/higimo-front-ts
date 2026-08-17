import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { NasheAlbums } from 'components/data/concert/nashe-albums'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import '../../tourism-style.css'
import './style.css'

export const NasheIndexPage: FunctionComponent = () => {
	usePageTitle('Нашествие')

	return (
		<div className="nashe-index-page tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>
					Нашествие
				</TourismHeader>
				<TourismSecondary>
					Я дважды был на Нашествии. В 2017 и 2018 годах.
				</TourismSecondary>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Лайнапы Нашествия
				</TourismHeader>
				<TourismSecondary>
					С подсветами того, что посетил.
				</TourismSecondary>
				<NasheLineupGallery />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Фотоотчёты Нашествия во ВКонтакте
				</TourismHeader>
				<NasheAlbums />
			</TextContainer>
		</div>
	)
}
