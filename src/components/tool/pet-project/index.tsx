import { FunctionComponent } from 'preact'
import { GradientDicType } from 'components/tool/pet-project/types'
import { PetProjectType } from 'api-types/petproject.types'

import { useMemo } from 'preact/hooks'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const getDescription = (str: string) => (str || '').replace(/(https:\/\/[\S]+)/g, '<a href="$1">Ссылка</a>').substring(0, 320)

type PetProject = {
	petprojects: PetProjectType[]
	gradients: GradientDicType[]
}
export const PetProject: FunctionComponent<PetProject> = ({ petprojects, gradients }) => {
	const goodGradients = useMemo(() => {
		// TODO: мб, нарандомить сразу?
		// petProjectGradient[Math.floor(Math.random() * gradient.length) | 1]
		return gradients
			.concat(gradients.slice(0), gradients.slice(0))
			.sort(() => 0.5 - Math.random())
	}, [gradients])

	return (
		<div className="pet-project-gallery">
			{petprojects.map(({ id, name, description = '' }, index) => (
				<div
					className="pet-project__item"
					style={{
						background: goodGradients[index]?.g,
						'--color': goodGradients[index]?.c,
					}}
				>
					<div className="pet-project__title">{name}</div>
					<div
						className="pet-project__description"
						dangerouslySetInnerHTML={{ __html: getDescription(description)}}
					/>
					<a
						href={ROUTE_LINKS.petProjectEdit({ projectId: id.toString()})}
						className="pet-project__edit"
					>
						✐
					</a>
				</div>
			))}
		</div>
	)
}
