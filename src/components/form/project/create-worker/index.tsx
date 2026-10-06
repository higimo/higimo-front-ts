import { ApiError } from 'errors/higimo-api-error'
import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'
import { PortfolioWorkerType } from 'api-types/portfolio.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { CollapseSection } from 'components/ui/collapse-section'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { toast } from 'toast'

import './style.css'

type FormValues = PortfolioWorkerType

const formScheme: FormScheme<FormValues> = {
	id:        { title: 'Идентификатор', readonly: true, type: 'number', },
	full_name: { title: 'Имя',           required: true, },
	image:     { title: 'Ссылка на фотку', },
	login:     { title: 'Ник', },
	company:   { title: 'Где работал', },
	role:      { title: 'Роль', },
	link:      { title: 'Ссылка на хомяк', },
}

type CreateWorkerPropsType = {
	onSubmit: (roles: PortfolioWorkerType) => Promise<boolean>
}
// TODO: [HARD] сейчас не сообщает, если какое-то поле забуду
export const CreateWorker: FunctionComponent<CreateWorkerPropsType> = ({ onSubmit }) => {
	const formMethods = useForm<FormValues>()

	const handleFormSubmit = async (data: PortfolioWorkerType) => {
		try {
			const res = await onSubmit(data)
			if (res) {
				toast.show('Сохранено')
				formMethods.reset()
			} else {
				toast.error('При отправке произошла ошибка')
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message)
		}
	}

	return (
		<CollapseSection fold={!true} header="Добавить человека">
			<FullpageFormContainer>
				<FormProvider {...formMethods}>
					<form
						onSubmit={formMethods.handleSubmit(handleFormSubmit)}
						autocomplete="off"
					>
						{Object.entries(formScheme).map(([code, scheme]) => (
							<FiledForm
								key={code}
								name={code}
								type={scheme.type}
								label={scheme.title}
								readonly={scheme.readonly}
								required={scheme.required}
							/>
						))}
						{/* TODO: [MIDDLE] пробрасывать в register */}
						{/* pattern: {
							value: /^(https?:\/\/).+$/i,
							message: 'Должна быть валидная ссылка'
						} */}
						<ButtonGroup variant="gap">
							<FormButton
								type="submit"
								variant="default"
								disabled={formMethods.formState.isSubmitting}
							>
								{formMethods.formState.isSubmitting ? 'Добавление…' : 'Добавить'}
							</FormButton>
						</ButtonGroup>
					</form>
				</FormProvider>
			</FullpageFormContainer>
		</CollapseSection>
	)
}
