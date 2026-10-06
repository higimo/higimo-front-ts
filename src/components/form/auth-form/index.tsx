import { ApiError } from 'errors/higimo-api-error'
import { AuthDataType } from 'api-types/auth.types'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { InnerFromContainer } from 'components/form/inner-from-container'

import { getBackPath } from 'utils/url-route/get-back-path'
import { isValidAuth } from 'utils/types/is-valid-auth'
import { sendRequest } from 'utils/api/send-request'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

type FormValues = {
	email: string
	pass: string
}

export const AuthForm: FunctionComponent = () => {
	const formMethods = useForm<FormValues>({})

	const handleLogin = async (values: FormValues) => {
		try {
			// TODO: [HARD] добавить в репозиторий (ради одного городить класс?)
			const { data: authData } = await sendRequest<AuthDataType>(API_ROUTE.login, {
				method: 'POST',
				values
			})

			if (!isValidAuth(authData)) {
				return toast.error('Неверный формат ответа сервера')
			}

			window.location.href = getBackPath()
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message || 'Ошибка при входе в систему')
		}
	}

	return (
		<InnerFromContainer>
			<FormProvider {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(handleLogin)}>
					<FiledForm name="email" label="Электопочта" autocomplete required />
					<FiledForm name="pass" type="password" label="Пароль" autocomplete required />
					<ButtonGroup>
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Проникновение…' : 'Войти'}
						</FormButton>
					</ButtonGroup>
				</form>
			</FormProvider>
		</InnerFromContainer>
	)
}
