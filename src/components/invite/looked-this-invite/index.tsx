import { FunctionComponent } from 'preact'

import { Heading } from 'components/ui/heading'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { LOOKED_THIS_INVITE } from 'data/ivite-links/looked-this-invite'

import './style.css'

export const LookedThisInvite: FunctionComponent = () => (
	<PrecentationContainer className="looked-this">
		<TextContainer>
			<Heading variant="intro" level={2}>Смотрю и читаю</Heading>
		</TextContainer>

		<TextContainer>
			<ul className="looked-this__lists">
				{LOOKED_THIS_INVITE.map(item => (
					<li key={item.href} className="looked-this__item">
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
