import { FunctionComponent } from 'preact'
import { NokiaMeetingApiType, NokiaPersonApiType, NokiaPersonType, NokiaRichMeetingType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaMeetingFormContainer } from 'components/nokia/form/nokia-meeting-form-container'
import { NotFoundData } from 'components/ui/not-found-data'

import { MeetingApiService } from '../person-api'

import { API_ROUTE } from 'dic/api-route'

import '../../nokia-style.css'
import './style.css'

const getUserSuggestions = (persons: NokiaPersonApiType[]): string[] => persons.map(person => {
	return [
		person.name,
		person.nick,
	].filter(Boolean).join(' ') + ` [${person.id}]`
})

const DEFAULT_MEETING_ID = '-1'

interface PersonFormContainerProps {
  meetingApi?: MeetingApiService
}

export const NokiaMetingFormController: FunctionComponent<PersonFormContainerProps> = ({
	meetingApi = new MeetingApiService()
}) => {
	const { params: { meetingId = DEFAULT_MEETING_ID } } = useRoute()

	// TODO: вот бы не загружать, если там DEFAULT_ID
	const [singleMeeting] = useApi<NokiaRichMeetingType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	const isLoadingSingleMeeting = useLoadingState([singleMeeting.status])
	const isEmptySingleMeeting = useEmptyDataState(singleMeeting.data)

	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaPerson)
	const isLoadingPersons = useLoadingState([persons.status])
	const isEmptyPersons = useEmptyDataState(persons.data)

	// TODO: получать самых популярных за последние пол года
	const [topPersons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaTopPerson)
	const isLoadingTopPersons = useLoadingState([topPersons.status])
	const isEmptyTopPersons = useEmptyDataState(topPersons.data)

	if (isLoadingSingleMeeting || isLoadingPersons || isLoadingTopPersons) {
		return <Loading />
	}
	if (isEmptyPersons || isEmptyTopPersons) {
		return <NotFoundData />
	}

	const isEditMode = meetingId !== DEFAULT_MEETING_ID

	const currentMeeting = singleMeeting.data
	const initialMeetData: NokiaMeetingApiType | undefined = !isEmptySingleMeeting && isEditMode ? {
		id:          currentMeeting.id,
		type:        currentMeeting.type,
		date:        currentMeeting.date,
		date_start:  currentMeeting.date_start,
		date_end:    currentMeeting.date_end,
		description: currentMeeting.description,
	} : undefined

	const initialPersonData: NokiaPersonApiType[] | undefined = (
		!isEmptySingleMeeting && isEditMode ? currentMeeting.person.map(cur => ({
			id: cur.id,
			name: cur.name,
			alias: cur.alias,
			nick: cur.nick,
			description: cur.description,
		})) : undefined)

	const peoplesSuggest = useMemo(() => {
		return getUserSuggestions(persons.data)
	}, [persons.data])

	return (
		<NokiaMeetingFormContainer
			meetingApi={meetingApi}
			initialData={initialMeetData}
			initialPersons={initialPersonData}
			isEditMode={isEditMode}
			peoplesSuggest={peoplesSuggest}
			topPersons={topPersons.data}
			persons={persons.data}
		/>
	)
}
