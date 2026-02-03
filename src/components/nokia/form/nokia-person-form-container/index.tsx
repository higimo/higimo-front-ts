import { FunctionComponent } from 'preact'
import { NewNokiaMicroPersonType } from 'types'

import { useEffect } from 'preact/hooks'
import { usePersonForm } from 'components/nokia/form/hooks/use-person-form'

import { PersonApi } from 'components/nokia/form/person-api'
import { PersonFormFields } from 'components/nokia/form/person-form-fields'
import { ShowFormResult } from 'components/form/show-form-result'

import '../../nokia-style.css'

interface NokiaPersonFormContainerProps {
	personApi: PersonApi
	initialData: NewNokiaMicroPersonType | undefined
	isEditMode: boolean
}

export const NokiaPersonFormContainer: FunctionComponent<NokiaPersonFormContainerProps> = ({
	personApi,
	initialData,
	isEditMode,
}) => {
	const {
		formMethods,
		status,
		isSubmitting,
		isSubmitted,
		onSubmit,
		resetForm,
	} = usePersonForm({ personApi, isEditMode })

	const { handleSubmit, setValue, reset } = formMethods

	useEffect(() => {
		if (initialData) {
			Object.entries(initialData).forEach(([key, value]) => {
				setValue(key as keyof NewNokiaMicroPersonType, value)
			})
		}
	}, [initialData, setValue])

	const handleFormSubmit = handleSubmit(onSubmit)

	return (
		<form className="container nokia-form" onSubmit={handleFormSubmit}>
			<PersonFormFields formMethods={formMethods} />

			<div className="form__button">
				<button
					type="submit"
					className="default-form__submit"
					disabled={isSubmitting || isSubmitted}
				>
					{isSubmitting ? 'Сохранение…' : 'Сохранить'}
				</button>

				{(isSubmitted || isSubmitting) && (
					<ShowFormResult<NewNokiaMicroPersonType>
						status={status}
						reset={resetForm}
					/>
				)}
			</div>
		</form>
	)
}
