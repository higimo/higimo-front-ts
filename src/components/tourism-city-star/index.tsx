import { FunctionComponent } from 'preact'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

import './style.css'
import { BackgroundImage } from 'components/ui/background-image'
import { FullWidthColumn, FullWidthContainer } from 'components/ui/full-width-container'
import { OnlyAdmin } from 'components/util/only-admin'

export const TourismCityStarForm: FunctionComponent = () => (
	<OnlyAdmin>
		<BackgroundImage src="/img/moscow.png" className="tourism-city-star">
			<FullWidthContainer>
				<FullWidthColumn>
					<h2 className="tourism-city-star__header"><a href={EXTERNAL_LINKS.tourismReviewForm}>Оценка городов</a></h2>
				</FullWidthColumn>
				<FullWidthColumn className="tourism-city-star__content">
					<h2 className="tourism-city-star__header">(<a href={EXTERNAL_LINKS.tourismReviewEditForm}>редактор формы</a>)</h2>
				</FullWidthColumn>
			</FullWidthContainer>
		</BackgroundImage>
	</OnlyAdmin>
)
