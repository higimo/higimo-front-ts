import { FunctionComponent } from 'preact'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'
import { TextContainer } from '../../ui/text-container'

import { contactListData } from './contactListData'

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
