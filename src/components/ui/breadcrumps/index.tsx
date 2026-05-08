import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { convertPathToUrl } from './convertPathToUrl'
import { getTitle } from './getTitle'

import { BREADCRUMS_DIC, isRouteType } from 'dic/router'

import './style.css'

export const Breadcrumps: FunctionComponent = () => {
	const { path } = useRoute()

	const breadcrumbs = convertPathToUrl(path)
	const breadcrumbsLength = breadcrumbs.length - 1
	return (
		<div className="breadcrumbs">
			{breadcrumbs.map((breadcrumb, index) => {
				const isLastChild = index === breadcrumbsLength
				const routeName = isRouteType(breadcrumb) ? BREADCRUMS_DIC[breadcrumb] : undefined
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
