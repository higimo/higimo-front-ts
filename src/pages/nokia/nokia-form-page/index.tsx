import { FunctionComponent } from 'preact'
import { NokiaMeetingFullType, NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { MentionSuggest } from 'components/mention-textarea/types'
import { NokiaMeetingFormContainer } from 'components/nokia/form/nokia-meeting-form-container'
import { NokiaMenu } from 'components/nokia/nokia-menu'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

// TODO: [LIGHT] унести в утилиты
const getUserSuggestions = (
	persons: NokiaPersonSimpleType[]
): MentionSuggest[] => persons.map(person => {
	return {
		id: person.id,
		display: [person.name, person.alias, person.nick].filter(Boolean).join(' | '),
		person: person
	}
})

const DEFAULT_MEETING_ID = '-1'

export const NokiaMeetingFormPage: FunctionComponent = () => {
	const { params: { meetingId = DEFAULT_MEETING_ID } } = useRoute()

	// TODO: [LIGHT] лучше сменить тип на NokiaMeetingSimpleType, даже если присылает другое
	const [ singleMeeting ] = useApi<NokiaMeetingFullType>(API_ROUTE.nokiaMeetingSingle({ id: meetingId }))
	// TODO: [BACKEND] на беке получать сортируя по популярности
	const [ persons ] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaSuggestPerson)
	// TODO: [BACKEND] получать самых популярных за последние пол года
	const [ topPersons ] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaTopPerson)

	const peoplesSuggest = useMemo(() => {
		return getUserSuggestions(persons.data)
	}, [persons.data])

	const meetingPersons = singleMeeting.data?.person ?? []
	const meeting = singleMeeting.data
		? (({ person: _, ...rest }) => rest)(singleMeeting.data)
		: undefined

	return (
		<Layout title="Редактирование и создание встречи // Нокиа">
			<div className="nokia">
				<NokiaMenu />

				<div className="nokia__content">
					<LoadSuspense data={[singleMeeting, persons, topPersons]}>
						<EmptyData data={[singleMeeting, persons, topPersons]} skipEmpty>
							<NokiaMeetingFormContainer
								initialMeeting={meeting}
								initialPersons={meetingPersons}
								peoplesSuggest={peoplesSuggest}
								topPersons={topPersons.data}
								persons={persons.data}
							/>
						</EmptyData>
					</LoadSuspense>
				</div>
			</div>
		</Layout>
	)
}
