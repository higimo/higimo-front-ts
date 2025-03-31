import { EXTERNAL_LINKS } from '../../../dic/EXTERNAL_LINKS'

import github from './img/github.svg'
import gmail from './img/gmail.svg'
import tg from './img/telegram.svg'
import vk from './img/vk.svg'

export const contactListData = [
	{
		img: gmail,
		link: EXTERNAL_LINKS.contactMail,
        name: 'Электропочта',
	},
	{
        img: tg,
		link: EXTERNAL_LINKS.socialTg,
        name: 'Телеграм',
	},
	{
        img: vk,
		link: EXTERNAL_LINKS.socialVk,
        name: 'ВКонтакте',
	},
	{
		img: github,
		link: EXTERNAL_LINKS.github,
        name: 'Гитхаб',
	},
] as const