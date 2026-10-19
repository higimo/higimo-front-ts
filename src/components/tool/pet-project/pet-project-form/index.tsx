import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { useForm } from 'react-hook-form'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FromContainer } from 'components/form/form-container'

import { as } from 'utils/types/as'
import { getResetValues } from 'utils/get-reset-values'
import { probbiApi } from 'repositories/probbi-api.repository'

import './style.css'

type FormValues = PetProjectType

const handlePetprojectSubmit = async (values: FormValues) => {
	if (as<PetProjectType>(values, ['id'])) {
		probbiApi.edit(values)
	} else {
		probbiApi.create(values)
	}
}

type PetProjectFormPropsType = {
	initialData: PetProjectType | null
}

// TODO: [HIGH] Запоминать ник автора
// TODO: [HIGH] Запрашивать проекты, учитывая ник
// TODO: [HIGH] Ис админ заменить на разграничения прав
export const PetProjectForm: FunctionComponent<PetProjectFormPropsType> = ({
	initialData
}) => {
	const formMethods = useForm<FormValues>({
		defaultValues: initialData || {}
	})

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
			</FromContainer>
		</div>
	)
}
