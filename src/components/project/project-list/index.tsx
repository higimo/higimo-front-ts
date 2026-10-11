import { FunctionComponent } from 'preact'
import { PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useMemo } from 'preact/hooks'

import { ProjectItem } from 'components/project/project-item'

import { packElements } from 'utils/project/pack-elements'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type ProjectListPropsType = {
	projectsList: PortfolioProjectFullType[] | null
}

export const ProjectList: FunctionComponent<ProjectListPropsType> = (props) => {
	const packedRows = useMemo(() => packElements(props.projectsList || []), [props.projectsList])

	return (
		<div className="project__list">
			{packedRows.map(row => (
				<div className="project__row">
					{row.map(item => <ProjectItem key={item.id} {...item} />)}
				</div>
			))}
		</div>
	)
}
