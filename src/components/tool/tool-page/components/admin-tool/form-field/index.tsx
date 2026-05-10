import { FunctionComponent } from 'preact'

import { useCallback } from 'preact/hooks'

interface FormFieldProps {
	label: string
	name: string
	value: string
	onChange: (name: string, value: string) => void
	type?: 'text' | 'password' | 'textarea'
}
export const FormField: FunctionComponent<FormFieldProps> = ({
	label, name, value, onChange, type = 'text'
}) => {
	const handleChange = useCallback((e: Event) => {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement
		onChange(name, target.value)
	}, [name, onChange])

	return (
		<div className="tool-page__field library-admin__row">
			<label className="library-admin__label">{label}:</label>
			{type === 'textarea' ? (
				<textarea className="library-admin__input" value={value} name={name} onInput={handleChange} />
			) : (
				<input
					className="library-admin__input"
					type={type}
					value={value}
					name={name}
					onInput={handleChange} />
			)}
		</div>
	)
}
