import { ProjectElement } from '../project-element'

export const ProjectList = (props) => {
	return (
		<div>
			<div className="project__list">
				{props.projectsList.map(item => <ProjectElement key={item.id} {...item} />)}
			</div>
		</div>
	)
}
