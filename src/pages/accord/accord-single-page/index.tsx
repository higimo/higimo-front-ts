import { AccordType } from 'api-types/accord.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useRandomElements } from 'hook/utils/use-random-elements'
import { useRoute } from 'preact-iso'

import { AccordContent } from 'components/accord/accord-content'
import { AccordSeeAlso } from 'components/accord/accord-see-also'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

const ALSO_ELEMENTS = 6

// TODO: [FEATURE] добавить страницу добавления и редактирования аккордов
export const AccordSinglePage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID } } = useRoute()

	const [accordList] = useApi<AccordType[]>(API_ROUTE.accord)
	const [accordItem] = useApi<AccordType>(API_ROUTE.accordSingle({ idcode: idcode }))

	// TODO: [BACKEND] пусть бекенд присылает эти данные
	const seeAlsoList = useRandomElements(accordList.data || [], ALSO_ELEMENTS)

	return (
		<Layout title={accordItem.data?.name || 'Песня'} className="container accord-single-page">
			<LoadSuspense data={accordItem}>
				<EmptyData data={accordItem}>
					<AccordContent song={accordItem.data} />
				</EmptyData>
			</LoadSuspense>

			<div className="backlink">
				<a href={ROUTE_LINKS.accordIndex}>← Назад</a>
			</div>

			<AccordSeeAlso items={seeAlsoList} />
		</Layout>
	)
}
