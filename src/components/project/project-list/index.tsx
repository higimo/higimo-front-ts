import { FunctionComponent } from 'preact'
import { PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useMemo } from 'preact/hooks'

import { ProjectItem } from 'components/project/project-item'

import { packElements } from 'utils/project/pack-elements'

import './style.css'

type ProjectListPropsType = {
	projectsList: PortfolioProjectFullType[] | null
}

export const ProjectList: FunctionComponent<ProjectListPropsType> = (props) => {
	const packedRows = useMemo(() => packElements(props.projectsList || []), [props.projectsList])

	return (
		<div className="project__list">
			{packedRows.map((row, key) => (
				<div key={key} className="project__row">
					{row.map(item => <ProjectItem key={item.id} {...item} />)}
				</div>
			))}
		</div>
	)
}
