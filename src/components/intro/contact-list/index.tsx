import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/intro/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { contactListData } from 'dic/intra-links/contact-list'

import './style.css'

export const ContactList: FunctionComponent = () => (
	<PrecentationContainer className="contact-list">
		<TextContainer>
			<IntroHeader>Как со мной связаться</IntroHeader>
		</TextContainer>

		<TextContainer>
			<div className="contact-list__gallery">
				{contactListData.map(item => (
					<a className="contact-list__link" href={item.href as string}>
						<img className="contact-list__img" src={item.img} />
					</a>
				))}
			</div>
		</TextContainer>
	</PrecentationContainer>
)
