import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/fetch/use-auth'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'

import { AuthForm } from 'components/form/auth-form'
import { TextContainer } from 'components/ui/text-container'

import { getBackPath } from 'utils/url-route/get-back-path'
import { Layout } from 'components/ui/layout/Layout'

export const LoginPage: FunctionComponent = () => {
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
		<Layout title="Вход">
			<TextContainer>
				<AuthForm />
			</TextContainer>
		</Layout>
	)
}
