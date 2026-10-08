import { ApiError } from 'errors/higimo-api-error'
import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { as } from 'utils/types/as'
import { getResetValues } from 'utils/get-reset-values'
import { libApi } from 'repositories/lib-api.repository'
import { toast } from 'toast'

import './style.css'

type FormValues = Partial<LibraryType>

const formScheme: FormScheme<LibraryType> = {
	id:     { title: 'Идентификатор', type: 'number', readonly: true, },
	author: { title: 'Автор', },
	name:   { title: 'Название', },
	addon:  { title: 'Допназвание', },
	isbn:   { title: 'ISBN', },
	img:    { title: 'Картинка', },
	anons:  { title: 'Описание', type: 'textarea', },
}

// TODO: [HARD] вот бы везде передавать через {...}
type LibraryAdminPropsType = {
	initialData: LibraryType | null
}

export const LibraryForm: FunctionComponent<LibraryAdminPropsType> = ({ initialData }) => {
	const formMethods = useForm<FormValues>({
		defaultValues: initialData || {}
	})

	const handleSubmit = async (values: FormValues) => {
		try {
			let book = null
			if (as<LibraryType>(values, ['id'])) {
				book = await libApi.edit(values)
			} else {
				book = await libApi.create(values)
			}
			if (!book) {
			}
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message || 'Не получилось сохранить')
		}
	}

	const handleRemove = (id: LibraryType['id']) => async () => {
		libApi.delete(id)
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
							readonly={scheme.readonly}
							label={scheme.title}
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
