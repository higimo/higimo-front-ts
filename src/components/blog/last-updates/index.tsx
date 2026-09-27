import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { BlogItem } from 'components/blog/blog-item'
import { IntroHeader } from 'components/intro/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

// TODO: [FEATURE] Круто писать большие посты прямо на фасад, а короткие заметки рядом в подразделе /note
// Получается, завести избранные из телеги и показывать их на фасад

type LastUpdatesPropsType = {
	newsList: UpdateNewsType[]
}

export const LastUpdates: FunctionComponent<LastUpdatesPropsType> = ({
	newsList,
}) => {
	return (
		<PrecentationContainer className="last-updates">
			<TextContainer>
				<IntroHeader>Недавно опубликовал</IntroHeader>
			</TextContainer>

			<div className="last-updates__gallery">
				{newsList.map(item => (
					<BlogItem key={item.id} {...item} />
				))}
			</div>
		</PrecentationContainer>
	)
}
