import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

import github from 'components/intro/contact-list/img/github.svg'
import gmail from 'components/intro/contact-list/img/gmail.svg'
import tg from 'components/intro/contact-list/img/telegram.svg'
import vk from 'components/intro/contact-list/img/vk.svg'

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
