import { FunctionComponent } from 'preact'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'

import { EXTERNAL_LINKS } from '../../../dic/EXTERNAL_LINKS'

import './style.css'

export const WhishList: FunctionComponent = () => (
	<PrecentationContainer className="whish-list">
		<a href={EXTERNAL_LINKS.wishlist} className="whish-list__link">Список желаний</a>
	</PrecentationContainer>
)
