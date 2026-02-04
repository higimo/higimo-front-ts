import { FunctionComponent } from 'preact'
import { NewTagType } from 'types'

import { usePageTitle } from 'hook/use-page-title'
import { useState } from 'preact/hooks'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleList } from 'components/nokia/nokia-people-list'
import { NokiaTagsGallery } from 'components/nokia/nokia-tags-gallery'

import '../../../components/nokia/nokia-style.css'

export const NokiaPeopleListPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	const [filter, setFilter] = useState<NewTagType['id']>(null)
	const updateFilter = (tag: NewTagType['id']) => setFilter(filter === tag ? null : tag)

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
