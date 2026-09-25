import { FunctionComponent } from 'preact'
import { NokiaMeetingSimpleType, NokiaPersonSimpleType, NokiaPersonType, NokiaRichMeetingType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingFormContainer } from 'components/nokia/form/nokia-meeting-form-container'
import { NotFoundData } from 'components/ui/not-found-data'

import { MeetingApiRepository } from 'repositories/meeting-api.repository'

import { API_ROUTE } from 'dic/API_ROUTE'

import './style.css'

const getUserSuggestions = (persons: NokiaPersonSimpleType[]): MentionSuggest[] => persons.map(person => {
	return {
		id: person.id,
		display: [person.name, person.alias, person.nick].filter(Boolean).join(' | ')
	} as MentionSuggest
})

const DEFAULT_MEETING_ID = '-1'

interface PersonFormContainerProps {
  meetingApi?: MeetingApiRepository
}

// TODO: [LIGHT] почистить весь компонент, много лишнего
export const NokiaMetingFormController: FunctionComponent<PersonFormContainerProps> = ({
	meetingApi = new MeetingApiRepository()
}) => {
	const { params: { meetingId = DEFAULT_MEETING_ID } } = useRoute()

	const [singleMeeting] = useApi<NokiaRichMeetingType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	// TODO: [BACKEND] на беке получать сортируя по популярности
	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaSuggestPerson)
	// TODO: [BACKEND] получать самых популярных за последние пол года
	const [topPersons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaTopPerson)

	const isLoading = useLoadingState([singleMeeting.status, persons.status, topPersons.status])
	const isEmptySingleMeeting = useEmptyDataState(singleMeeting.data)
	const isEmptyPersons = useEmptyDataState(persons.data)
	const isEmptyTopPersons = useEmptyDataState(topPersons.data)

	if (isLoading) {
		return <Loading />
	}
	if (singleMeeting.status === 'ERROR' || persons.status === 'ERROR' || topPersons.status === 'ERROR') {
		return <NotFoundData />
	}
	if (isEmptySingleMeeting || isEmptyPersons || isEmptyTopPersons) {
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
