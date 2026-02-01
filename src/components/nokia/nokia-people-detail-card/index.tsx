import { useContext, useLayoutEffect } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { NokiaPeopleDetailCardItem } from 'components/nokia/nokia-people-detail-card-item'

import { NokiaContext, NokiaContextType } from 'context/nokia'

import { NotFoundPage } from 'pages/not-found-page'

import '../nokia-style.css'
import { NewNokiaPersonFullType } from 'types'
import useApi from 'hook/use-api'
import { API_ROUTE } from 'dic/api-route'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { Loading } from 'components/ui/loading'

export const NokiaPeopleDetailCard = () => {
	const { params: { personId = '-1'}} = useRoute()

	const [personSingle] = useApi<NewNokiaPersonFullType>(API_ROUTE.nokiaPersonSingle({ id: parseInt(personId, 10).toString() }))
	const isLoadingPersonSingle = useLoadingState([personSingle.status])
	const isEmptyPersonSingle = useEmptyDataState(personSingle.data)

	if (isLoadingPersonSingle) {
		return <Loading />
	}

	if (isEmptyPersonSingle) {
		return <NotFoundPage />
	}

	const currentPerson = personSingle.data as unknown as NewNokiaPersonFullType

	return (
		<div className="content">
			<NokiaPeopleDetailCardItem person={currentPerson} />
		</div>
	)
}
