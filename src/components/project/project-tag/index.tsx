import cs from 'classnames'

import { ProjectRoutingFilterNameType } from 'components/project/filter_dictionary'
import { FunctionComponent } from 'preact'

import httpBuildQuery from 'http-build-query'

import { useLocation } from 'preact-iso'
import { useCallback } from 'preact/hooks'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

const getProjectUrl = (params: { [key in ProjectRoutingFilterNameType]?: string}): string => {
	return `${ROUTE_LINKS.projectIndex}?${httpBuildQuery(params)}`
}

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
