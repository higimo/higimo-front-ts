import { FunctionComponent } from 'preact'
import { NokiaPersonType, NokiaTagType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { PersonMiniProfile } from 'components/nokia/person-mini-profile'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

import '../nokia-style.css'

const filterPersons = (person, filter) => person.tags.find(tag => tag.id === filter)

type NokiaPeopleListPropsType = {
	filter: NokiaTagType['id']
	updateFilter: (tag: NokiaTagType["id"]) => void
}
export const NokiaPeopleList: FunctionComponent<NokiaPeopleListPropsType> = (props) => {
	const [persons] = useApi<NokiaPersonType>(API_ROUTE.nokiaPerson)
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
		<div>
			<div className="content">
				<div className="nokia-people-list">
					{filtredPerson.map(person => (
						<PersonMiniProfile person={person} />
					))}
				</div>
			</div>
		</div>
	)
}
