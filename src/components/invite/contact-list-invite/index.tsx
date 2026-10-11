import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/ui/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { CONTACT_LIST } from 'data/ivite-links/contact-list'

import './style.css'

export const ContactListInvite: FunctionComponent = () => (
	<PrecentationContainer className="contact-list">
		<TextContainer>
			<IntroHeader>Как со мной связаться</IntroHeader>
		</TextContainer>

		<TextContainer>
			<div className="contact-list__gallery">
				{CONTACT_LIST.map(item => (
					<a className="contact-list__link" href={item.href as string}>
						<img className="contact-list__img" src={item.img} />
					</a>
				))}
			</div>
		</TextContainer>
	</PrecentationContainer>
)
