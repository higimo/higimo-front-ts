import { HigimoApiError } from 'errors/higimo-api-error'
import { FormScheme } from 'api-types/form.types'
import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useForm } from 'react-hook-form'
import { useFormPersist } from 'from-persist/use-form-persist'

import { ButtonGroup } from 'components/form/button-group'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'
import { RenderFormScheme } from 'components/form/render-form-scheme'

import { as } from 'utils/types/as'
import { getDefaultUri, getPersistValue } from 'from-persist/index'
import { libApi } from 'repositories/lib-api.repository'
import { toast } from 'toast'

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

type LibraryAdminPropsType = {
	initialData: LibraryType | null
}

export const LibraryForm: FunctionComponent<LibraryAdminPropsType> = ({
	initialData,
}) => {
	const uri = getDefaultUri()
	const formMethods = useForm<FormValues>({
		defaultValues: getPersistValue<Partial<FormValues>>(uri, initialData, {}),
	})
	useFormPersist(uri, formMethods)

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
			toast.error((error as HigimoApiError).message || 'Не получилось сохранить')
		}
	}

	const handleRemove = (id: LibraryType['id']) => async () => {
		libApi.delete(id)
	}

	return (
		<FromContainer variant="full">
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handleSubmit)}
					autocomplete="off"
				>
					<RenderFormScheme<FormValues> formScheme={formScheme} />
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
								onClick={() => formMethods.reset(initialData ?? undefined)}
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
		</FromContainer>
	)
}
