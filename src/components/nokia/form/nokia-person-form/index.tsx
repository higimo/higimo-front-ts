import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

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
import { personApi } from 'repositories/person-api.repository'
import { toast } from 'toast'

type NokiaPersonFormContainerPropsType = {
	initialData: NokiaPersonSimpleType | null
}

export const NokiaPersonForm: FunctionComponent<NokiaPersonFormContainerPropsType> = ({
	initialData,
}) => {
	const uri = getDefaultUri()
	const formMethods = useForm<NokiaPersonSimpleType>({
		defaultValues: getPersistValue<Partial<NokiaPersonSimpleType>>(uri, initialData, {}),
	})
	useFormPersist(uri, formMethods)

	const handlePersonSubmit = async (data: NokiaPersonSimpleType) => {
		try {
			let result: NokiaPersonSimpleType | null
			if (as<NokiaPersonSimpleType>(data, ['id'])) {
				result = await personApi.edit(data)
			} else {
				result = await personApi.create(data)
			}
			if (result) {
				toast.success('Схоронил')
			} else {
				toast.warning('Не получилось')
			}
		} catch (error) {
			handleFormError(error, formMethods.setError)
			handleApiError(error)
		}
	}

	const handleRemove = (id: NokiaPersonSimpleType['id']) => async () => {
		try {
			const res = await personApi.delete(id)
			if (!!res) {
				toast.success(`Удалён [${id}]`)
			}
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<FromContainer variant="full">
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handlePersonSubmit)}
					autocomplete="off"
				>
					{!!initialData?.id && (
						<FiledForm name="id" label="ID" type="number" readonly />
					)}
					<FiledForm name="name" label="Имя" required />
					<FiledForm name="alias" label="Псевдоним" />
					<FiledForm name="nick" label="Никнейм" />
					<FiledForm
						type="textarea"
						name="description"
						label="Описание"
						description={
							'Аватарка, заметки про человека, вхождения в круги, знакомства с другими '
							+ 'людьми, взгляды, аллергии, болезни, контактные данные, социальные сети, '
							+ 'дата рождения, таланты, увлечения'
						}
					/>
					<ButtonGroup variant="gap">
						<FormButton
							type="submit"
							variant="default"
							disabled={formMethods.formState.isSubmitting}
						>
							{formMethods.formState.isSubmitting ? 'Сохраняю…' : 'Сохранить'}
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
