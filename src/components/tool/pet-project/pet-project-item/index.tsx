import { FunctionComponent } from 'preact'
import { GradientDicType } from 'api-types/json-api.types'
import { PetProjectType } from 'api-types/petproject.types'

import { getShortDescription } from 'utils/text/get-description'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type PetProjectItemPropsType = {
	project: PetProjectType
	gradient: GradientDicType
}

export const PetProjectItem: FunctionComponent<PetProjectItemPropsType> = ({
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
			dangerouslySetInnerHTML={{ __html: getShortDescription(project.description)}}
		/>
		<a
			href={ROUTE_LINK.petProjectEdit({ projectId: project.id })}
			className="pet-project__edit"
		>
			✐
		</a>
	</div>
)
