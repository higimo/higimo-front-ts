import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'types'

import { usePageTitle } from 'hook/use-page-title';

import { useContext, useLayoutEffect, useState } from 'preact/hooks'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleList } from 'components/nokia/nokia-people-list'
import { NokiaTagsGallery } from 'components/nokia/nokia-tags-gallery'

import '../nokia-style.css'
import { NokiaContext } from 'context/nokia'

export const NokiaPeopleListPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	const { fetchData } = useContext(NokiaContext)
	useLayoutEffect(fetchData, [])

	const [filter, setFilter] = useState<NokiaTagType['id']>(null)
	const updateFilter = (tag: NokiaTagType['id']) => setFilter(filter === tag ? null : tag)

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Все люди</h1>
				<NokiaTagsGallery filter={filter} updateFilter={updateFilter} />
				<NokiaPeopleList filter={filter} updateFilter={updateFilter} />
			</div>
		</div>
	)
}
