import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'
import { PortfolioMetaType, PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'

import { BlogInvite } from 'components/invite/blog-invite'
import { ContactListInvite } from 'components/invite/contact-list-invite'
import { DonatIntroInvite } from 'components/invite/donat-invite'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { LogismInvite } from 'components/invite/logism-invite'
import { LookedThisInvite } from 'components/invite/looked-this-invite'
import { MainInvite } from 'components/invite/main-invite'
import { ProjectListInvite } from 'components/invite/project-list-invite'
import { TravelInvite } from 'components/invite/travel-invite'

import { API_ROUTE } from 'dic/route/API_ROUTE'

// TODO: [FEATURE] Можно писать, что ищу проекты, просто посылать нахуй не интересное

export const IndexPage: FunctionComponent = () => {
	const [ logismItem, reload ] = useApi<LogismType>(API_ROUTE.logismSingle)
	// TODO: [DATA] исправить обложки и размеры, сейчас грандиозные бывают normal
	// TODO: [BACKEND] присылать определённое количество, чтобы дырка не появлялась
	const [ highlightProjectList ] = useApi<PortfolioProjectFullType[], PortfolioMetaType>(API_ROUTE.projectProject, {
		// filter: { cover_size: 'high'},
		limit: 6
	})

	return (
		<Layout title="Разработчик и менеджер продукта — higimo">
			<MainInvite />

			<DonatIntroInvite />

			<LoadSuspense data={highlightProjectList}>
				<EmptyData data={highlightProjectList}>
					<ProjectListInvite
						highlightProjectList={highlightProjectList.data}
						meta={highlightProjectList.meta}
					/>
				</EmptyData>
			</LoadSuspense>

			<ContactListInvite />

			<TravelInvite />

			<LookedThisInvite />

			<LoadSuspense data={logismItem}>
				<EmptyData data={logismItem}>
					<LogismInvite
						logismItem={logismItem.data}
						reload={reload}
					/>
				</EmptyData>
			</LoadSuspense>

			<BlogInvite />
		</Layout>
	)
}
