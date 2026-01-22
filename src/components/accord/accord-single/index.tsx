import { FunctionComponent } from 'preact'

import { AccordType } from 'types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useRandomElements } from 'hook/use-random-elements'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { SeeAlsoSection } from 'components/accord/see-also-section'
import { AccordContent } from 'components/accord/accord-content'

import { NotFoundPage } from 'pages/not-found-page'

import './style.css'

const ALSO_ELEMENTS = 6

type AccordSinglePropsType = {
	idcode: string
}

export const AccordSingle: FunctionComponent<AccordSinglePropsType> = ({ idcode }) => {
	const [list] = useApi<AccordType>(API_ROUTE.accord)
	const [songSingle] = useApi<AccordType>(API_ROUTE.accordSingle({ idcode }))
	const isLoading = useLoadingState([songSingle.status, list.status])
	const isListEmpty = useEmptyDataState(list.data)
	const isSongEmpty = useEmptyDataState(songSingle.data)
	const seeAlsoList = useRandomElements(list.data, ALSO_ELEMENTS)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty || isSongEmpty) {
		return <NotFoundPage />
	}

	const currentSong = songSingle.data as unknown as AccordType // TODO: fix useApi

	return (
		<div className="container accord-single-page">
			<AccordContent song={currentSong} />
			<div className="backlink">
				<a href={ROUTE_LINKS.accordIndex}>← Назад</a>
			</div>
			<SeeAlsoSection items={seeAlsoList} />
		</div>
	)
}