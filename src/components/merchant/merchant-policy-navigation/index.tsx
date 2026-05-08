import { useLocation } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link/maybe-link'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { LINKS } from './LINKS'

import './style.css'

export const MerchantPolicyNavigation = () => {
	const { url } = useLocation()

	return (
		<TextContainer className="merchant-policy-navigation">
			{LINKS.map(link => (
				<MaybeLink isHref={link.href !== url} href={link.href}>
					<Tag active={link.href === url}>{link.title}</Tag>
				</MaybeLink>
			))}


		</TextContainer>
	)
}
