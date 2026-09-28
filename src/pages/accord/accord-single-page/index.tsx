import { AccordType } from 'api-types/accord.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRandomElements } from 'hook/utils/use-random-elements'
import { useRoute } from 'preact-iso'

import { AccordContent } from 'components/accord/accord-content'
import { AccordSeeAlso } from 'components/accord/accord-see-also'
import { Loading } from 'components/ui/loading/Loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const ALSO_ELEMENTS = 6

// TODO: [FEATURE] добавить страницу добавления и редактирования аккордов
export const AccordSinglePage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()

	const [accords] = useApi<AccordType[]>(API_ROUTE.accord)
	const [songSingle] = useApi<AccordType>(API_ROUTE.accordSingle({ idcode: idcode }))
	const isLoading = useLoadingState([songSingle.status, accords.status])
	const isListEmpty = useEmptyDataState(accords.data)
	const isSongEmpty = useEmptyDataState(songSingle.data)

	// TODO: [BACKEND] пусть бекенд присылает эти данные
	const seeAlsoList = useRandomElements(accords.data, ALSO_ELEMENTS)

	usePageTitle(songSingle.data?.name, 'Песня')

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty || isSongEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="container accord-single-page">
			<AccordContent song={songSingle.data} />
			<div className="backlink">
				<a href={ROUTE_LINKS.accordIndex}>← Назад</a>
			</div>
			<AccordSeeAlso items={seeAlsoList} />
		</div>
	)
}
