import { FunctionComponent } from 'preact'
import { MoscowMuseumType } from 'components/tourism/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { MuseumGallery } from 'components/tourism/museum-gallery'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import '../tourism-style.css'

export const TourismMoscowMuseumPage: FunctionComponent = () => {
	usePageTitle('Список музеев Москвы')

	const [ moscowMuseums ] = useJsonApi<MoscowMuseumType[]>('/json/tourism/moscow-museum.json')
	const isLoading = useLoadingState([moscowMuseums.status])
	const isError = moscowMuseums.status === 'ERROR'

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
				<TourismHeader main>Список музеев Москвы</TourismHeader>
				<TourismSecondary>
					Список музеев Москвы для посещения
				</TourismSecondary>
			</TextContainer>

			<TextContainer>
				{(isError
					? (<NotFoundData />)
					: (<MuseumGallery museums={moscowMuseums.data} />)
				)}
			</TextContainer>
		</div>
	)
}
