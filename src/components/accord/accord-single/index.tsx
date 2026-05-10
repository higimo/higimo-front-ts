import { FunctionComponent } from 'preact'
import { AccordType } from 'api-types/accord.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useRandomElements } from 'hook/use-random-elements'
import useApi from 'hook/use-api'

import { AccordContent } from 'components/accord/accord-content'
import { Loading } from 'components/ui/loading'
import { SeeAlsoSection } from 'components/accord/see-also-section'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const ALSO_ELEMENTS = 6

type AccordSinglePropsType = {
	idcode: string
}

// TODO: [FEATURE] добавить страницу добавления и редактирования аккордов
export const AccordSingle: FunctionComponent<AccordSinglePropsType> = ({ idcode }) => {
	const [accords] = useApi<AccordType[]>(API_ROUTE.accord)
	const [songSingle] = useApi<AccordType>(API_ROUTE.accordSingle({ idcode }))
	const isLoading = useLoadingState([songSingle.status, accords.status])
	const isListEmpty = useEmptyDataState(accords.data)
	const isSongEmpty = useEmptyDataState(songSingle.data)
	// TODO: [BACKEND] пусть бекенд присылает эти данные

	const seeAlsoList = useRandomElements(accords.data, ALSO_ELEMENTS)

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
			<SeeAlsoSection items={seeAlsoList} />
		</div>
	)
}
