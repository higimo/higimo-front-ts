import { FunctionComponent } from 'preact'
import { NokiaPersonSimpleType, NokiaPersonType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaPersonFormContainer } from 'components/nokia/form/nokia-person-form-container'
import { PersonApiService } from 'components/nokia/form/person-api'

import { API_ROUTE } from 'dic/api-route'

const DEFAULT_PERSON_ID = '-1'

interface PersonFormContainerProps {
  personApi?: PersonApiService
}
export const NokiaPersonFormController: FunctionComponent<PersonFormContainerProps> = ({
	personApi = new PersonApiService()
}) => {
	const { params: { personId = DEFAULT_PERSON_ID } } = useRoute()

	const [singlePerson] = useApi<NokiaPersonType>(API_ROUTE.nokiaPersonSingle({ id: personId }))
	const isLoadingSinglePerson = useLoadingState([singlePerson.status])
	const isEmptySinglePerson = useEmptyDataState(singlePerson.data)

	if (isLoadingSinglePerson) {
		return <Loading />
	}

	const isEditMode = personId !== DEFAULT_PERSON_ID

	const currentPerson = singlePerson.data
	const initialData: NokiaPersonSimpleType | undefined = !isEmptySinglePerson && isEditMode ? {
		id:          currentPerson.id,
		name:        currentPerson.name,
		alias:       currentPerson.alias,
		nick:        currentPerson.nick,
		description: currentPerson.description,
	} : undefined

	return (
		<NokiaPersonFormContainer
			personApi={personApi}
			initialData={initialData}
			isEditMode={isEditMode}
		/>
	)
}
