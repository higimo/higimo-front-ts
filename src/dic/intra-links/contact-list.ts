import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'

import github from 'components/intro/contact-list/img/github.svg'
import gmail from 'components/intro/contact-list/img/gmail.svg'
import tg from 'components/intro/contact-list/img/telegram.svg'
import vk from 'components/intro/contact-list/img/vk.svg'

export const contactListData: ToolDataType[] = [
	{
		img: gmail,
		name: 'Электропочта',
		href: EXTERNAL_LINKS.contactMail,
		description: '',
	},
	{
		img: tg,
		name: 'Телеграм',
		href: EXTERNAL_LINKS.contactTg,
		description: '',
	},
	{
		img: vk,
		name: 'ВКонтакте',
		href: EXTERNAL_LINKS.socialVk,
		description: '',
	},
	{
		img: github,
		name: 'Гитхаб',
		href: EXTERNAL_LINKS.github,
		description: '',
	},
] as const
