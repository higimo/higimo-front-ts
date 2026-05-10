import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { contactListData } from './data'

import './style.css'

export const ContactList: FunctionComponent = () => (
	<PrecentationContainer className="contact-list">
		<TextContainer>
			<h2>Как со мной связаться</h2>
			<div className="contact-list__gallery">
				{contactListData.map(item => (
					<a className="contact-list__link" href={item.link}>
						<img className="contact-list__img" src={item.img} />
					</a>
				))}
			</div>
		</TextContainer>
	</PrecentationContainer>
)
