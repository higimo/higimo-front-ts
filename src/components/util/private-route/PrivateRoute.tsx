import { AUTH_STATUS_DIC, useAuth } from 'hook/use-auth'
import { Route, RouteProps } from 'preact-iso'

export const PrivateRoute = (props: RouteProps<{}>) => {
	const { isAuth, isAuthLoading, redirectToLogin } = useAuth()

	if (!isAuth && !isAuthLoading) {
		redirectToLogin()
	}
	return <Route {...props} />
}
