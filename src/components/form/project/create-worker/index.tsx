import { ApiError } from 'errors/higimo-api-error'
import { PortfolioWorkerType } from 'api-types/portfolio.types'
import { FunctionComponent } from 'preact'

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
						<FiledForm name="full_name" label="Имя" />{/* TODO: [LIGHT] required */}
						<FiledForm name="image" label="Ссылка на фотку" />
						<FiledForm name="login" label="Ник" />
						<FiledForm name="company" label="Где работал" />
						<FiledForm name="role" label="Роль" />
						<FiledForm name="link" label="Ссылка на хомяк" />
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
