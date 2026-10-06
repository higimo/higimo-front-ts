import { ApiError } from 'errors/higimo-api-error'
import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { getResetValues } from 'components/form/EMPTY_FORM'
import { libApi } from 'repositories/lib-api.repository'
import { toast } from 'toast'

import './style.css'

// TODO: [MIDDLE] <T>(v: unknown, fileds) is T foreach filed in v
const isLibraryType = (values: unknown): values is LibraryType => {
	if (typeof values !== 'object' || values === null) {
		return false
	}
	const v = values as Partial<LibraryType>
	return Boolean(v.id) && Boolean(v.author)
}

type FormValues = Partial<LibraryType>


// TODO: [MIDDLE] вот бы везде передавать через {...}
type LibraryAdminPropsType = Partial<LibraryType>

export const LibraryForm: FunctionComponent<LibraryAdminPropsType> = (initialData) => {
	// TODO: [LIGHT] не устанавливается initialData
	const formMethods = useForm<FormValues>()

	const handleSubmit = async (values: FormValues) => {
		try {
			let book = null
			if (isLibraryType(values)) {
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
					{!!initialData?.id && (
						<FiledForm name="id" label="Идентификатор" type="number" readonly />
					)}
					<FiledForm name="author" label="Автор" required />
					<FiledForm name="name" label="Название" required />
					<FiledForm name="addon" label="Допназвание" />
					<FiledForm name="isbn" label="ISBN" />
					<FiledForm name="img" label="Картинка" />
					<FiledForm name="anons" type="textarea" label="Описание" />
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
