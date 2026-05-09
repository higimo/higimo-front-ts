import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/use-auth'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { AuthForm } from 'components/form/auth-form'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const LoginPage: FunctionComponent = () => {
	usePageTitle('Вход')
	const { route } = useLocation()
	const { isAuth } = useAuth()

	useEffect(() => {
		if (isAuth) {
			const backpath = (new URLSearchParams(location.search)).get('backpath')
			route((backpath || ROUTE_LINKS.adminIndex), true)
		}
	}, [isAuth, route])

	if (isAuth) {
		return <div>Уже авторизован</div>
	}


	return (
		<TextContainer>
			<AuthForm />
		</TextContainer>
	)
}
