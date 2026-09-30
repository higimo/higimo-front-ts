import { FunctionComponent } from 'preact'
import { PortfolioProjectDetailType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ProjectViewer } from 'components/project/project-viewer'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ProjectSinglePage: FunctionComponent = () => {
	const { params: { vendor = '', project = '' } } = useRoute()

	const [ projectData ] = useApi<PortfolioProjectDetailType>(API_ROUTE.projectSingle({
		vendorCode: vendor,
		projectCode: project,
	}))

	return (
		<Layout title={projectData.data.name ? `${projectData.data.name} | Проект Хигимо` : 'Проект Хигимо'}>
			<LoadSuspense data={projectData}>
				<EmptyData data={projectData}>
					<ProjectViewer project={projectData.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
