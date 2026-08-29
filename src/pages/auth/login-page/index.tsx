import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/use-auth'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { AuthForm } from 'components/form/auth-form'

import { getBackPath } from 'utils/get-back-path'

export const LoginPage: FunctionComponent = () => {
	usePageTitle('Вход')

	const { route } = useLocation()
	const { isAuth } = useAuth()

	useEffect(() => {
		if (isAuth) {
			route(getBackPath(), true)
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
