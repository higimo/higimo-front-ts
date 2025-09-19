import { FunctionComponent } from 'preact'

import httpBuildQuery from 'http-build-query'

import { useLocation } from 'preact-iso'
import { useCallback } from 'preact/hooks'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { ProjectRoutingFilterNameType } from '../project-tag-gallery/filter-type'

const getProjectUrl = (params: { [key in ProjectRoutingFilterNameType]?: string}): string => {
	return `${ROUTE_LINKS.projectIndex}?${httpBuildQuery(params)}`
}

type ProjectTagPropsType = {
	filterName: ProjectRoutingFilterNameType;
	children: string;
}
export const ProjectTag: FunctionComponent<ProjectTagPropsType> = props => {
	const { query, route } = useLocation()

	const handleRemove = useCallback((event) => {
		if (query[props.filterName] == props.children) {
			event.preventDefault()
			delete query[props.filterName];
			route(getProjectUrl(query))
			return false
		}
	}, [props.filterName, props.children, query])

	const href = getProjectUrl({
		...query,
		[props.filterName]: props.children as string
	})

	const isLink = query[props.filterName] != props.children
	if (isLink) {
		return (
			<a className="project-tag_element" href={href}>{props.children}</a>
		)
	}

	return (
		<span className="project-tag_element" onClick={handleRemove}>{props.children}</span>
	)

}
