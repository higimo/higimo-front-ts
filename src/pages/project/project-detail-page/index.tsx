import { FunctionComponent } from 'preact'
import { PortfolioProjectDetailType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ProjectDetail } from 'components/project/project-detail'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const ProjectDetailPage: FunctionComponent = () => {
	const { params: { vendor = DEFAULT_ID, project = DEFAULT_ID } } = useRoute()

	const [ projectItem ] = useApi<PortfolioProjectDetailType>(API_ROUTE.projectSingle({
		vendorCode: vendor,
		projectCode: project,
	}))

	return (
		<Layout title={projectItem.data?.name ? `${projectItem.data.name} | Проект Хигимо` : 'Проект Хигимо'}>
			<LoadSuspense data={projectItem}>
				<EmptyData data={projectItem}>
					<ProjectDetail
						projectItem={projectItem.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
