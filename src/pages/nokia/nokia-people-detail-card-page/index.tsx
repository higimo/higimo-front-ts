import { FunctionComponent } from 'preact'
import { NokiaPersonFullType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleDetailCardItem } from 'components/nokia/nokia-people-detail-card-item'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

export const NokiaPeopleDetailCardPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	const { params: { personId = '-1'}} = useRoute()

	const [personSingle] = useApi<NokiaPersonFullType>(API_ROUTE.nokiaPersonSingle({ id: parseInt(personId, 10) }))
	const isLoadingPersonSingle = useLoadingState([personSingle.status])
	const isEmptyPersonSingle = useEmptyDataState(personSingle.data)

	if (isLoadingPersonSingle) {
		return <Loading />
	}
	if (isEmptyPersonSingle) {
		return <NotFoundPage />
	}

	return (
		<div className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Профиль</h1>

				<NokiaPeopleDetailCardItem person={personSingle.data} />
			</div>
		</div>
	)
}
