import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/ui/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { LOOKED_THIS_INVITE } from 'data/ivite-links/looked-this-invite'

import './style.css'

export const LookedThisInvite: FunctionComponent = () => (
	<PrecentationContainer className="looked-this">
		<TextContainer>
			<IntroHeader>Смотрю и читаю</IntroHeader>
		</TextContainer>

		<TextContainer>
			<ul className="looked-this__lists">
				{LOOKED_THIS_INVITE.map(item => (
					<li className="looked-this__item">
						<a
							className="looked-this__link"
							target="_blank"
							href={item.href as string}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</TextContainer>
	</PrecentationContainer>
)
