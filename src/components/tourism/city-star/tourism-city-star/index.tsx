import { FunctionComponent } from 'preact'

import { BackgroundImage } from 'components/ui/background-image'
import { FullWidthColumn, FullWidthContainer } from 'components/ui/full-width-container'
import { OnlyAdmin } from 'components/util/only-admin'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'

import './style.css'

export const TourismCityStarForm: FunctionComponent = () => (
	<OnlyAdmin>
		<BackgroundImage src="/img/moscow.png" className="tourism-city-star">
			<FullWidthContainer>
				<FullWidthColumn>
					<h2 className="tourism-city-star__header"><a href={EXTERNAL_LINK.tourismReviewForm}>Оценка городов</a></h2>
				</FullWidthColumn>
				<FullWidthColumn className="tourism-city-star__content">
					<h2 className="tourism-city-star__header">(<a href={EXTERNAL_LINK.tourismReviewEditForm}>редактор формы</a>)</h2>
				</FullWidthColumn>
			</FullWidthContainer>
		</BackgroundImage>
	</OnlyAdmin>
)
