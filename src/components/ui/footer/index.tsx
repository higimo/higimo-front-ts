import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/fetch/use-auth'
import { useGlobalContext } from 'context/global'

import { contactListData } from 'dic/intra-links/contact-list'
import { blogInviteData } from 'dic/intra-links/blog-invite'
import { shareKnowledgeData } from 'dic/intra-links/share-knowledge'
import { aboutInviteList } from 'dic/intra-links/about-invite'
import { toolListData } from 'dic/intra-links/tools-intro'
import { funnyList } from 'dic/intra-links/funny-invite'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const SLICE_ABOUT = 6
const SLICE_TOOL = 3

const renderLink = (isAuth: boolean) => (toolElement) => {
	if (!!toolElement.isAdmin && !isAuth || !!toolElement.isArhive) {
		return null
	}
	return (
		<div className="footer__link"><a href={toolElement.link as string}>{toolElement.name}</a></div>
	)
}

export const Footer: FunctionComponent = () => {
	const { isNotFound } = useGlobalContext()
	if (isNotFound) {
		return null
	}

	const { isAuth } = useAuth()

	return (
		<footer className="footer">
			<div className="footer__column">
				<div className="footer__header"><a href={ROUTE_LINKS.projectIndex}>Сделал</a></div>
				<div className="footer__header">Связаться</div>
				{contactListData.map(renderLink(isAuth))}
				{/* TODO: [LIGHT] добавить флоу из глаз */}
				<div className="footer__header">Блоги</div>
				{blogInviteData.map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Делюсь знаниями</div>
				{shareKnowledgeData.map(renderLink(isAuth))}
				<div className="footer__header">Поиграть</div>
				{funnyList.map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Мои полочки</div>
				{aboutInviteList.map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Сделал сервисов</div>
				{toolListData.map(renderLink(isAuth))}
			</div>
			<div className="footer__copyright">
				Сделал Хиги́мо с гордостью в 🇷🇺
			</div>
		</footer>
	)
}
