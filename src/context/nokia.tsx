import { MeetingType, NewNokiaTagGroupType, NewPersonType, NewRichMeetingType, NewTagType, PeopleMeetingType, PeopleTag, PeopleType } from 'types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { createContext } from 'preact'

import { API_ROUTE } from 'dic/api-route'

export type NokiaContextType = {
	fetchData: () => void
	richMeeting: NewRichMeetingType[]
	persons: NewPersonType[]
	tags: NewTagType[]
	tagGroups: NewNokiaTagGroupType[]

	meeting: MeetingType[]
	links: PeopleMeetingType[]
	peopleTag: PeopleTag[]
	hashPeople: { [key in number]: PeopleType }
	hashMeeting: { [key in number]: MeetingType }
	hashLink: { [key in number]: number[] }
	hashTag: { [key in number]: number[] }
	hashPeopleTag: { [key in number]: number[] }
	updateLinks: () => void
	updatePeople: () => void
	updateMeeting: () => void
	updateTag: () => void
	updatePeopleTag: () => void
}

export const NokiaContext = createContext<NokiaContextType | null>(null)

export const NokiaContextProvider = (props) => {
	// Это всё надо завернуть в fetch-и, чтобы загружать только сильно потом по useLayoutEffect
	// Наверно, лучше отказаться от контекста, в пользу запроса конкретных данных на странице, бекенд это позволяет теперь, а раньше требовалось из-за связи данных прямо на фронте
	const [richMeeting] = useApi<NewRichMeetingType>(API_ROUTE.nokiaRichMeeting)
	const isLoadingRichMeeting = useLoadingState([richMeeting.status])
	const isEmptyRichMeeting = useEmptyDataState(richMeeting.data)

	const [persons] = useApi<NewPersonType>(API_ROUTE.nokiaPerson)
	const isLoadingPersons = useLoadingState([richMeeting.status])
	const isEmptyPersons = useEmptyDataState(richMeeting.data)

	const [tags] = useApi<NewTagType>(API_ROUTE.nokiaTags)
	const isLoadingTags = useLoadingState([richMeeting.status])
	const isEmptyTags = useEmptyDataState(richMeeting.data)

	const [tagGroups] = useApi<NewNokiaTagGroupType>(API_ROUTE.nokiaTagGroup)
	const isLoadingTagGroups = useLoadingState([richMeeting.status])
	const isEmptyTagGroups = useEmptyDataState(richMeeting.data)
	return (
		<NokiaContext.Provider
			value={{
				fetchData: () => {},
				richMeeting: richMeeting.data,
				persons: persons.data,
				tags: tags.data,
				tagGroups: tagGroups.data,

				links: [],
				meeting: [],
				peopleTag: [],
				hashPeople: [],
				hashMeeting: [],
				hashLink: [],
				hashTag: [],
				hashPeopleTag: [],
				updateLinks: () => {},
				updatePeople: () => {},
				updateMeeting: () => {},
				updateTag: () => {},
				updatePeopleTag: () => {},
			}}
		>
			{props.children}
		</NokiaContext.Provider>
	)
}
