import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { compareRoute } from '../../../../utils/compare-route'

import { TextContainer } from '../../../ui/text-container'
import { MaybeLink } from '../../../ui/maybe-link/maybe-link'

import { ROUTE_LINKS } from '../../../../dic/ROUTE_LINKS'

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
			<div className="tourism-walk-gallery">
				{links.map(linkElement => (
					<MaybeLink href={linkElement.href} isHref={!compareRoute(linkElement.href, path)}>
						{linkElement.title}
					</MaybeLink>
				))}
			</div>
		</TextContainer>
	)
}
