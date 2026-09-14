import { FunctionComponent } from 'preact'

import { CompanyLogo } from 'components/company-logo'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { PseudoLink } from 'components/ui/pseudo-link'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export const MainIntro: FunctionComponent = () => (
	<PrecentationContainer className="main-intro">
		<TextContainer>
			<p class="logo">ХИГИ́МО</p>
			<p>
				Руководил продуктами <span class="nowrap">в <a href={EXTERNAL_LINKS.kidguru}><CompanyLogo name="kidguru" /> Кидгу.ру</a></span> <span class="nowrap">и <a href={EXTERNAL_LINKS.superjob}><CompanyLogo name="SJ" /> Суперджобе</a></span>, отвечал за соискательскую часть и ML‑ранжирование для многомиллионной аудитории. 10 лет опыта разработки <span class="nowrap">в <a href={EXTERNAL_LINKS.afishaDaily}><CompanyLogo name="Афиша Daily" /> Афише <em>Дейли</em></a></span>, <a href={EXTERNAL_LINKS.alsHigimo} class="nowrap"><CompanyLogo name="ALS" /> Студии Лебедева</a> <span class="nowrap">и <a href={EXTERNAL_LINKS.rTop}><CompanyLogo name="R-top" /> Эртопе</a></span>.
			</p>
			<p>
				Участвую <span class="nowrap">в <a href={EXTERNAL_LINKS.intersection} class="nowrap"><CompanyLogo name="intersection" /> Пересечениях</a></span>. <PseudoLink href={ANCHOR_LINKS.travel}>Путешествую</PseudoLink>, веду <PseudoLink href={ANCHOR_LINKS.blog}>тематические блоги</PseudoLink>. Создаю <a href={ROUTE_LINKS.serviceIndex}>полезные сервисы</a>.
			</p>
		</TextContainer>

		<div className="animation">
			<CompanyLogo name="R-top" />
			<CompanyLogo name="ALS" />
			<CompanyLogo name="Афиша Daily" />
			<CompanyLogo name="SJ" />
			<CompanyLogo name="intersection" />
		</div>
	</PrecentationContainer>
)
