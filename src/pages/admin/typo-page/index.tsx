import { FunctionComponent } from 'preact'

import './style.css'
import { TextContainer } from 'components/ui/text-container/TextContainer'
import { FullWidthContainer } from 'components/ui/full-width-container/FullWidthContainer'
import cs from 'classnames'
import { useId } from 'preact/hooks'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'toast'

const FullpageFormContainer: FunctionComponent = (props) => {
	return (
		<div className="fullpage-form-container">
			{props.children}
		</div>
	)
}
const InnerFromContainer: FunctionComponent = (props) => {
	return (
		<div className="inner-from-container">
			{props.children}
		</div>
	)
}
const FieldGroup: FunctionComponent = (props) => {
	return (
		<div className="field-group">
			{props.children}
		</div>
	)
}

type FormButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'

type FormButtonPropsType = {
	type?: 'submit' | 'reset' | 'button'
	variant?: FormButtonVariant
	onClick?: () => void
}

const FormButton: FunctionComponent<FormButtonPropsType> = ({
	type = 'button',
	variant = 'default',
	children,
	onClick,
}) => (
	<button
		className={cs('my-button', `my-button--${variant}`)}
		type={type}
		onClick={onClick}
	>
		{children}
	</button>
)

const ButtonGroup: FunctionComponent = (props) => {
	return (
		<div className="button-group">
			{props.children}
		</div>
	)
}

type FiledFormPropsType = {
	label: string
	name: string
	labelDescription?: string
	// error?: string
	desciption?: string
	support?: string
	type?: 'textarea' | 'text'
	readonly?: boolean
}

const FiledForm: FunctionComponent<FiledFormPropsType> = ({
	label,
	labelDescription,
	type = 'text',
	// error,
	name,
	readonly,
	desciption,
	support,
}) => {
	const id = useId()
	const { register, formState: { errors } } = useFormContext()
	const error = errors[name]?.message as string | undefined
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
						{type === 'text'&& (
							<input
								className={cs('field__input', { 'field__input--error': error})}
								id={id}
								type="text"
								readOnly={readonly}
								{...register(name)}
							/>
						)}
						{type === 'textarea' && (
							<textarea
								className={cs('field__input', { 'field__input--error': !!error})}
								id={id}
								readOnly={readonly}
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

const getRememberedValues = (): Partial<FormValues> | null => {
	// потом: return JSON.parse(localStorage.getItem('meeting-draft') || 'null')
	return { title: 'remembered value' }
}


const EMPTY_FORM: Partial<FormValues> = {
}

const getResetValues = (defaultValues: Partial<FormValues>, skipRemember = false): Partial<FormValues> => {
	const remembered = getRememberedValues()
	if (!skipRemember && remembered) {
		return remembered
	}
	if (defaultValues) {
		return defaultValues
	}
	return EMPTY_FORM
}

type FormValues = {
	id: number
	title: string
	description: string
	tags: string
	priority: string

}

const LaravelError = {
	'message': 'The given data was invalid.',
	'errors': {
		'title': ['Поле title обязательно для заполнения.'],
		'tags': ['Поле tags должно быть строкой.', 'Ты пидор']
	}
}

type FormFiledsPropsType = {
	defaultValues?: Partial<FormValues>
}
const FormFileds: FunctionComponent<FormFiledsPropsType> = ({
	defaultValues = EMPTY_FORM
}) => {
	const formMethods = useForm<FormValues>({
		defaultValues: getResetValues(defaultValues)
	})

	const handleSubmit = async (values: FormValues) => {
		console.log('submit:', values)

		try {
			throw LaravelError
			// await sendRequest('/api/meetings', { method: 'POST', values: data })
		} catch (error) {
			console.log('error', error)
			// if (error instanceof ApiError && error.status === 422) {
			// @ts-ignore
			if ('errors' in error) { // isLaravelError
				const laravelErrors = error?.errors as Record<string, string[]>

				for (const [field, messages] of Object.entries(laravelErrors)) {
					formMethods.setError(field as keyof FormValues, {
						type: 'server',
						message: messages.join(', '),
					})
				}
				return
			} else {
				toast.error('Какая-то другая ошибка, сори')
			}
		}
	}

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(handleSubmit)}>
				<ButtonGroup>
					<ButtonGroup>
						<FormButton variant="default">Ответить</FormButton>
					</ButtonGroup>
					<ButtonGroup>
						<FormButton variant="secondary">Непрочитано</FormButton>
						<FormButton variant="secondary">Архивировать</FormButton>
					</ButtonGroup>
					<ButtonGroup>
						<FormButton variant="outline">Тегировать</FormButton>
						<FormButton variant="outline">В календарь</FormButton>
						<FormButton variant="outline">В задачи</FormButton>
					</ButtonGroup>

					<ButtonGroup>
						<FormButton variant="destructive">Удалить</FormButton>
					</ButtonGroup>
				</ButtonGroup>
				<FieldGroup>
					<FiledForm name="id" label="Идентификатор" readonly />
					<FiledForm name="title" label="Заголовок" labelDescription='Ты пидор' />
					<FiledForm name="description" label="Описание" type="textarea" desciption="Помогает анализу проблемы" />
				</FieldGroup>
				<FiledForm name="tags" label="Теги" support="через запятую" />
				<FiledForm name="priority" label="Приоритет" />
				<ButtonGroup>
					<ButtonGroup>
						<FormButton type="submit" variant="default">Сохранить</FormButton>
					</ButtonGroup>
					<ButtonGroup>
						<FormButton
							type="button"
							onClick={() => formMethods.reset(getResetValues(defaultValues, true))}
							variant="outline"
						>
							Очистить
						</FormButton>
					</ButtonGroup>
				</ButtonGroup>
			</form>
		</FormProvider>
	)
}

const DAFAULT_VALUE: Partial<FormValues> = { id: 99, title: 'default value' }

export const TypoPage: FunctionComponent = () => (
	<div className="page">
		<FullpageFormContainer>
			<FormFileds />
		</FullpageFormContainer>
		<FullWidthContainer style={{background: '#f8fae1'}}>
			<TextContainer>
				<InnerFromContainer>
					<FormFileds defaultValues={DAFAULT_VALUE} />
				</InnerFromContainer>
			</TextContainer>
		</FullWidthContainer>
	</div>
)
