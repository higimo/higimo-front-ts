import { FunctionComponent } from 'preact'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { MoscowMuseumType } from 'components/tourism/data/museum-moscow'
import { MuseumGallery } from 'components/tourism/museum-gallery'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import '../tourism-style.css'

export const TourismMoscowMuseumPage: FunctionComponent = () => {
	usePageTitle('Список музеев Москвы')

	const moscowMuseums = useJsonApi<MoscowMuseumType[]>('/json/tourism/moscow-museum.json')

	if (moscowMuseums === null) {
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
				<MuseumGallery museums={moscowMuseums} />
			</TextContainer>
		</div>
	)
}
