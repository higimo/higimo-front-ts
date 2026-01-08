import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { AuthForm } from 'components/form/auth-form'

export const LoginPage: FunctionComponent = () => {
	usePageTitle('Вход')

	return (
		<TextContainer>
			<AuthForm />
		</TextContainer>
	)
}
