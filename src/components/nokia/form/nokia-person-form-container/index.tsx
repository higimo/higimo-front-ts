import { FunctionComponent } from 'preact'
import { NokiaPersonApiType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { usePersonForm } from 'components/nokia/form/hooks/use-person-form'

import { PersonApi } from 'components/nokia/form/person-api'
import { NokiaPersonFormFields } from 'components/nokia/form/nokia-person-form-fields'
import { ShowFormResult } from 'components/form/show-form-result'

import '../../nokia-style.css'

interface NokiaPersonFormContainerProps {
	personApi: PersonApi
	initialData: NokiaPersonApiType | undefined
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
				setValue(key as keyof NokiaPersonApiType, value)
			})
		}
	}, [initialData, setValue])

	const handleFormSubmit = handleSubmit(onSubmit)

	return (
		<form className="container nokia-form" onSubmit={handleFormSubmit}>
			<NokiaPersonFormFields formMethods={formMethods} />

			<div className="form__button">
				<button
					type="submit"
					className="default-form__submit"
					disabled={isSubmitting || isSubmitted}
				>
					{isSubmitting ? 'Сохранение…' : 'Сохранить'}
				</button>

				{(isSubmitted || isSubmitting) && (
					<ShowFormResult<NokiaPersonApiType>
						status={status}
						reset={() => reset(/*{ date: date }*/)}
					/>
				)}
			</div>
		</form>
	)
}
