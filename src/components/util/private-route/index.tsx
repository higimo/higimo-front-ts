import { VNode } from 'preact'
import { Route, RouteProps } from 'preact-iso'

import { useAuth } from 'hook/fetch/use-auth'

import { Loading } from 'components/ui/loading'

export const PrivateRoute = (props: RouteProps<{}>): VNode | null => {
	const { isAuth, isAuthLoaded, redirectToLogin } = useAuth()

	if (!isAuthLoaded) {
		return <Loading />
	}

	if (!isAuth && isAuthLoaded) {
		redirectToLogin()
		return null
	}

	return <Route {...props} />
}
