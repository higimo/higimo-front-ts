import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { globalRouter, isRouteType } from 'dic/router'
import { SITE_POSTFIX } from 'hook/use-page-title'

import './style.css'

const convertPathToUrl = (path: string): string[] => {
	const parts = path.split('/').filter(Boolean)
	return parts.reduce(
		(acc, part) => acc.concat(`${acc[acc.length - 1]}/${part}/`.replace('//', '/')),
		['/']
	)
}

const getTitle: () => string = () => {
	return document.title.replace(`| ${SITE_POSTFIX}`, '')
}

export const Breadcrumps: FunctionComponent = () => {
	const { path } = useRoute()

	const breadcrumbs = convertPathToUrl(path)
	const breadcrumbsLength = breadcrumbs.length - 1
	return (
		<div className="breadcrumbs">
			{breadcrumbs.map((breadcrumb, index) => {
				const isLastChild = index === breadcrumbsLength
				const routeName = isRouteType(breadcrumb) ? globalRouter[breadcrumb] : undefined
				const newLocal = isLastChild ? getTitle() : routeName
				return (
					<div className="breadcrumbs__item">
						<MaybeLink href={breadcrumb} isHref={!isLastChild}>{newLocal}</MaybeLink>
					</div>
				)
			})}
		</div>
	)
}
