import { useRoute } from 'preact-iso'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'
import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import { compareRoute } from 'utils/compare-route'

export const OtherResume = () => {
	const { path } = useRoute()
	
	return (
		<PrecentationContainer className="slide">
			<TextContainer>
				<ul>
					<li>
						<MaybeLink href={ROUTE_LINKS.resumeHead} isHref={!compareRoute(ROUTE_LINKS.resumeHead, path)}>
							Резюме хеда продукта
						</MaybeLink>
					</li>
					<li>
						<MaybeLink href={ROUTE_LINKS.resumeProduct} isHref={!compareRoute(ROUTE_LINKS.resumeProduct, path)}>
							Резюме продакт-менеджера
						</MaybeLink>
					</li>
				</ul>
			</TextContainer>
		</PrecentationContainer>
	)
}