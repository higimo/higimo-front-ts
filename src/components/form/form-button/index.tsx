import { FunctionComponent } from 'preact'

import { useFormContext } from 'react-hook-form'

export const FormButton: FunctionComponent = props => {
	const { formState } = useFormContext()
	return (
		<button
			type="submit"
			className="default-form__submit"
			disabled={formState.isSubmitted || formState.isSubmitting}
		>
			{props.children}
		</button>
	)
}
