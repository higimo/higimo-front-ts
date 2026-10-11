import { FunctionComponent } from 'preact'
import { GradientDicType } from 'api-types/json-api.types'
import { PetProjectType } from 'api-types/petproject.types'

import { PetProjectItem } from 'components/tool/pet-project/pet-project-item'

import { useMemo } from 'preact/hooks'

import './style.css'

type PetProjectListPropsType = {
	petprojects: PetProjectType[]
	gradients: GradientDicType[] | null
}

export const PetProjectList: FunctionComponent<PetProjectListPropsType> = ({ petprojects, gradients }) => {
	const goodGradients = useMemo(() => {
		if (!gradients) {
			return []
		}
		return gradients
			.concat(gradients.slice(0), gradients.slice(0))
			.sort(() => 0.5 - Math.random())
	}, [gradients])

	return (
		<div className="pet-project-gallery">
			{petprojects.map((project, index) => (
				<PetProjectItem
					key={index}
					project={project}
					gradient={goodGradients[index]!}
				/>
			))}
		</div>
	)
}
