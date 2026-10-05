import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'
import { useRoute } from 'preact-iso'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FormProvider } from 'react-hook-form'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { getResetValues } from 'components/form/EMPTY_FORM'
import { personApi } from 'repositories/person-api'

const handlePersonSubmit = async (data: NokiaPersonSimpleType) => {
	if (data.id) {
		await personApi.edit(data)
	} else {
		await personApi.create(data)
	}
}

interface NokiaPersonFormContainerProps {
	initialData: NokiaPersonSimpleType | undefined
}

export const NokiaPersonFormContainer: FunctionComponent<NokiaPersonFormContainerProps> = ({
	initialData,
}) => {
	const { path } = useRoute()

	const formMethods = useForm<NokiaPersonSimpleType>({
		defaultValues: initialData
	})

	useEffect(() => {
		// TODO: [MIDDLE] разобраться почему сюда при переходе с редактирования на создание пробрасываются старые данные
		formMethods.reset(initialData ?? {})
	}, [initialData, path, formMethods.reset])

	const handleRemove = (id: NokiaPersonSimpleType['id']) => async () => {
		personApi.delete(id)
	}

	return (
		<FullpageFormContainer>
			<FormProvider {...formMethods}>
				<form
					onSubmit={formMethods.handleSubmit(handlePersonSubmit)}
					autocomplete="off"
				>
					{/* TODO: [LIGHT] type="number" */}
					{!!initialData?.id && (
						<FiledForm name="id" label="ID" readonly />
					)}
					<FiledForm name="name" label="Имя" />
					<FiledForm name="alias" label="Псевдоним" />
					<FiledForm name="nick" label="Никнейм" />
					<FiledForm
						type="textarea"
						name="description"
						label="Описание"
						desciption={
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
