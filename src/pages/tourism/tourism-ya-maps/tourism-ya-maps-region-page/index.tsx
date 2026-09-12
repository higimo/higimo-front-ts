import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapsRegion } from 'components/tourism/tourism-maps-region'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

import '../../tourism-style.css'
import '../../yandex-map.css'

export const TourismYaMapsRegionPage: FunctionComponent = () => {
	usePageTitle('Карта регионов России')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Карта регионов России</TourismHeader>
			</TextContainer>

			<TextContainer>
				<TourismSecondary>
					<a href={EXTERNAL_LINKS.wikiIso3166}>ISO 3166-2:RU</a>
				</TourismSecondary>
				<TourismSecondary>
					Синеньким то, куда хочется сгонять
				</TourismSecondary>
			</TextContainer>

			<TourismMapsRegion />
		</div>
	)
}
