import { FunctionComponent } from 'preact'
import { PortfolioProjectFullType } from 'api-types/portfolio.types'

import { ProjectElement } from 'components/project/project-element'

import { packElements } from 'components/project/utils/pack-elements'

import './style.css'

type ProjectListPropsType = {
	projectsList: PortfolioProjectFullType[]
}
export const ProjectList: FunctionComponent<ProjectListPropsType> = (props) => {
	const packedRows = packElements(props.projectsList)

	return (
		<div className="project__list">
			{packedRows.map(row => (
				<div className="project__row">
					{row.map(item => <ProjectElement key={item.id} {...item} />)}
				</div>
			))}
		</div>
	)
}
