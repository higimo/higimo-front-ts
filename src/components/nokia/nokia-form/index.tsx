import { PeopleMeetingType, PeopleType } from '../../../types'

import cs from 'classnames'

import { NokiaContext, NokiaContextType } from '../../../context/nokia'

import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect, useLayoutEffect } from 'preact/hooks'
import { useAuth } from '../../../hook/use-auth'
import { useRoute } from 'preact-iso'

import sendRequest from '../../../utils/send-request'

import { ShowFormResult } from '../../form/show-form-result'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

import '../nokia-style.css'

const onSubmit = addStatus => values => {
	sendRequest(
		`/api/v1/nokia/meeting/${values.id}`,
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
		values.personId.split(',').map(peopleId => {
			sendRequest(
				'/api/v1/nokia/people-meeting',
				{
					method: 'POST',
					values: {
						people_id: peopleId,
						meeting_id: meetingId,
					}
				}
			).then(addStatus)
		})
	})
}

type FormValues = {
	id: string;
	type: string;
	personId: string;
	date: string;
	description: string;
}

type TopPersonType = {
	count: number;
	id: number;
}
type structTopPersonType = (count: number, id: number) => TopPersonType
const structTopPerson: structTopPersonType = (count, id) => ({ count, id })

type GetTopPersonsType = (links: PeopleMeetingType[], people: PeopleType[]) => TopPersonType[]
const getTopPersons: GetTopPersonsType = (links, people) => {
	let result: TopPersonType[] = links.reduce((accum, item) => {
		accum[item.people_id] = accum[item.people_id] || structTopPerson(0, item.people_id)
		accum[item.people_id].count += 1
		return accum
	}, [])
	result.sort((a, b) => {
		return b.count - a.count
	})
	people.forEach(person => {
		if (!result.some(i => i.id == person.id)) {
			result.push(structTopPerson(0, person.id))
		}
	})
	return result
}

export const NokiaForm = () => {
	const {
		fetchData,
		links,
		people,
		meeting,
		hashPeople,
		hashMeeting,
		hashLink,
	} = useContext(NokiaContext) as NokiaContextType
	useLayoutEffect(fetchData, [])
	

	const { isAuth } = useAuth()
	const { params: { meetingId = '-1' } } = useRoute()


	const { register, handleSubmit, setValue, getValues, watch, formState, reset } = useForm<FormValues>()
	const { personId, type, date } = watch()
	const [ status, setStatus ] = useState([])

	useEffect(() => {
		if (parseInt(meetingId, 10) >= 0 && hashMeeting[meetingId] && hashLink[meetingId]) {
			setValue('date'        , new Date(hashMeeting[meetingId].date * 1000).toISOString().substr(0, 10))
			setValue('description' , hashMeeting[meetingId].description)
			setValue('id'          , hashMeeting[meetingId].id)
			setValue('type'        , hashMeeting[meetingId].type)
			setValue('personId'    , hashLink[meetingId].join(','))
		}
	}, [meetingId, hashMeeting[meetingId], hashLink[meetingId]])

	if (
		!isAuth ||
		!links.length ||
		!people.length ||
		!meeting.length ||
		!Object.keys(hashPeople).length ||
		!Object.keys(hashMeeting).length ||
		!Object.keys(hashLink).length
	) {
		return null
	}

	const addStatus = val => setStatus(pState => [ ...pState, val ])

	const topPersons: PeopleType[] = getTopPersons(links, people).map(item => hashPeople[item.id])
	const selectedPersonId = (personId || '').split(',').map(i => parseInt(i, 10)).filter(i => i)

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
				<textarea {...register('description')} name="description" />
			</div>
			<div>
				<label>Тип встречи</label>
			</div>
			<div>
				<select {...register('type')} name="type">
					<option selected={type === 'offline'} value="offline">дружеская</option>
					<option selected={type === 'work'} value="work">деловая</option>
					<option selected={type === 'net'} value="net">интернет</option>
				</select>
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
							{selectedPersonId.map(persId => (hashPeople[persId] || {}).name ?? []).join(', ')}
						</small>
					</div>
				)}
				<div className="person-selector">
					{topPersons.map(person => (
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
