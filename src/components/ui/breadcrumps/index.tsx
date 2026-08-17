import { FunctionComponent } from 'preact'

import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link'

import { getPageTitle } from 'utils/get-page-title'
import { convertPathToUrl } from 'utils/url-route/convert-path-to-url'

import { BREADCRUMS_DIC, isRouteType } from 'dic/BREADCRUMS_DIC'

import './style.css'

export const Breadcrumps: FunctionComponent = () => {
	const { path } = useRoute()

	const breadcrumbs = useMemo(() => {
		const breadcrumbPaths = convertPathToUrl(path)
		const length = breadcrumbPaths.length - 1

		return breadcrumbPaths.map((path, index) => {
			const isLastChild = index === length
			const routeName = isRouteType(path) ? BREADCRUMS_DIC[path] : undefined
			const localName = !!routeName ? routeName : getPageTitle()
			return {
				title: localName,
				href: path,
				isLastChild,
			}
		})
	}, [path, getPageTitle()])

	return (
		<div className="breadcrumbs">
			{breadcrumbs.map((breadcrumb) => (
				<div className="breadcrumbs__item">
					<MaybeLink
						href={breadcrumb.href}
						isHref={!breadcrumb.isLastChild}
					>
						{breadcrumb.title}
					</MaybeLink>
				</div>
			))}
		</div>
	)
}
