import { FunctionComponent } from "preact"

import { usePageTitle } from 'hook/use-page-title';
import { useProject } from "hook/use-project";

import { ProjectList } from "components/project/project-list"
import { TextContainer } from "components/ui/text-container"
import { ProjectTagGallery } from "components/project/project-tag-gallery";

// TODO: Прикольно, наверно, будет отбивать ещё года релизов. А, может, и архивность проектов.
// TODO: Жаль, что есть огромный долг по публикациям. К примеру, даже эти обновления я пишу в ТГ, а не на сайте.

export const ProjectIndexPage: FunctionComponent = () => {
	const { projectsList, uniqTags } = useProject();

	usePageTitle('Сделал')

	return (
		<div className="project-index-page">
			<TextContainer>
				<h1>Сделал</h1>
			</TextContainer>
			<ProjectTagGallery tags={uniqTags} />
			<ProjectList projectsList={projectsList} />
		</div>
	)
}