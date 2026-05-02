import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'
import { useProject } from 'hook/use-project'

import { Loading } from 'components/ui/loading'
import { ProjectList } from 'components/project/project-list'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'
import { ProjectTagCategory } from 'components/project/project-tag-category'

// TODO: [MEDIUM] Прикольно, наверно, будет отбивать ещё года релизов. А, может, и архивность проектов.
// TODO: [MEDIUM] Жаль, что есть огромный долг по публикациям. К примеру, даже эти обновления я пишу в ТГ, а не на сайте.
// TODO: [MEDIUM] показать график когда публиковался на горизонтальном таймлайне, просто названиями
export const ProjectIndexPage: FunctionComponent = () => {
	const {
		isLoading,
		isEmpty,
		projectList,
		tagList,
	} = useProject()

	usePageTitle('Сделал')

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
			<ProjectTagCategory groupedTags={tagList} />
			<ProjectList projectsList={projectList} />
		</div>
	)
}
