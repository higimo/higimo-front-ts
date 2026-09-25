import { FunctionComponent } from 'preact'
import { NokiaMeetingFullType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingFormContainer } from 'components/nokia/form/nokia-meeting-form-container'

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
}

// TODO: [LIGHT] почистить весь компонент, много лишнего
export const NokiaMetingFormController: FunctionComponent<PersonFormContainerProps> = () => {
	const { params: { meetingId = DEFAULT_MEETING_ID } } = useRoute()

	// TODO: лучше сменить тип на NokiaMeetingSimpleType, даже если присылает другое
	const [singleMeeting] = useApi<NokiaMeetingFullType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	// TODO: [BACKEND] на беке получать сортируя по популярности
	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaSuggestPerson)
	// TODO: [BACKEND] получать самых популярных за последние пол года
	const [topPersons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaTopPerson)

	const peoplesSuggest = useMemo(() => {
		return getUserSuggestions(persons.data)
	}, [persons.data])

	const isLoading = useLoadingState([singleMeeting.status, persons.status, topPersons.status])
	if (isLoading) {
		return <Loading />
	}

	const meetingPersons = singleMeeting.data?.person ?? []
	const meeting = singleMeeting.data
		? (({ person: _, ...rest }) => rest)(singleMeeting.data)
		: undefined

	return (
		<NokiaMeetingFormContainer
			initialMeeting={meeting}
			initialPersons={meetingPersons}
			peoplesSuggest={peoplesSuggest}
			topPersons={topPersons.data}
			persons={persons.data}
		/>
	)
}
