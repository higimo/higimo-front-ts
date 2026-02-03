import { FunctionComponent } from "preact"
import { NewNokiaMicroPersonType, NewPersonType } from "types"

import { useEmptyDataState } from "hook/use-empty-data-state"
import { useLoadingState } from "hook/use-loading-state"
import { useRoute } from "preact-iso"
import useApi from "hook/use-api"

import { Loading } from "components/ui/loading"
import { NokiaPersonFormContainer } from "components/nokia/form/nokia-person-form-container"
import { NotFoundData } from "components/ui/not-found-data"
import { PersonApiService } from "components/nokia/form/person-api"

import { API_ROUTE } from "dic/api-route"

const DEFAULT_PRESON_ID = '-1'

interface PersonFormContainerProps {
  personApi?: PersonApiService
}
export const NokiaPersonFormController: FunctionComponent<PersonFormContainerProps> = ({
	personApi = new PersonApiService()
}) => {
	const { params: { personId = DEFAULT_PRESON_ID } } = useRoute()

	const [singlePerson] = useApi<NewPersonType>(API_ROUTE.nokiaPersonSingle({ id: personId }))
	const isLoadingSinglePerson = useLoadingState([singlePerson.status])
	const isEmptySinglePerson = useEmptyDataState(singlePerson.data)

	if (isLoadingSinglePerson) {
		return <Loading />
	}

	const isEditMode = personId !== DEFAULT_PRESON_ID

	const currentSingle = singlePerson.data as unknown as NewPersonType
	const initialData: NewNokiaMicroPersonType | undefined = !isEmptySinglePerson && isEditMode ? {
		id: currentSingle.id,
		name: currentSingle.name,
		alias: currentSingle.alias,
		nick: currentSingle.nick,
		description: currentSingle.description,
	} : undefined

	return (
		<NokiaPersonFormContainer
			personApi={personApi}
			initialData={initialData}
			isEditMode={isEditMode}
		/>
	)
}
