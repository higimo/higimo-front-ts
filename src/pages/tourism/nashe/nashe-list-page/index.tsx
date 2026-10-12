import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Layout } from 'components/ui/layout/Layout'
import { NasheAlbumList } from 'components/tourism/concert/nashe-album-list'
import { NasheLineupList } from 'components/tourism/concert/nashe-lineup-list'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/ui/tourism-header'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import '../../tourism-style.css'

export const NasheListPage: FunctionComponent = () => (
	<Layout title="Нашествие" className="nashe-index-page tourism-identy-page">
		<TourismMainMenu />

		<TextContainer>
			<Breadcrumps />
		</TextContainer>

		<TextContainer>
			<TourismHeader main>Нашествие</TourismHeader>
			<TourismSecondary>
				Я дважды был на Нашествии. В 2017 и 2018 годах.
			</TourismSecondary>
		</TextContainer>

		<TextContainer>
			<TourismHeader secondary>Лайнапы Нашествия</TourismHeader>
			<TourismSecondary>
				С подсветами того, что посетил.
			</TourismSecondary>
			<NasheLineupList />
		</TextContainer>

		<TextContainer>
			<TourismHeader secondary>Фотоотчёты Нашествия во ВКонтакте</TourismHeader>
			<NasheAlbumList />
		</TextContainer>
	</Layout>
)
