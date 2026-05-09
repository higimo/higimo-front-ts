import { FunctionComponent } from 'preact'

import { useProjectViewer } from 'components/project/hooks/useProjectViewer'
import { useRoute } from 'preact-iso'
import { usePageTitle } from 'hook/use-page-title'

import { ProjectViewer } from 'components/project/project-viewer'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'


export const ProjectSinglePage: FunctionComponent = () => {
	const { params: { vendor, project } } = useRoute()

	const [curProject, isLoading, isEmpty] = useProjectViewer(vendor, project)

	usePageTitle(curProject.name ? `${curProject.name} | Проект Хигимо` : 'Проект Хигимо')

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty) {
		return <NotFoundData />
	}

	return (
		<ProjectViewer project={curProject} />
	)
}
