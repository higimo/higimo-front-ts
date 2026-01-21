import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { globalRouter } from 'dic/router'

import './style.css'

const convertPathToUrl = (path: string) => {
	const parts = path.split('/').filter(Boolean)
	return parts.reduce(
		(acc, part) => acc.concat(`${acc[acc.length - 1]}/${part}/`.replace('//', '/')),
		['/']
	)
}

export const Breadcrumps: FunctionComponent = () => {
	const { path } = useRoute()
	
	const breadcrumbs = convertPathToUrl(path)
	const breadcrumbsLength = breadcrumbs.length - 1
	return (
		<div className="breadcrumbs">
			{breadcrumbs.map((breadcrumb, index) => {
				const isLastChild = index === breadcrumbsLength
				const routeName = globalRouter[breadcrumb]
				return (
					<div className="breadcrumbs__item">
						<MaybeLink href={breadcrumb} isHref={!isLastChild}>{isLastChild ? document.title : routeName}</MaybeLink>
					</div>
				)
			})}
		</div>
	)
}
