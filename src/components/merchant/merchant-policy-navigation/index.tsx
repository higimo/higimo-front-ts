import { MaybeLink } from 'components/ui/maybe-link/maybe-link'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { useLocation } from 'preact-iso'

import './style.css'

const LINKS = [
	{ href: ROUTE_LINKS.merchantPaymentPolicy, title: 'Порядок оплаты' },
	{ href: ROUTE_LINKS.merchantPersonalPolicy, title: 'Политика обработки ПД' },
	{ href: ROUTE_LINKS.merchantPaymentOferta, title: 'Офорта' },
	{ href: ROUTE_LINKS.merchantDonationOferta, title: 'Донатная оферта' },
]

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
