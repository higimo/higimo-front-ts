import { FunctionComponent } from 'preact'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FieldGroup } from 'components/form/field-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'
import { FullWidthContainer } from 'components/ui/full-width-container/FullWidthContainer'
import { InnerFromContainer } from 'components/form/inner-from-container'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { getResetValues } from 'components/form/EMPTY_FORM'
import { toast } from 'toast'

import { EMPTY_FORM } from 'components/form/EMPTY_FORM'

export type FormValues = {
	id: number
	title: string
	description: string
	tags: string
	priority: string

}

const LaravelError = {
	'message': 'The given data was invalid.',
	'errors': {
		'title': ['Поле title обязательно для заполнения.'],
		'tags': ['Поле tags должно быть строкой.', 'Ты пидор']
	}
}

type FormFiledsPropsType = {
	defaultValues?: Partial<FormValues>
}
const FormFileds: FunctionComponent<FormFiledsPropsType> = ({
	defaultValues = EMPTY_FORM
}) => {
	const formMethods = useForm<FormValues>({
		defaultValues: getResetValues(defaultValues)
	})

	const handleSubmit = async (values: FormValues) => {
		console.log('submit:', values)

		try {
			throw LaravelError
			// await sendRequest('/api/meetings', { method: 'POST', values: data })
		} catch (error) {
			console.log('error', error)
			// if (error instanceof ApiError && error.status === 422) {
			// @ts-ignore
			if ('errors' in error) { // isLaravelError
				const laravelErrors = error?.errors as Record<string, string[]>

				for (const [field, messages] of Object.entries(laravelErrors)) {
					formMethods.setError(field as keyof FormValues, {
						type: 'server',
						message: messages.join(', '),
					})
				}
				return
			} else {
				toast.error('Какая-то другая ошибка, сори')
			}
		}
	}

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(handleSubmit)}>
				<ButtonGroup>
					<ButtonGroup>
						<FormButton variant="default">Ответить</FormButton>
					</ButtonGroup>
					<ButtonGroup>
						<FormButton variant="secondary">Непрочитано</FormButton>
						<FormButton variant="secondary">Архивировать</FormButton>
					</ButtonGroup>
					<ButtonGroup>
						<FormButton variant="outline">Тегировать</FormButton>
						<FormButton variant="outline">В календарь</FormButton>
						<FormButton variant="outline">В задачи</FormButton>
					</ButtonGroup>

					<ButtonGroup>
						<FormButton variant="destructive">Удалить</FormButton>
					</ButtonGroup>
				</ButtonGroup>
				<FieldGroup>
					<FiledForm name="id" label="Идентификатор" type="number" readonly />
					<FiledForm name="title" label="Заголовок" labelDescription="Ты пидор" />
					<FiledForm name="description" label="Описание" type="textarea" description="Помогает анализу проблемы" />
				</FieldGroup>
				<FiledForm name="tags" label="Теги" support="через запятую" />
				<FiledForm name="priority" label="Приоритет" />
				<ButtonGroup>
					<ButtonGroup>
						<FormButton type="submit" variant="default">Сохранить</FormButton>
					</ButtonGroup>
					<ButtonGroup>
						<FormButton
							type="button"
							onClick={() => formMethods.reset(getResetValues(defaultValues, true))}
							variant="outline"
						>
							Очистить
						</FormButton>
					</ButtonGroup>
				</ButtonGroup>
			</form>
		</FormProvider>
	)
}

const DAFAULT_VALUE: Partial<FormValues> = { id: 99, title: 'default value' }

export const TypoPage: FunctionComponent = () => (
	<div className="page">
		<FullpageFormContainer>
			<FormFileds />
		</FullpageFormContainer>
		<FullWidthContainer style={{background: '#f8fae1'}}>
			<TextContainer>
				<InnerFromContainer>
					<FormFileds defaultValues={DAFAULT_VALUE} />
				</InnerFromContainer>
			</TextContainer>
		</FullWidthContainer>
	</div>
)
