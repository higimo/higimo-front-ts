import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { TextContainer } from '../../../../components/ui/text-container'
import { NasheLineupGallery } from '../../../../components/data/concert/nashe-lineup-gallery'
import { NasheLineupItem } from '../../../../components/data/concert/nashe-lineup-item'
import { Breadcrumps } from '../../../../components/ui/breadcrumps'
import { TourismMainMenu } from '../../../../components/tourism/tourism-main-menu'

import './style.css'
import '../../tourism-style.css'

export const NasheSinglePage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Нашествие'

	return (
		<div className="nashe-single-page tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<NasheLineupItem />
			<TextContainer>
				<h2>Другие года</h2>
				<NasheLineupGallery />
			</TextContainer>
		</div>
	)
}
