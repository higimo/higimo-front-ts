import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { TextContainer } from 'components/ui/text-container'
import { MaybeLink } from 'components/ui/maybe-link'

import { compareRoute } from 'utils/url-route/compare-route'

import { links } from 'components/data/concert/nashe-lineup-gallery/data'

import './style.css'

export const NasheLineupGallery: FunctionComponent = () => {
	const { path } = useRoute()

	return (
		<TextContainer>
			<div className="nashe-lineup-gallery">
				{links.map(linkElement => (
					<MaybeLink href={linkElement.href} isHref={!compareRoute(linkElement.href, path)}>
						{linkElement.title}
					</MaybeLink>
				))}
			</div>
		</TextContainer>
	)
}
