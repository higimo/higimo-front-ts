import { FunctionComponent } from 'preact'
import { GradientDicType } from 'api-types/json-api.types'
import { PetProjectType } from 'api-types/petproject.types'

import { PetProjectElement } from 'components/tool/pet-project-element'

import { useMemo } from 'preact/hooks'

import './style.css'

type PetProject = {
	petprojects: PetProjectType[]
	gradients: GradientDicType[]
}
export const PetProject: FunctionComponent<PetProject> = ({ petprojects, gradients }) => {
	const goodGradients = useMemo(() => {
		// TODO: [LIGHT] мб, нарандомить сразу?
		// petProjectGradient[Math.floor(Math.random() * gradient.length) | 1]
		return gradients
			.concat(gradients.slice(0), gradients.slice(0))
			.sort(() => 0.5 - Math.random())
	}, [gradients])

	return (
		<div className="pet-project-gallery">
			{petprojects.map((project, index) => (
				<PetProjectElement
					key={index}
					project={project}
					gradient={goodGradients[index]!}
				/>
			))}
		</div>
	)
}
