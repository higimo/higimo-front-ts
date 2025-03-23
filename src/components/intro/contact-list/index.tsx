import { FunctionComponent } from 'preact'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'
import { TextContainer } from '../../ui/text-container'

import { EXTERNAL_LINKS } from '../../../dic/EXTERNAL_LINKS'

import github from './img/github.svg'
import gmail from './img/gmail.svg'
import tg from './img/telegram.svg'
import vk from './img/vk.svg'

import './style.css'

const links = [
	{
		img: gmail,
		link: EXTERNAL_LINKS.contactMail,
	},
	{
		img: tg,
		link: EXTERNAL_LINKS.socialTg,
	},
	{
		img: vk,
		link: EXTERNAL_LINKS.socialVk,
	},
	{
		img: github,
		link: EXTERNAL_LINKS.github,
	},
] as const

export const ContactList: FunctionComponent = () => (
	<PrecentationContainer className="contact-list">
		<TextContainer>
			<h2>Как со мной связаться</h2>
			<div className="contact-list__gallery">
				{links.map(item => (
					<a className="contact-list__link" href={item.link}>
						<img className="contact-list__img" src={item.img} />
					</a>
				))}
			</div>
		</TextContainer>
	</PrecentationContainer>
)
