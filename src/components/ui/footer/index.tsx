import { FunctionComponent } from 'preact'
import { IntroLinkDataType } from 'utils.type'

import { useAuth } from 'hook/fetch/use-auth'
import { useGlobalContext } from 'context/global'

import { aboutInviteList } from 'dic/intra-links/about-invite'
import { blogInviteData } from 'dic/intra-links/blog-invite'
import { contactListData } from 'dic/intra-links/contact-list'
import { funnyList } from 'dic/intra-links/funny-invite'
import { shareKnowledgeData } from 'dic/intra-links/share-knowledge'
import { toolListData } from 'dic/intra-links/tools-intro'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

import rfFlag from 'components/ui/footer/img/rf-flag.svg'

const renderLink = (isAuth: boolean) => (toolElement: IntroLinkDataType) => {
	if (!!toolElement.isAdmin && !isAuth || !!toolElement.isArchive) {
		return null
	}
	return (
		<div className="footer__link"><a href={toolElement.href as string}>{toolElement.title}</a></div>
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
				<span className="nowrap">
					Сделал Хиги́мо с гордостью в{' '}
					<img src={rfFlag} height={12} style={{ verticalAlign: 'middle', border: '1px solid #dedede'}} />
				</span>
			</div>
		</footer>
	)
}
