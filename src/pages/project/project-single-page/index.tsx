import { FunctionComponent } from 'preact'
import { ProjectViewer } from 'components/project/project-viewer'

// TODO: [LIGHT] совершенно лишний компонент, сразу кидать вьювер
export const ProjectSinglePage: FunctionComponent = () => {
	return (
		<ProjectViewer />
	)
}
