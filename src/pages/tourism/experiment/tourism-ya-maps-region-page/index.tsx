import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/ui/tourism-header'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismMapsRegion } from 'components/tourism/tourism-maps/tourism-maps-region'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'

import '../../tourism-style.css'
import '../yandex-map.css'

export const TourismYaMapsRegionPage: FunctionComponent = () => (
	<Layout title="Карта регионов России" className="tourism-identy-page">
		<TourismMainMenu />

		<TextContainer>
			<Breadcrumps />
		</TextContainer>

		<TextContainer>
			<TourismHeader main>Карта регионов России</TourismHeader>
		</TextContainer>

		<TextContainer>
			<TourismSecondary>
				<a href={EXTERNAL_LINK.wikiIso3166}>ISO 3166-2:RU</a>
			</TourismSecondary>
			<TourismSecondary>
				Синеньким то, куда хочется сгонять
			</TourismSecondary>
		</TextContainer>

		<TourismMapsRegion />
	</Layout>
)
