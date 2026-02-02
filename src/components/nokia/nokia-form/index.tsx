import { NewNokiaMicroPersonType, NewPersonType, NewRichMeetingType, PeopleMeetingType, PeopleType } from 'types'

import cs from 'classnames'

import { Controller, useForm } from 'react-hook-form'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useRoute } from 'preact-iso'
import { useState, useEffect, useMemo } from 'preact/hooks'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { ShowFormResult } from 'components/form/show-form-result'
import TextInput from 'react-autocomplete-input'

import sendRequest from 'utils/send-request'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import '../nokia-style.css'
import './style.css'

const getUserSuggestions = (persons: NewNokiaMicroPersonType[]): string[] => persons.map(person => {
	return [
		person.name,
		person.nick,
	].filter(Boolean).join(' ') + ` [${person.id}]`
})

const onSubmit = addStatus => values => {
	sendRequest(
		API_ROUTE.nokiaMeetingSingle({ id: values.id }),
		{
			method: 'POST',
			values: {
				date: new Date(values.date).getTime() / 1000,
				description: values.description,
				type: values.type,
			}
		}
	)
	.then(meetingId => {
		// TODO: BACKEND Дописать редактирование связей
		// values.personId.split(',').map(peopleId => {
		// 	sendRequest(
		// 		API_ROUTE.nokiaPeopleMeeting,
		// 		{
		// 			method: 'POST',
		// 			values: {
		// 				people_id: peopleId,
		// 				meeting_id: meetingId,
		// 			}
		// 		}
		// 	).then(addStatus)
		// })
	})
}

type FormValues = {
	id: string
	type: string
	personId: string
	date: string
	description: string
}

export const NokiaForm = () => {
	const { params: { meetingId = '-1' } } = useRoute()

	const [singleMeeting] = useApi<NewRichMeetingType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	const isLoadingSingleMeeting = useLoadingState([singleMeeting.status])
	const isEmptySingleMeeting = useEmptyDataState(singleMeeting.data)

	const [persons] = useApi<NewPersonType>(API_ROUTE.nokiaPerson)
	const isLoadingPersons = useLoadingState([persons.status])
	const isEmptyPersons = useEmptyDataState(persons.data)

	const [topPersons] = useApi<NewPersonType>(API_ROUTE.nokiaTopPerson)
	const isLoadingTopPersons = useLoadingState([topPersons.status])
	const isEmptyTopPersons = useEmptyDataState(topPersons.data)

	const { control, register, handleSubmit, setValue, watch, getValues, formState, reset } = useForm<FormValues>()

	const { personId, type, date } = watch()
	const [ status, setStatus ] = useState([])

	const peoplesSuggest = useMemo(() => {
		return getUserSuggestions(persons.data)
	}, [persons.data])

	useEffect(() => {
		const currentSingleMeeting = singleMeeting.data as unknown as NewRichMeetingType

		if (parseInt(meetingId, 10) >= 0 && !isLoadingSingleMeeting && !isEmptySingleMeeting) {
			setValue('id', currentSingleMeeting.id.toString())
			setValue('date', new Date(currentSingleMeeting.date * 1000).toISOString().substr(0, 10))
			setValue('description', currentSingleMeeting.description)
			setValue('type', currentSingleMeeting.type)
			setValue('personId', currentSingleMeeting.person.map(i => i.id).join(','))
		}
	}, [meetingId, isLoadingSingleMeeting, isEmptySingleMeeting, singleMeeting.data])

	const addStatus = val => setStatus(pState => [ ...pState, val ])

	const selectedPersonId = (personId || '').split(',').map(i => parseInt(i, 10)).filter(i => i)

	if (isLoadingSingleMeeting || isLoadingPersons || isLoadingTopPersons) {
		return <Loading />
	}

	// TODO Кажись, использовать https://github.com/yury-dymov/react-autocomplete-input/tree/master хуёвая идея, надо его переписать на свой компонент!
	return (
		<form className="container" onSubmit={handleSubmit(onSubmit(addStatus))}>
			<div>
				<label>id</label>
			</div>
			<div>
				<input {...register('id')} readOnly name="id" />
			</div>
			<div>
				<label>Когда?</label>
			</div>
			<div>
				<input {...register('date')} type="date" name="date" />
			</div>
			<div class="single-row">
				<label>Как прошло?</label>
			</div>
			<div class="single-row">
				<span>Упомяните пользователя через @</span>
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field }) => (
						// @ts-ignore
						<TextInput
							{...field}
							trigger="@"
							maxOptions={0}
							regex={'^[a-zA-Z0-9_\\-а-яА-ЯёЁ]+$'}
							options={peoplesSuggest}
							changeOnSelect={(trigger, slug) => {
								const [_, name, id] = slug.match(/(.*?) \[(\d+)\]$/s)
								setValue('personId', personId + ',' + id)

								return trigger + name
							}}
						/>
					)}
				/>
				{/* <textarea {...register('description')} name="description" /> */}
			</div>
			<div>
				<label>Тип встречи</label>
			</div>
			<div>
				<input type="text" {...register('type')} name="type" />
				{/* <select {...register('type')} name="type">
					<option selected={type === 'offline'} value="offline">дружеская</option>
					<option selected={type === 'work'} value="work">деловая</option>
					<option selected={type === 'net'} value="net">интернет</option>
				</select> */}
			</div>
			<div className="single-row">
				<label>С кем </label>
				<a href={ROUTE_LINKS.nokiaPeopleForm}>+ person</a>
			</div>
			<div className="single-row">
				<input name="personId" type="text" {...register('personId')} />
				{!!selectedPersonId.length && (
					<div className="support">
						<small>
							{selectedPersonId.map(persId => (persons.data.find(i => i.id == persId).name)).join(', ')}
						</small>
					</div>
				)}
				{/* Надо сделать единый компонент для всей нокии, что-то типа тегов NokiaPersonTag */}
				<div className="person-selector">
					{topPersons.data.map(person => (
						<div
							onClick={() => setValue('personId', [...(getValues().personId || '').split(','), person.id].filter(Boolean).join(','))}
							className={cs(
								'person-selector__person',
								{
									'person-selector__person--selected': selectedPersonId.includes(person.id),
								},
							)}
						>
							{person.name}
						</div>
					))}
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
					<ShowFormResult<FormValues> status={status} reset={() => reset({date: date})} />
				)}
			</div>
		</form>
	)
}
