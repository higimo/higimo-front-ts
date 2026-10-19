import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { OnlyAdmin } from 'components/util/only-admin'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import '../resume-style.css'

export const ResumeListPage: FunctionComponent = () => (
	<Layout title="Мои резюме">
		<PrecentationContainer className="resume-hero">
			<TextContainer>
				<h1>Мои резюме</h1>
				<ul>
					<li><a href={ROUTE_LINK.resumeProduct}>Резюме продакт-менеджера</a></li>
					<li><a href={ROUTE_LINK.resumeTechProduct}>Резюме tech продакт-менеджера</a></li>
					<li><a href={ROUTE_LINK.resumeLead}>Резюме Product Lead</a></li>
				</ul>
				<p>
					<a href={ROUTE_LINK.resumeHowToWork}>Как подхожу к работе</a>
				</p>
			</TextContainer>
			<OnlyAdmin>
				<hr />
				<TextContainer>
					<h2>Скрытые резюме</h2>
					<ul>
						<li><a href={ROUTE_LINK.resumeProductSmart}>smart</a></li>
						<li><a href={ROUTE_LINK.resumeProductFull}>full value</a></li>
					</ul>
				</TextContainer>
			</OnlyAdmin>
		</PrecentationContainer>
	</Layout>
)
