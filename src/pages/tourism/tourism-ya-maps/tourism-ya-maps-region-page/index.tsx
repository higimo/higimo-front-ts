import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { TourismMapsRegion } from 'components/tourism/tourism-maps-region'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

import '../../tourism-style.css'

export const TourismYaMapsRegionPage: FunctionComponent = () => {
	usePageTitle('Карта регионов России')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Карта регионов России</h1>
			</TextContainer>
			<TextContainer>
				<a href={EXTERNAL_LINKS.wikiIso3166}>ISO 3166-2:RU</a>
			</TextContainer>
			<TextContainer>
				Синеньким то, куда хочется сгонять
			</TextContainer>
			<TourismMapsRegion />
		</div>
	)
}
