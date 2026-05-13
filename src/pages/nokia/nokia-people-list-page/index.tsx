import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'api-types/nokia.types'

import { usePageTitle } from 'hook/use-page-title'
import { useState } from 'preact/hooks'

import { NokiaMenu } from 'components/nokia/nokia-menu'
import { NokiaPeopleList } from 'components/nokia/nokia-people-list'
import { NokiaTagsGallery } from 'components/nokia/nokia-tags-gallery'

import '../../../components/nokia/nokia-style.css'

export const NokiaPeopleListPage: FunctionComponent = () => {
	usePageTitle('Нокиа сервис')

	// TODO: [USE_TAGS] useTags удобные теги, кажись, может их в портфолио и списке людей нокии использовать?
	const [filter, setFilter] = useState<NokiaTagType['id'] | null>(null)
	const updateFilter = (tag: NokiaTagType['id']) => setFilter(filter === tag ? null : tag)

	return (
		<div className="nokia">
			<NokiaMenu />
			<div className="nokia__content">
				<h1>Все люди</h1>
				<NokiaTagsGallery
					filter={filter}
					updateFilter={updateFilter}
				/>
				<NokiaPeopleList
					filter={filter}
					updateFilter={updateFilter}
				/>
			</div>
		</div>
	)
}
