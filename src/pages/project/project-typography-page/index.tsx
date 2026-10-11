import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { ProjectTypography } from 'components/project/project-test'

export const ProjectTypographyPage: FunctionComponent = () => (
	<Layout title="Тестовая страница">
		<ProjectTypography />
	</Layout>
)
