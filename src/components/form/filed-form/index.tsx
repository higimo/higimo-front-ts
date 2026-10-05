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

// TODO: [LIGHT] поставить автокомплит по умолчанию выключенным, чтоб только руками включать, нпрмр, на логине
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
					{/* TODO: [MIDDLE] сократить бы. через мапу? */}
					<div className="field__main">
						{type === 'text' && (
							<input
								className={cs('field__input', { 'field__input--error': error })}
								id={id}
								type="text"
								readOnly={readonly}
								placeholder={placeholder}
								autofocus={autofocus}
								autocomplete={autocomplete ? 'on' : undefined}
								{...register(name, registerOptions)}
							/>
						)}
						{type === 'date' && (
							<input
								className={cs('field__input', { 'field__input--error': error })}
								id={id}
								type="date"
								{...register(name, registerOptions)}
							/>
						)}
						{type === 'datetime-local' && (
							<input
								className={cs('field__input', { 'field__input--error': error })}
								id={id}
								type="datetime-local"
								{...register(name, registerOptions)}
							/>
						)}
						{type === 'number' && (
							<input
								className={cs('field__input', { 'field__input--error': error })}
								id={id}
								type="number"
								{...register(name, registerOptions)}
							/>
						)}
						{type === 'password' && (
							<input
								className={cs('field__input', { 'field__input--error': error })}
								id={id}
								type="password"
								readOnly={readonly}
								placeholder={placeholder}
								autocomplete={autocomplete ? 'on' : undefined}
								autofocus={autofocus}
								{...register(name, registerOptions)}
							/>
						)}
						{type === 'textarea' && (
							<textarea
								className={cs('field__input', { 'field__input--error': !!error })}
								id={id}
								readOnly={readonly}
								placeholder={placeholder}
								autofocus={autofocus}
								{...register(name)}
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
