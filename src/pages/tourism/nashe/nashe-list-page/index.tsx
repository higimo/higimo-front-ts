import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Layout } from 'components/ui/layout/Layout'
import { NasheAlbumList } from 'components/tourism/concert/nashe-album-list'
import { NasheLineupList } from 'components/tourism/concert/nashe-lineup-list'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading/Heading'
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
			<Heading variant="tourism">Нашествие</Heading>
			<TourismSecondary>
				Я дважды был на Нашествии. В 2017 и 2018 годах.
			</TourismSecondary>
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Лайнапы Нашествия</Heading>
			<TourismSecondary>
				С подсветами того, что посетил.
			</TourismSecondary>
			<NasheLineupList />
		</TextContainer>

		<TextContainer>
			<Heading variant="tourism" level={2}>Фотоотчёты Нашествия во ВКонтакте</Heading>
			<NasheAlbumList />
		</TextContainer>
	</Layout>
)
