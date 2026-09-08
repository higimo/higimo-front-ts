import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ProjectTypography } from 'components/project/project-test'

export const ProjectTypographyPage: FunctionComponent = () => {
	usePageTitle('Тестовая страница')

	return (
		<ProjectTypography />
	)
}

export default ProjectTypographyPage
