import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'
import { useRoute } from 'preact-iso'

import { NokiaPersonFormFields } from 'components/nokia/form/nokia-person-form-fields'

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

	const formMethods = useForm<NokiaPersonSimpleType>({})

	const {
		handleSubmit,
		formState: {
			isDirty,
			isSubmitting
		},
		reset,
	} = formMethods

	useEffect(() => {
		if (initialData) {
			reset(initialData)
		}
	}, [initialData, path, reset])

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
					<button type="reset" onClick={() => reset(initialData)}>Очистить</button>
				)}
			</div>
		</form>
	)
}
