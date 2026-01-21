import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { NasheLineupItem } from 'components/data/concert/nashe-lineup-item'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../../tourism-style.css'
import './style.css'

export const NasheSinglePage: FunctionComponent = () => {
	usePageTitle('Нашествие')

	return (
		<div className="nashe-single-page tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<NasheLineupItem />
			<TextContainer>
				<h2>Другие года</h2>
				<NasheLineupGallery />
			</TextContainer>
		</div>
	)
}
