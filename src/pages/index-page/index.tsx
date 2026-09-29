import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'
import { PortfolioMetaType, PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'

import { BlogInvite } from 'components/intro/blog-invite'
import { ContactList } from 'components/intro/contact-list'
import { DonatIntro } from 'components/intro/donat-intro'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { LogismSingle } from 'components/intro/logism-single'
import { LookedThis } from 'components/intro/looked-this'
import { MainIntro } from 'components/intro/main-intro'
import { ProjectListShort } from 'components/intro/project-list-short'
import { TravelInvite } from 'components/intro/travel-invite'

import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: [FEATURE] Можно писать, что ищу проекты, просто посылать нахуй не интересное

export const IndexPage: FunctionComponent = () => {
	const [ logismDetail, reload ] = useApi<LogismType>(API_ROUTE.logismSingle)
	// TODO: [DATA] исправить обложки и размеры, сейчас грандиозные бывают normal
	// TODO: [BACKEND] присылать определённое количество, чтобы дырка не появлялась
	const [ highlightProjects ] = useApi<PortfolioProjectFullType[], PortfolioMetaType>(API_ROUTE.projectProject, {
		// filter: { cover_size: 'high'},
		limit: 6
	})

	return (
		<Layout title="Разработчик и менеджер продукта — higimo">
			<MainIntro />

			<DonatIntro />

			<LoadSuspense data={highlightProjects}>
				<EmptyData data={highlightProjects}>
					<ProjectListShort
						projects={highlightProjects.data}
						meta={highlightProjects.meta}
					/>
				</EmptyData>
			</LoadSuspense>

			<ContactList />

			<TravelInvite />

			<LookedThis />

			<LoadSuspense data={logismDetail}>
				<EmptyData data={logismDetail}>
					<LogismSingle
						logism={logismDetail.data}
						reload={reload}
					/>
				</EmptyData>
			</LoadSuspense>

			<BlogInvite />
		</Layout>
	)
}
