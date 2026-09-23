import { FieldError } from 'react-hook-form'
import { FunctionComponent } from 'preact'

type ShowErrorPropsType = {
	error: FieldError | null | undefined
}

export const ShowError: FunctionComponent<ShowErrorPropsType> = ({ error }) => {
	if (!error) {
		return null
	}
	return (
		<span className="error-message">{error.message}</span>
	)
}
