import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { TextContainer } from 'components/ui/text-container'
import { FormProvider, useForm } from 'react-hook-form'
import { as } from 'utils/types/as'
import { faqApi } from 'repositories/faq-api.repository'
import { ApiError } from 'errors/higimo-api-error'
import { toast } from 'toast'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'
import { FiledForm } from 'components/form/filed-form'
import { ButtonGroup } from 'components/form/button-group'
import { FormButton } from 'components/form/form-button'
import { getResetValues } from 'components/form/EMPTY_FORM'

type FormValues = Partial<FaqType>


type FaqSinglePropsType = {
	initialData: Partial<FaqType> | null
}

export const FaqForm: FunctionComponent<FaqSinglePropsType> = ({ initialData }) => {
	const formMethods = useForm<FormValues>({
		// TODO: сюда же тоже надо getResetValues
		defaultValues: initialData || {}
	})

	const handleSubmit = async (values: FormValues) => {
		try {
			let faq = null
			if (as<FaqType>(values, ['id'])) {
				faq = await faqApi.edit(values)
			} else if (as<FaqType>(values, ['name', 'code', 'text'])) {
				faq = await faqApi.create(values)
			}
			if (faq) {
				toast.success('Создано')
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message || 'Не получилось сохранить')
		}
	}

	const handleRemove = (id: FaqType['id']) => async () => {
		faqApi.delete(id)
	}

	return (
		<FullpageFormContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handleSubmit)}
					autocomplete="off"
				>
					{!!initialData?.id && (
						<FiledForm name="id" label="Идентификатор" type="number" readonly />
					)}
					<FiledForm name="name" label="Название" required />
					<FiledForm name="code" label="Символьный код" required />
					<FiledForm name="text" type="textarea" label="Контент" required />
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Добавление…' : 'Добавить'}
						</FormButton>
						{formMethods.formState.isDirty && (
							<FormButton
								type="button"
								onClick={() => formMethods.reset(getResetValues(initialData, true))}
								variant="outline"
							>
								Очистить
							</FormButton>
						)}
						{!!initialData?.id && (
							<FormButton
								type="button"
								onClick={handleRemove(initialData.id)}
								variant="outline"
							>
								Удалить
							</FormButton>
						)}
					</ButtonGroup>
				</form>
			</FormProvider>
		</FullpageFormContainer>
	)
}
