import { NokiaPersonFullType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaPeopleDetailCardItem } from 'components/nokia/nokia-people-detail-card-item'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import 'components/nokia/nokia-style.css'

export const NokiaPeopleDetailCard = () => {
	const { params: { personId = '-1'}} = useRoute()

	const [personSingle] = useApi<NokiaPersonFullType>(API_ROUTE.nokiaPersonSingle({ id: parseInt(personId, 10).toString() }))
	const isLoadingPersonSingle = useLoadingState([personSingle.status])
	const isEmptyPersonSingle = useEmptyDataState(personSingle.data)

	if (isLoadingPersonSingle) {
		return <Loading />
	}
	if (isEmptyPersonSingle) {
		return <NotFoundPage />
	}

	return (
		<div className="content">
			<NokiaPeopleDetailCardItem person={personSingle.data} />
		</div>
	)
}
