import { MeetingType, NokiaTagType, PeopleMeetingType, PeopleTag, PeopleType, RichMeetingType } from 'types'

import { useCallback, useState } from 'preact/hooks'

import sendRequest from 'utils/send-request'

import { makeHashTable } from 'utils/make-hash-table'

import { createContext } from 'preact'

import { API_ROUTE } from 'dic/api-route'

export type NokiaContextType = {
	fetchData: () => void
	richMeeting: RichMeetingType[]
	people: PeopleType[]
	meeting: MeetingType[]
	links: PeopleMeetingType[]
	tag: NokiaTagType[]
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
	const [ links, setLinks ] = useState<PeopleMeetingType[]>([])
	const [ people, setPeople ] = useState<PeopleType[]>([])
	const [ meeting, setMeeting ] = useState<MeetingType[]>([])
	const [ tag, setTag ] = useState<NokiaTagType[]>([])
	const [ peopleTag, setPeopleTag ] = useState<PeopleTag[]>([])
	const [ richMeeting, setRichMeeting ] = useState<RichMeetingType[]>([])

	const fetchRichMeeting = () => sendRequest(API_ROUTE.nokiaRichMeeting, {values: {limit: 0}})
		.then((list: RichMeetingType[]) => setRichMeeting(list))

	const updateLinks = () => sendRequest(API_ROUTE.nokiaPeopleMeeting, { values: { limit: 0/*10*/ } })
		.then((list: PeopleMeetingType[]) => setLinks(list))
	const updatePeople = () => sendRequest(API_ROUTE.nokiaPeople)
		.then((list: PeopleType[]) => setPeople(list))
	const updateMeeting = () => sendRequest(API_ROUTE.nokiaMeeting, { values: { limit: 0/*10*/ } })
		.then((list: MeetingType[]) => setMeeting(list))
	const updateTag = () => sendRequest(API_ROUTE.nokiaTags)
		.then((list: NokiaTagType[]) => setTag(list))
	const updatePeopleTag = () => sendRequest(API_ROUTE.nokiaPeopleTag)
		.then((list: PeopleTag[]) => setPeopleTag(list))

	const [isLoaded, setIsLoaded] = useState<boolean>(false)

	const fetchData = useCallback(() => {
		if (!isLoaded) {
			fetchRichMeeting()
			updateLinks()
			updatePeople()
			updateMeeting()
			updateTag()
			updatePeopleTag()
		}
		setIsLoaded(true)
	}, [
		isLoaded,
		setIsLoaded,
		updateLinks,
		updatePeople,
		updateMeeting,
		updateTag,
		updatePeopleTag,
	])

	const hashPeople = makeHashTable(people, 'id')
	const hashMeeting = makeHashTable(meeting, 'id')
	const hashTag = makeHashTable(tag, 'id')
	let hashLink = {}
	links.forEach(link => {
		hashLink[link.meeting_id] = [...(hashLink[link.meeting_id] || []), link.people_id]
	})
	let hashPeopleTag = {}
	peopleTag.forEach(item => {
		hashPeopleTag[item.tagId] = [...(hashPeopleTag[item.tagId] || []), item.peopleId]
	})
	return (
		<NokiaContext.Provider
			value={{
				fetchData,
				richMeeting,
				links,
				people,
				meeting,
				tag,
				peopleTag,
				hashPeople,
				hashMeeting,
				hashLink,
				hashTag,
				hashPeopleTag,
				updateLinks,
				updatePeople,
				updateMeeting,
				updateTag,
				updatePeopleTag,
			}}
		>
			{props.children}
		</NokiaContext.Provider>
	)
}
