import { FunctionComponent } from 'preact'
import { NokiaPersonType, NokiaTagGroupType, NokiaTagType } from 'api-types/nokia.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useState } from 'preact/hooks'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleList } from 'components/nokia/nokia-people-list'
import { NokiaTagsGallery } from 'components/nokia/nokia-tags-gallery'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../nokia-style.css'

export const NokiaPeopleListPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	// TODO: [HARD] как проверять, что есть теги без группы?
	// Надо, нврн, загружать группы, но чтобы внутри уже были теги, зачем эта ебля?
	const [tags] = useApi<NokiaTagType[]>(API_ROUTE.nokiaTags)
	const [tagGroups] = useApi<NokiaTagGroupType[]>(API_ROUTE.nokiaTagGroup)
	const [persons] = useApi<NokiaPersonType[]>(API_ROUTE.nokiaPerson)

	const isLoading = useLoadingState([tags.status, tagGroups.status, persons.status])
	const isEmptyTags = useEmptyDataState(tags.data)
	const isEmptyTagGroups = useEmptyDataState(tagGroups.data)
	const isEmptyPersons = useEmptyDataState(persons.data)

	// TODO: [USE_TAGS] useTags удобные теги, кажись, может их в портфолио и списке людей нокии использовать?
	const [filter, setFilter] = useState<NokiaTagType['id'] | null>(null)
	const updateFilter = (tag: NokiaTagType['id']) => () => setFilter(filter === tag ? null : tag)

	if (isLoading) {
		return <Loading />
	}
	if (isEmptyTags || isEmptyTagGroups || isEmptyPersons) {
		return <NotFoundPage />
	}

	return (
		<div className="nokia">
			<NokiaMenu />

			<div className="nokia__content">
				<h1>Все люди</h1>

				<NokiaTagsGallery
					tagGroups={tagGroups.data}
					tags={tags.data}
					filter={filter}
					updateFilter={updateFilter}
				/>

				<NokiaPeopleList
					persons={persons.data}
					filter={filter}
				/>
			</div>
		</div>
	)
}
