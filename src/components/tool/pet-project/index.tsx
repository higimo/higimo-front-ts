import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { petProjectGradient } from 'components/tool/pet-project/gradient-dic'

import './style.css'

// petProjectGradient[Math.floor(Math.random() * gradient.length) | 1]
const gradients = petProjectGradient
	.concat(petProjectGradient.slice(0), petProjectGradient.slice(0))
	.sort(() => 0.5 - Math.random())

const getDescription = (str: string) => (str || '').replace(/(https:\/\/[\S]+)/g, '<a href="$1">Ссылка</a>').substring(0, 320)

type PetProject = {
	petprojects: PetProjectType[]
}
export const PetProject: FunctionComponent<PetProject> = ({ petprojects }) => (
	<div className="pet-project-gallery">
		{petprojects.map(({ name, description = '' }, index) => (
			<div
				className="pet-project__item"
				style={{
					background: gradients[index].g,
					'--color': gradients[index].c,
				}}
			>
				<div className="pet-project__title">{name}</div>
				<div
					className="pet-project__description"
					dangerouslySetInnerHTML={{ __html: getDescription(description)}}
				/>
			</div>
		))}
	</div>
)
