import { FunctionComponent } from "preact"

import { useProject } from "../../../hook/use-project";

import { ProjectList } from "../../../components/project/project-list"
import { TextContainer } from "../../../components/ui/text-container"
import { ProjectTagGallery } from "../../../components/project/project-tag-gallery";

export const ProjectIndexPage: FunctionComponent = () => {
	const { projectsList, uniqTags } = useProject();

    return (
		<div>
            <TextContainer>
                <h1>Сделал</h1>
            </TextContainer>
			<ProjectTagGallery tags={uniqTags} />
            <ProjectList projectsList={projectsList} />
        </div>
    )
}