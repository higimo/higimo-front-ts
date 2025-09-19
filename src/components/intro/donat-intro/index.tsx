import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { OnlyAdmin } from 'components/util/only-admin'

export const DonatIntro: FunctionComponent = () => (
	<OnlyAdmin>
		<PrecentationContainer>
			<TextContainer>
				<div className="donat-intro">
					Если вам нравится то, чем я занимаюсь, лучшей благодарностью будет — <a href={ROUTE_LINKS.TODO}>перевести мне деньги</a>.
				</div>
			</TextContainer>
		</PrecentationContainer>
	</OnlyAdmin>
)
