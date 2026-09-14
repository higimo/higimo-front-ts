import { FunctionComponent } from 'preact'

import { OnlyAdmin } from 'components/util/only-admin'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

// TODO: у меня есть такое предложение — надо показать его в этом компоненте, оно уже есть на главной
export const DonatIntro: FunctionComponent = () => (
	<OnlyAdmin>
		<PrecentationContainer>
			<TextContainer>
				<div className="donat-intro">
					В благодарность, мне можно <a href={ROUTE_LINKS.TODO}>закинуть донат на кофе</a>
				</div>
			</TextContainer>
		</PrecentationContainer>
	</OnlyAdmin>
)
