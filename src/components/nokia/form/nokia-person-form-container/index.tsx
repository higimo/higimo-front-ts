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

import { as } from 'utils/types/as'
import { getResetValues } from 'components/form/EMPTY_FORM'
import { personApi } from 'repositories/person-api'
import { toast } from 'toast'

const handlePersonSubmit = async (data: NokiaPersonSimpleType) => {
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
}

interface NokiaPersonFormContainerProps {
	initialData: NokiaPersonSimpleType | null
}

export const NokiaPersonFormContainer: FunctionComponent<NokiaPersonFormContainerProps> = ({
	initialData,
}) => {
	const formMethods = useForm<NokiaPersonSimpleType>({
		defaultValues: initialData || {}
	})

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
