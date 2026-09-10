import { FunctionComponent } from 'preact'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType, NokiaRichMeetingType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaMeetingFormContainer } from 'components/nokia/form/nokia-meeting-form-container'
import { NotFoundData } from 'components/ui/not-found-data'

import { MeetingApiService } from 'components/nokia/form/person-api'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../../nokia-style.css'
import './style.css'

const getUserSuggestions = (persons: NokiaPersonSimpleType[]): string[] => persons.map(person => {
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
	// TODO: [LIGHT] перенести в page
	const { params: { meetingId = DEFAULT_MEETING_ID } } = useRoute()

	const [singleMeeting] = useApi<NokiaRichMeetingType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	const isLoadingSingleMeeting = useLoadingState([singleMeeting.status])
	const isEmptySingleMeeting = useEmptyDataState(singleMeeting.data)

	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaPerson)
	const isLoadingPersons = useLoadingState([persons.status])
	const isEmptyPersons = useEmptyDataState(persons.data)

	// TODO: [BACKEND] получать самых популярных за последние пол года
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
	const initialMeetData: NokiaMeetingSimpleType | undefined = !isEmptySingleMeeting && isEditMode ? {
		id:          currentMeeting.id,
		type:        currentMeeting.type,
		date:        currentMeeting.date,
		date_start:  currentMeeting.date_start,
		date_end:    currentMeeting.date_end,
		description: currentMeeting.description,
	} : undefined

	const initialPersonData: NokiaPersonSimpleType[] | undefined = (
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
			initialPersons={initialPersonData || []}
			isEditMode={isEditMode}
			peoplesSuggest={peoplesSuggest}
			topPersons={topPersons.data}
			persons={persons.data}
		/>
	)
}
