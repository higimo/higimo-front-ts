import { NewPersonType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useForm } from 'react-hook-form'
import { useLoadingState } from 'hook/use-loading-state'
import { useRoute } from 'preact-iso'
import { useState, useEffect } from 'preact/hooks'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ShowFormResult } from 'components/form/show-form-result'

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

	const [persons] = useApi<NewPersonType>(API_ROUTE.nokiaPerson)
	const isLoadingPersons = useLoadingState([persons.status])
	const isEmptyPersons = useEmptyDataState(persons.data)

	const [singlePerson] = useApi<NewPersonType>(API_ROUTE.nokiaPersonSingle({ id: personId }))
	const isLoadingSinglePerson = useLoadingState([singlePerson.status])
	const isEmptySinglePerson = useEmptyDataState(singlePerson.data)

	if (isLoadingPersons) {
		return <Loading />
	}
	if (isEmptyPersons)	{
		// Персоны не прогрузились
		return (
			<NotFoundData />
		)
	}

	const { register, handleSubmit, setValue, formState, reset } = useForm<FormValues>({})
	useEffect(() => {
		const currentPerson = singlePerson.data as unknown as NewPersonType

		if (parseInt(personId, 10) && !isLoadingSinglePerson && !isEmptySinglePerson) {
			setValue('id', currentPerson.id || null)
			setValue('name', currentPerson.name)
			setValue('alias', currentPerson.alias)
			setValue('nick', currentPerson.nick)
			setValue('description', currentPerson.description)
		}
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
