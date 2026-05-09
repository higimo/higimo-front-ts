import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { TextContainer } from 'components/ui/text-container'
import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { compareRoute } from 'utils/url-route/compare-route'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const links = [
	{
		href: ROUTE_LINKS.tourismNashe2017,
		title: '2017',
	},
	{
		href: ROUTE_LINKS.tourismNashe2018,
		title: '2018',
	},
] as const

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
