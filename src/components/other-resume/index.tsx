import { useRoute } from 'preact-iso'

import { compareRoute } from '../../utils/compare-route'

import { PrecentationContainer } from '../ui/precentation-container/PrecentationContainer'
import { TextContainer } from '../ui/text-container'
import { MaybeLink } from '../ui/maybe-link/maybe-link'
import { ROUTE_LINKS } from '../../dic/ROUTE_LINKS'


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