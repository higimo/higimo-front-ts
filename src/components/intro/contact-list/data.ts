import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

import github from './img/github.svg'
import gmail from './img/gmail.svg'
import tg from './img/telegram.svg'
import vk from './img/vk.svg'

export const contactListData = [
	{
		img: gmail,
		name: 'Электропочта',
		link: EXTERNAL_LINKS.contactMail,
	},
	{
		img: tg,
		name: 'Телеграм',
		link: EXTERNAL_LINKS.contactTg,
	},
	{
		img: vk,
		name: 'ВКонтакте',
		link: EXTERNAL_LINKS.socialVk,
	},
	{
		img: github,
		name: 'Гитхаб',
		link: EXTERNAL_LINKS.github,
	},
] as const
