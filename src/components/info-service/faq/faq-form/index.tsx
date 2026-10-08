import { ApiError } from 'errors/higimo-api-error'
import { FaqType } from 'api-types/faq.types'
import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { as } from 'utils/types/as'
import { faqApi } from 'repositories/faq-api.repository'
import { getResetValues } from 'utils/get-reset-values'
import { toast } from 'toast'

type FormValues = Partial<FaqType>

const formScheme: FormScheme<FormValues> = {
	id:   { title: 'Идентификатор', readonly: true, type: 'number', },
	name: { title: 'Название',      required: true, },
	code: { title: 'Символьный код',required: true, },
	text: { title: 'Контент',       required: true, type: 'textarea', },
}

type FaqSinglePropsType = {
	initialData: FaqType | null
}

export const FaqForm: FunctionComponent<FaqSinglePropsType> = ({ initialData }) => {
	const formMethods = useForm<FormValues>({
		// TODO: [HARD] сюда же тоже надо getResetValues
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
