import { FunctionComponent } from 'preact'
import { MoscowMuseumType } from 'api-types/tourism.types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MuseumGallery } from 'components/tourism/museum-gallery'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import '../tourism-style.css'

export const TourismMoscowMuseumPage: FunctionComponent = () => {
	const [ moscowMuseums ] = useJsonApi<MoscowMuseumType[]>('/json/tourism/moscow-museum.json')

	return (
		<Layout title="Список музеев Москвы">
			<div className="tourism-identy-page">
				<TourismMainMenu />

				<TextContainer>
					<Breadcrumps />
				</TextContainer>

				<TextContainer>
					<TourismHeader main>Список музеев Москвы</TourismHeader>
					<TourismSecondary>
						Список музеев Москвы для посещения
					</TourismSecondary>
				</TextContainer>

				<TextContainer>
					<LoadSuspense data={moscowMuseums}>
						<EmptyData data={moscowMuseums}>
							<MuseumGallery museums={moscowMuseums.data} />
						</EmptyData>
					</LoadSuspense>
				</TextContainer>
			</div>
		</Layout>
	)
}
