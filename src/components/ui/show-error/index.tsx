import { FieldError } from 'react-hook-form'

export const ShowError = ({ error }: { error: FieldError | null; }) => {
	if (!error) {
		return null;
	}
	return (
		<span className="error-message">{error.message}</span>
	);
};
