import { FunctionComponent } from 'preact'
import { LinkDataType } from 'utils.type'

import { useAuth } from 'hook/fetch/use-auth'
import { isNotFound } from 'context/not-found-signal'

import { ABOUT_INVITE } from 'data/ivite-links/about-invite'
import { BLOG_INVITE } from 'data/ivite-links/blog-invite'
import { CONTACT_LIST } from 'data/ivite-links/contact-list'
import { FUNNY_INVITE } from 'data/ivite-links/funny-invite'
import { KNOWLEDGE_INVITE } from 'data/ivite-links/knowledge-invite'
import { TOOL_LIST_DATA } from 'data/ivite-links/tools-invite'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import './style.css'

import rfFlag from 'components/ui/footer/img/rf-flag.svg'

const renderLink = (isAuth: boolean) => (toolElement: LinkDataType) => {
	if (!!toolElement.isAdmin && !isAuth || !!toolElement.isArchive) {
		return null
	}
	return (
		<div className="footer__link">
			<a href={toolElement.href as string}>{toolElement.title}</a>
		</div>
	)
}

export const Footer: FunctionComponent = () => {
	const { isAuth } = useAuth()

	if (isNotFound.value) {
		return null
	}


	return (
		<footer className="footer">
			<div className="footer__column">
				<div className="footer__header"><a href={ROUTE_LINK.projectIndex}>Сделал</a></div>
				<div className="footer__header">Связаться</div>
				{CONTACT_LIST.map(renderLink(isAuth))}
				<div className="footer__header">Блоги</div>
				{BLOG_INVITE.map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Делюсь знаниями</div>
				{KNOWLEDGE_INVITE.map(renderLink(isAuth))}
				<div className="footer__header">Поиграть</div>
				{FUNNY_INVITE.map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Мои полочки</div>
				{ABOUT_INVITE.map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Сделал сервисов</div>
				{TOOL_LIST_DATA.map(renderLink(isAuth))}
			</div>
			<div className="footer__copyright">
				<span className="nowrap">
					Сделал Хиги́мо с гордостью в{' '}
					<img src={rfFlag} height={12} style={{ verticalAlign: 'middle', border: '1px solid #dedede'}} />
				</span>
			</div>
		</footer>
	)
}
