import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { BlogItem } from 'components/blog/blog-item'

import './style.css'

// TODO: [FEATURE] Круто писать большие посты прямо на фасад, а короткие заметки рядом в подразделе /note
// Получается, завести избранные из телеги и показывать их на фасад

type LastUpdatesPropsType = {
	newsList: UpdateNewsType[] | null
}

export const BlogList: FunctionComponent<LastUpdatesPropsType> = ({
	newsList,
}) => newsList && (
	<div className="last-updates__gallery">
		{newsList.map(item => (
			<BlogItem key={item.id} {...item} />
		))}
	</div>
)
