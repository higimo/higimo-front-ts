import { FunctionComponent } from 'preact'
import { MoscowMuseumType } from 'api-types/tourism.types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MuseumList } from 'components/tourism/museum-list'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading/Heading'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import '../../tourism-style.css'

export const TourismMoscowMuseumPage: FunctionComponent = () => {
	const [ moscowMuseumListJsonItem ] = useJsonApi<MoscowMuseumType[]>('/json/tourism/moscow-museum.json')

	return (
		<Layout title="Список музеев Москвы" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism">Список музеев Москвы</Heading>
				<TourismSecondary>
					Список музеев Москвы для посещения
				</TourismSecondary>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={moscowMuseumListJsonItem}>
					<EmptyData data={moscowMuseumListJsonItem}>
						<MuseumList
							moscowMuseumList={moscowMuseumListJsonItem.data ?? []}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
