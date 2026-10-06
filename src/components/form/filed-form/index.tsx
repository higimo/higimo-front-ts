import { FunctionComponent } from 'preact'

import { useId } from 'preact/hooks'
import { useFormContext } from 'react-hook-form'

import cs from 'classnames'

import '../form-style.css'

export type FiledFormPropsType = {
	label: string
	name: string
	labelDescription?: string
	desciption?: string
	support?: string
	type?: 'textarea' | 'text' | 'password' | 'date' | 'number' | 'datetime-local'
	placeholder?: string
	readonly?: boolean
	autocomplete?: boolean
	autofocus?: boolean
	required?: boolean
}

export const FiledForm: FunctionComponent<FiledFormPropsType> = ({
	label,
	labelDescription,
	type = 'text',
	name,
	readonly,
	autocomplete = false,
	desciption,
	placeholder,
	support,
	autofocus,
	required,
}) => {
	const id = useId()
	const { register, formState: { errors } } = useFormContext()
	const error = errors[name]?.message as string | undefined

	const registerOptions = { required: required ? 'Обязательно' : undefined }

	const inputProps = {
		className: cs('field__input', { 'field__input--error': !!error }),
		id,
		readOnly: readonly,
		placeholder,
		autofocus,
		...register(name, registerOptions),
	}

	return (
		<div className="field__container">
			{!!label && (
				<div className="field__label-container">
					<label className="field__label" htmlFor={id}>{label}</label>
					{!!labelDescription && (
						<div className="field__label-bottom">{labelDescription}</div>
					)}
				</div>
			)}
			<div className="field__input-container">
				<div className="field__content">
					<div className="field__main">
						{type === 'textarea' ? (
							<textarea {...inputProps} {...register(name, registerOptions)} />
						) : (
							<input
								{...inputProps}
								type={type}
								autocomplete={autocomplete ? 'on' : undefined}
								{...register(name, registerOptions)}
							/>
						)}
						{!!error && (
							<div className="field__error">
								{error}
							</div>
						)}
					</div>
					{!!desciption && (
						<div className="field__description">
							{desciption}
						</div>
					)}
				</div>
				{!!support && (
					<div className="field__right-support">
						{support}
					</div>
				)}
			</div>
		</div>
	)
}
