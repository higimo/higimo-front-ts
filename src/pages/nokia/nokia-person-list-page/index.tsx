import { FunctionComponent } from 'preact'
import { NokiaPersonType, NokiaTagGroupType, NokiaTagType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { useState } from 'preact/hooks'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPersonList } from 'components/nokia/nokia-person-list'
import { NokiaTagList } from 'components/nokia/nokia-tag-list'
import { TextContainer } from 'components/ui/text-container/TextContainer'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import '../nokia-style.css'

const filterPersons = (person: NokiaPersonType, filter: NokiaTagType['id'] | null) =>
	person.tags.find(tag => tag.id === filter)

export const NokiaPersonListPage: FunctionComponent = () => {
	const [ tagList ] = useApi<NokiaTagType[]>(API_ROUTE.nokiaTags)
	const [ tagGroupList ] = useApi<NokiaTagGroupType[]>(API_ROUTE.nokiaTagGroup)
	const [ personList ] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaPerson)

	const [filter, setFilter] = useState<NokiaTagType['id'] | null>(null)
	const updateFilter = (tag: NokiaTagType['id']) => () => setFilter(filter === tag ? null : tag)

	const filtredPerson = (
		!personList.data ? [] :
			filter
			? personList.data.filter(person => filterPersons(person, filter))
			: personList.data
	)

	return (
		<Layout title="Нокиа сервис" className="nokia">
			<NokiaMenu />

			<TextContainer>
				<h1>Все люди</h1>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={[tagGroupList, tagList]}>
					<EmptyData data={[tagGroupList, tagList]}>
						<NokiaTagList
							tagGroupList={tagGroupList.data}
							tagList={tagList.data}
							filter={filter}
							updateFilter={updateFilter}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				<LoadSuspense data={personList}>
					<EmptyData data={personList}>
						<NokiaPersonList
							personList={filtredPerson}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
