import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/use-auth'
import { useGlobalContext } from 'context/global'

import { contactListData } from 'components/intro/contact-list/contactListData'
import { blogInviteData } from 'components/intro/blog-invite/data'
import { shareKnowledgeData } from 'components/intro/share-knowledge/data'
import { aboutInviteList } from 'components/intro/about-invite/data'
import { toolListData } from 'components/intro/tools-intro/data'
import { funnyList } from 'components/intro/funny-invite/data'

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

export const Footer: FunctionComponent = (props) => {
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
				<div className="footer__header">Храню знания</div>
				{aboutInviteList.slice(0, SLICE_ABOUT).map(renderLink(isAuth))}
				{aboutInviteList.slice(SLICE_ABOUT).map(renderLink(isAuth))}
			</div>

			<div className="footer__column">
				<div className="footer__header">Сделал сервисов</div>
				{toolListData.slice(0, SLICE_TOOL).map(renderLink(isAuth))}
				{toolListData.slice(SLICE_TOOL).map(renderLink(isAuth))}
			</div>
			<div className="footer__copyright">
				Сделал Хиги́мо с гордостью в 🇷🇺
			</div>
		</footer>
	)
}
