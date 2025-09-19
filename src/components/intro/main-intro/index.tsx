import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { PseudoLink } from 'components/ui/pseudo-link'
import { TextContainer } from 'components/ui/text-container'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { CompanyLogo } from '../company-logo'

export const MainIntro: FunctionComponent = () => (
	<PrecentationContainer className="main-intro">
		<TextContainer>
			<p class="logo">ХИГИ́МО</p>
			<p>
				Активно <a href={ROUTE_LINKS.resumeProduct}>ищу работу продактом</a>
			</p>
			<p>
				Ранее руководил продуктом <a href={EXTERNAL_LINKS.superjob} class="nowrap"><CompanyLogo name="SJ" /> Суперджоба</a>. В прошлой жизни был разработчиком <span class="nowrap">в <a href={EXTERNAL_LINKS.afishaDaily} class="nowrap"><CompanyLogo name="Афиша Daily" /> Афише <em>Дейли</em></a></span>, <span class="nowrap"><a href={EXTERNAL_LINKS.alsHigimo} class="nowrap"><CompanyLogo name="ALS" /> Студии Лебедева</a></span> <span class="nowrap">и <a href={EXTERNAL_LINKS.rTop} class="nowrap"><CompanyLogo name="R-top" /> Эртопе</a></span>.
			</p>
			<p>
				<PseudoLink href={ANCHOR_LINKS.travel}>Путешествую</PseudoLink>, веду лекции <span class="nowrap">и <PseudoLink href={ANCHOR_LINKS.blog}>тематические блоги</PseudoLink></span>. Создал <PseudoLink href={ANCHOR_LINKS.service}>горстку полезных сервисов</PseudoLink>. Участвую <span class="nowrap">в <a href={EXTERNAL_LINKS.intersection} class="nowrap"><CompanyLogo name="intersection" /> Пересечениях</a></span>.
			</p>
			{/* TODO: Переписать и логотипы показать отдельно с датами участия */}
			{/* Привет! Я Рома Ватриковский.

			Помогаю творческим и продуктовым командам делать свою работу качественно, экономно, прозрачно и в срок. Создаю и оптимизирую процессы. */}
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
