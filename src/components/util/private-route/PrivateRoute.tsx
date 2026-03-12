import { Loading } from 'components/ui/loading'
import { useAuth } from 'hook/use-auth'
import { Route, RouteProps } from 'preact-iso'

export const PrivateRoute = (props: RouteProps<{}>) => {
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
