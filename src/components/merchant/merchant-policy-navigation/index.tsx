import { useLocation } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { MERCHANT_LINK } from 'data/merchant/merchant-link'

import './style.css'

export const MerchantPolicyNavigation = () => {
	const { url } = useLocation()

	return (
		<TextContainer className="merchant-policy-navigation">
			{MERCHANT_LINK.map(link => (
				<MaybeLink key={link.href} isHref={link.href !== url} href={link.href as string}>
					<Tag active={link.href === url}>{link.title}</Tag>
				</MaybeLink>
			))}
		</TextContainer>
	)
}
