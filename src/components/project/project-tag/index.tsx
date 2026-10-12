import { ProjectRoutingFilterNameType } from 'dic/project/PROJECT_FILTER'
import { FunctionComponent } from 'preact'

import { useLocation } from 'preact-iso'
import { useCallback } from 'preact/hooks'

import { getProjectUrl } from 'utils/project/get-project-url'
import cs from 'classnames'

type ProjectTagPropsType = {
	filterName: ProjectRoutingFilterNameType
	children: string
	isLink?: boolean
	isSelected?: boolean
	toggleTag?: () => void
}

export const ProjectTag: FunctionComponent<ProjectTagPropsType> = ({
	filterName,
	children,
	isLink = true,
	isSelected,
	toggleTag,
}) => {
	const { query, route } = useLocation()

	const handleRemove = useCallback((): void|boolean => {
		if (query[filterName] == children) {
			delete query[filterName]
			route(getProjectUrl(query))
			return false
		}
	}, [filterName, children, query])

	const href = getProjectUrl({
		...query,
		[filterName]: children as string
	})

	if (!isLink) {
		return (
			<span
				className={cs(
					'project-tag_element',
					{ 'project-tag_element--active': isSelected }
				)}
				onClick={toggleTag}
			>
				{children}
			</span>
		)
	}

	const isSelectedTag = query[filterName] != children
	if (isSelectedTag) {
		return (
			<a className="project-tag_element" href={href}>{children}</a>
		)
	}

	return (
		<span
			className="project-tag_element project-tag_element--active"
			onClick={handleRemove}
		>
			{children}
		</span>
	)

}
