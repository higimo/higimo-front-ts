import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { usePersonForm } from 'hook/nokia/use-person-form'

import { NokiaPersonFormFields } from 'components/nokia/form/nokia-person-form-fields'

interface NokiaPersonFormContainerProps {
	initialData: NokiaPersonSimpleType | undefined
	isEditMode: boolean
}

export const NokiaPersonFormContainer: FunctionComponent<NokiaPersonFormContainerProps> = ({
	initialData,
	isEditMode,
}) => {
	const {
		formMethods,
		handlePersonSubmit,
		resetForm,
	} = usePersonForm({ isEditMode })

	const {
		handleSubmit,
		formState:
		{
			isDirty,
			isSubmitting
		},
		reset,
	} = formMethods

	useEffect(() => {
		if (initialData) {
			reset(initialData)
		}
	}, [initialData, reset])

	return (
		<form className="container nokia-form" onSubmit={handleSubmit(handlePersonSubmit)}>
			<NokiaPersonFormFields formMethods={formMethods} />

			<div className="form__button">
				<button
					type="submit"
					className="default-form__submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Сохранение…' : 'Сохранить'}
				</button>
				{isDirty && (
					<button type="reset" onClick={resetForm}>Очистить</button>
				)}
			</div>
		</form>
	)
}
