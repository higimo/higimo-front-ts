import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { useForm } from 'react-hook-form'
import { useFormPersist } from 'from-persist/use-form-persist'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'

import { as } from 'utils/types/as'
import { getDefaultUri, getPersistValue } from 'from-persist/index'
import { handleApiError } from 'utils/api/handle-errors/handle-api-error'
import { handleFormError } from 'utils/api/handle-errors/handle-form-error'
import { probbiApi } from 'repositories/probbi-api.repository'
import { toast } from 'toast'

import './style.css'

type FormValues = PetProjectType


type PetProjectFormPropsType = {
	initialData: PetProjectType | null
}

// TODO: [BACKEND] Запоминать ник автора
// TODO: [BACKEND] Запрашивать проекты, учитывая ник
export const PetProjectForm: FunctionComponent<PetProjectFormPropsType> = ({
	initialData
}) => {
	const uri = getDefaultUri()
	const formMethods = useForm<FormValues>({
		defaultValues: getPersistValue<Partial<FormValues>>(uri, initialData, {}),
	})
	useFormPersist(uri, formMethods)

	const handlePetprojectSubmit = async (values: FormValues) => {
		try {
			let res
			if (as<PetProjectType>(values, ['id'])) {
				res = await probbiApi.edit(values)
			} else {
				res = await probbiApi.create(values)
			}
			if (res) {
				toast.success('Готово')
			}
		} catch (error) {
			handleFormError(error, formMethods.setError)
			handleApiError(error)
		}
	}

	const handleRemove = (id: PetProjectType['id']) => () => {
		console.log(`Хочу удалить ${id}`)
	}

	return (
		<div className="pet-project">
			<FromContainer variant="full">
				<FormProvider {...formMethods}>
					<form
						onSubmit={formMethods.handleSubmit(handlePetprojectSubmit)}
						autocomplete="off"
					>
						{!!initialData?.id && (
							<FiledForm name="id" label="Идентификатор" type="number" readonly />
						)}
						<FiledForm name="name" label="Название" required />
						<FiledForm name="description" label="Описание" type="textarea" />
						<ButtonGroup variant="gap">
							<FormButton
								type="submit"
								variant="default"
								disabled={formMethods.formState.isSubmitting}
							>
								{formMethods.formState.isSubmitting ? 'Сохранение…' : 'Сохранить'}
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
		</div>
	)
}
