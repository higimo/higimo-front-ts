import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useProjectList } from 'hook/data/use-project-list'

import { Loading } from 'components/ui/loading'
import { ProjectList } from 'components/project/project-list'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'
import { ProjectClickTagCategory } from 'components/project/project-click-tag-category'

// TODO: [FEATURE] Прикольно, наверно, будет отбивать ещё года релизов. А, может, и архивность проектов.
// TODO: [FEATURE] Жаль, что есть огромный долг по публикациям. К примеру, даже эти обновления я пишу в ТГ, а не на сайте.
// TODO: [FEATURE] показать график когда публиковался на горизонтальном таймлайне, просто названиями
export const ProjectIndexPage: FunctionComponent = () => {
	usePageTitle('Сделал')

	const {
		isLoading,
		isEmpty,
		projectList,
		tagList,
	} = useProjectList()

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="project-index-page">
			<TextContainer>
				<h1>Сделал</h1>
			</TextContainer>
			<ProjectClickTagCategory groupedTags={tagList} />
			<ProjectList projectsList={projectList} />
		</div>
	)
}
