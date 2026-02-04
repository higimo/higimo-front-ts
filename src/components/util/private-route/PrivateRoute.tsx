import { useAuth } from 'hook/use-auth'
import { Route, RouteProps } from 'preact-iso'

export const PrivateRoute = (props: RouteProps<{}>) => {
	const { isAuth, isAuthLoaded, redirectToLogin } = useAuth()

	if (!isAuth && isAuthLoaded) {
		redirectToLogin()
	}
	return <Route {...props} />
}
