import { HigimoApiError } from 'errors/higimo-api-error'
import { LoginResponseType } from 'api-types/auth.types'
import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'
import { RenderFormScheme } from 'components/form/render-form-scheme'

import { getBackPath } from 'utils/url-route/get-back-path'
import { isValidAuth } from 'utils/types/is-valid-auth'
import { toast } from 'toast'

import { authApi } from 'repositories/auth-api.repository'

type FormValues = LoginResponseType

const formScheme: FormScheme<FormValues> = {
	email: { title: 'Электопочта', autocomplete: true, required: true, },
	pass:  { title: 'Пароль',      autocomplete: true, required: true, type: 'password', },
}

export const AuthForm: FunctionComponent = () => {
	// здесь никогда не понадобятся значения по умолчанию
	const formMethods = useForm<FormValues>({})

	const handleLogin = async (values: FormValues) => {
		try {
			const data = await authApi.login(values)
			if (!isValidAuth(data ?? {})) {
				return toast.error('Неверный формат ответа сервера')
			}

			window.location.href = getBackPath()
		} catch (error) {
			const apiError = error as HigimoApiError
			toast.error(apiError.message || 'Ошибка при входе в систему')
		}
	}

	return (
		<FromContainer variant="inner">
			<FormProvider {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(handleLogin)}>
					<RenderFormScheme<FormValues> formScheme={formScheme} />
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
		</FromContainer>
	)
}
