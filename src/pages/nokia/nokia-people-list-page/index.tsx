import { FunctionComponent } from 'preact'
import { NokiaPersonType, NokiaTagGroupType, NokiaTagType } from 'api-types/nokia.types'

import { useApi } from 'hook/fetch/use-api'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useState } from 'preact/hooks'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleList } from 'components/nokia/nokia-people-list'
import { NokiaTagsGallery } from 'components/nokia/nokia-tags-gallery'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

export const NokiaPeopleListPage: FunctionComponent = () => {
	usePageTitle('')

	// TODO: [HARD] как проверять, что есть теги без группы?
	// Надо, нврн, загружать группы, но чтобы внутри уже были теги, зачем эта ебля?
	const [tags] = useApi<NokiaTagType[]>(API_ROUTE.nokiaTags)
	const [tagGroups] = useApi<NokiaTagGroupType[]>(API_ROUTE.nokiaTagGroup)
	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaPerson)

	// TODO: [USE_TAGS] useTags удобные теги, кажись, может их в портфолио и списке людей нокии использовать?
	const [filter, setFilter] = useState<NokiaTagType['id'] | null>(null)
	const updateFilter = (tag: NokiaTagType['id']) => () => setFilter(filter === tag ? null : tag)

	return (
		<Layout title="Нокиа сервис">
			<div className="nokia">
				<NokiaMenu />

				<div className="nokia__content">
					<h1>Все люди</h1>

					<LoadSuspense data={[tagGroups, tags]}>
						<EmptyData data={[tagGroups, tags]}>
							<NokiaTagsGallery
								tagGroups={tagGroups.data}
								tags={tags.data}
								filter={filter}
								updateFilter={updateFilter}
							/>
						</EmptyData>
					</LoadSuspense>

					<LoadSuspense data={persons}>
						<EmptyData data={persons}>
							<NokiaPeopleList
								persons={persons.data}
								filter={filter}
							/>
						</EmptyData>
					</LoadSuspense>
				</div>
			</div>
		</Layout>
	)
}
