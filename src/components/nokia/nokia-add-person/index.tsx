import { PeopleType } from 'types'

import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect, useLayoutEffect } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { ShowFormResult } from 'components/form/show-form-result'

import { NokiaContext, NokiaContextType } from 'context/nokia'

import sendRequest from 'utils/send-request'

import { API_ROUTE } from 'dic/api-route'

import '../nokia-style.css'

type OnSubmitType = (fewe: any) => (jfeiow: any) => void
const onSubmit: OnSubmitType = addStatus => values => {
	sendRequest(
		API_ROUTE.nokiaPersonSingle({ id: values.id }),
		{
			method: 'POST',
			values: values,
		}
	)
	.then(addStatus)
}

interface PersonFormData {
	id: number
	label: string
	name: string
	alias: string
	nick: string
	description: string
}
type FormValues = PersonFormData

export const NokiaAddPerson = props => {
	const { params: { personId = '-1' }} = useRoute()
	const { fetchData, persons } = useContext(NokiaContext) as NokiaContextType
	useLayoutEffect(fetchData, [])

	if (!persons.length) {
		return null
	}
	let defaultValue: Partial<PeopleType> = {}
	if (personId) {
		defaultValue = persons.find(i => parseInt(personId, 10) == i.id) || {}
	}
	const { register, handleSubmit, setValue, formState, reset } = useForm<FormValues>({})
	useEffect(() => {
		setValue('id', defaultValue.id || null)
		setValue('name', defaultValue.name)
		setValue('alias', defaultValue.alias)
		setValue('nick', defaultValue.nick)
		setValue('description', defaultValue.description)
	}, [props.url])

	const [status, setStatus] = useState([])

	const addStatus = val => setStatus(pState => [ ...pState, val ])

    // TODO: добавить указание тегов
	return (
		<form className="container" onSubmit={handleSubmit(onSubmit(addStatus))}>
			<div>
				<label>id</label>
			</div>
			<div>
				<input {...register('id')} readOnly name="id" />
			</div>
			<div>
				<label>name</label>
			</div>
			<div>
				<input {...register('name')} name="name" />
			</div>
			<div>
				<label>alias</label>
			</div>
			<div>
				<input {...register('alias')} name="alias" />
			</div>
			<div>
				<label>nick</label>
			</div>
			<div>
				<input {...register('nick')} name="nick" />
			</div>
			<div className="single-row">
				<label>Описание</label>
			</div>
			<div className="single-row">
				<textarea {...register('description')} name="description" />
				<div className="support">
					<small>
						Аватарка, заметки про человека, вхождения в круги, знакомства с другими людьми, взгляды, алергии, болезни, контактные данные, социальные сети, дата рождения, таланты, увлечения
					</small>
				</div>
			</div>
			<div className="form__button">
				<button
					type="submit"
					className="default-form__submit"
					disabled={formState.isSubmitted || formState.isSubmitting}
				>
					Сохранить
				</button>
				{(formState.isSubmitted || formState.isSubmitting) && (
					<ShowFormResult<FormValues> status={status} reset={() => reset()} />
				)}
			</div>
		</form>
	)
}
