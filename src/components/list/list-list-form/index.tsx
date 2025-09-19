import { FunctionComponent, h } from 'preact'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import './style.css'
import sendRequest from 'utils/send-request'
import { ShowFormResult } from 'components/form/show-form-result'

const ListListScheme = ['id', 'title', 'created_at', 'parent', 'code'] as const
type ListListSchemeType = typeof ListListScheme[number]

type FormScheme<T extends string> = {
	code: T,
	type: string,
	input: 'textarea' | 'input',
	title: string,
}
const scheme: FormScheme<ListListSchemeType>[] = [
	{
		code: 'id',
		type: 'number',
		title: 'Ид',
		input: 'input',
	},
	{
		code: 'title',
		type: 'string',
		title: 'Название',
		input: 'textarea',
	},
	{
		code: 'created_at',
		type: 'date',
		title: 'дата создания',
		input: 'input',
	},
	{
		code: 'parent',
		type: 'number',
		title: 'ид родителья',
		input: 'input',
	},
	{
		code: 'code',
		type: 'string',
		title: 'код',
		input: 'input',
	},
]

const onSubmit = addStatus => values => {
	values.title.split('\n').filter(i => i).forEach(title => {
		sendRequest('/api/v1/lister/item' + (!!values.id ? `/${values.id}` : ''), {
			method: 'POST',
			values: {
				...values,
				title,
			}
		}).then(addStatus)
	})
}

type FormValues = {
	[key in typeof ListListScheme[number]]: string
}

export const ListListForm: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ values, setValues ] = useState({})
	const [ status, setStatus ] = useState([])

	const addStatus = val => setStatus(pState => [ ...pState, val ])

	useEffect(() => {
		sendRequest(`/api/v1/lister/item/${idcode}`)
			.then(val => setValues(val[0]))
	}, [idcode])

	const { register, handleSubmit, formState, reset } = useForm<FormValues>({
		defaultValues: values,
	})

	return (
		<div className="form-container">
			<form className="container" onSubmit={handleSubmit(onSubmit(addStatus))}>
				{scheme.map(schemeElement => [
					<label>{schemeElement.title}</label>,
					h(
						schemeElement.input,
						{
							...register(schemeElement.code),
							name: schemeElement.code,
							defaultValue: values[schemeElement.code] || '',
							className: schemeElement.input,
						}
					)
				])}
				<div className="form__button">
					<button type="submit" className="default-form__submit">Enter</button>
					{(formState.isSubmitted || formState.isSubmitting) && (
						<ShowFormResult<FormValues> status={status} reset={() => reset()} />
					)}
				</div>
			</form>
		</div>

	)
}
