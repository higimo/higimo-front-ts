import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'

import github from '../../components/invite/contact-list-invite/img/github.svg'
import gmail from '../../components/invite/contact-list-invite/img/gmail.svg'
import tg from '../../components/invite/contact-list-invite/img/telegram.svg'
import vk from '../../components/invite/contact-list-invite/img/vk.svg'

export const CONTACT_LIST: LinkDataType[] = [
	{
		img: gmail,
		title: 'Электропочта',
		href: EXTERNAL_LINK.contactMail,
		description: '',
	},
	{
		img: tg,
		title: 'Телеграм',
		href: EXTERNAL_LINK.contactTg,
		description: '',
	},
	{
		img: vk,
		title: 'ВКонтакте',
		href: EXTERNAL_LINK.socialVk,
		description: '',
	},
	{
		img: github,
		title: 'Гитхаб',
		href: EXTERNAL_LINK.github,
		description: '',
	},
] as const
