import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../components/ui/text-container'
import { AuthForm } from '../../../components/form/auth-form'

export const LoginPage: FunctionComponent = () => {
	document.title = 'Вход'

	return (
		<TextContainer>
			<AuthForm />
		</TextContainer>
	)
}
