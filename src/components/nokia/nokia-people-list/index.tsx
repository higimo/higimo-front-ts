import { FunctionComponent } from 'preact'
import { NokiaPersonType, NokiaTagType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { PersonCard } from 'components/nokia/person-card'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

const filterPersons = (person: NokiaPersonType, filter: NokiaTagType['id'] | null) =>
	person.tags.find(tag => tag.id === filter)

type NokiaPeopleListPropsType = {
	filter: NokiaTagType['id'] | null
	updateFilter: (tag: NokiaTagType["id"]) => void
}
export const NokiaPeopleList: FunctionComponent<NokiaPeopleListPropsType> = (props) => {
	// TODO: [LIGHT] перенести в page
	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaPerson)
	const isLoadingPersons = useLoadingState([persons.status])
	const isEmptyPersons = useEmptyDataState(persons.data)

	if (isLoadingPersons) {
		return <Loading />
	}
	if (isEmptyPersons) {
		return <NotFoundPage />
	}

	const filtredPerson = props.filter ? persons.data.filter(person => filterPersons(person, props.filter)) : persons.data

	return (
		<div className="content">
			<div className="nokia-people-list">
				{filtredPerson.map(person => (
					<PersonCard person={person} />
				))}
			</div>
		</div>
	)
}
