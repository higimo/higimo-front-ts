import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/fetch/use-auth'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { usePageTitle } from 'hook/browser/use-page-title'

import { AuthForm } from 'components/form/auth-form'
import { TextContainer } from 'components/ui/text-container'

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
