import { FunctionComponent } from 'preact'
import { ValueOf } from 'utils.type'

import { useLocation } from 'preact-iso'
import { useLayoutEffect } from 'preact/hooks'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type RedirectPropsType =  & {
	path: ValueOf<typeof ROUTE_LINK>
	to: ValueOf<typeof ROUTE_LINK>
	replace?: boolean
}

/**
 * Используется для перенаправления в роутере приложения
 * @example
 * ```tsx
 * <Redirect path={ROUTE_LINKS.listListDefault} to={ROUTE_LINKS.listListIndex} />
 * ```
 */
export const Redirect: FunctionComponent<RedirectPropsType> = ({ to, replace = true }) => {
	const { route } = useLocation()

	useLayoutEffect(() => {
		console.log('redirect')
		route(to as string, replace)
	}, [to, replace])

	return null
}
