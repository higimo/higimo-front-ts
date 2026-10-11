import { FunctionComponent } from 'preact'

import { plural } from 'utils/plural'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type ProjectMorePropsType = {
	count: number
}

export const ProjectMore: FunctionComponent<ProjectMorePropsType> = ({ count }) => (
	<div className="project-more">
		<a href={ROUTE_LINK.projectIndex} className="project-more__button">
			оставшиеся
			<span className="project-more__counter">{count}</span>
			{plural(count, ['проект', 'проекта', 'проектов'])}
		</a>
	</div>
)
