import { FunctionComponent } from 'preact'
import { GradientDicType } from 'api-types/json-api.types'
import { PetProjectType } from 'api-types/petproject.types'

import { getDescription } from 'utils/text/get-description'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type PetProjectElementPropsType = {
	project: PetProjectType
	gradient: GradientDicType
}

export const PetProjectElement: FunctionComponent<PetProjectElementPropsType> = ({
	project,
	gradient,
}) => (
	<div
		className="pet-project__item"
		style={{
			background: gradient.g,
			'--color': gradient.c,
		}}
	>
		<div className="pet-project__title">{project.name}</div>
		<div
			className="pet-project__description"
			dangerouslySetInnerHTML={{ __html: getDescription(project.description)}}
		/>
		<a
			href={ROUTE_LINKS.petProjectEdit({ projectId: project.id })}
			className="pet-project__edit"
		>
			✐
		</a>
	</div>
)
