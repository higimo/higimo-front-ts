import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link'

import { getPageTitle } from 'utils/get-page-title'
import { convertPathToUrl } from 'utils/url-route/convert-path-to-url'

import { BREADCRUMS_DIC, isRouteType } from 'dic/BREADCRUMS_DIC'

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
				const newLocal = isLastChild ? getPageTitle() : routeName
				return (
					<div className="breadcrumbs__item">
						<MaybeLink href={breadcrumb} isHref={!isLastChild}>{newLocal}</MaybeLink>
					</div>
				)
			})}
		</div>
	)
}
