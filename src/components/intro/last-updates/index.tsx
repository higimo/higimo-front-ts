import { FunctionComponent } from 'preact'
import { KeyOf, ValueOf } from 'utils.type'
import { UpdateNewsType } from 'api-types/last-update.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import useApi from 'hook/fetch/use-api'

import { IntroHeader } from 'components/intro/intro-header'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { TileElement } from 'components/ui/tile-element'
import { TilesGallery } from 'components/ui/tiles-gallery'

import { getDate } from 'utils/formatter/get-date'
import { getText } from './getText'

import { API_ROUTE } from 'dic/API_ROUTE'

import higimo from './img/higimo.png'
import rak from './img/rak.png'
import screen from './img/screen.png'
import tech from './img/tech.png'
import tg from './img/tg.svg'

import './style.css'

const imgMapping = {
	'Техники → навыки → счастье': [tg, tech],
	'Хигимо': [tg, higimo],
	'Скриншотил': [tg, screen],
	'Раковарня 2.0': [tg, rak],
} as const

const getImage = (source: UpdateNewsType['source']): ValueOf<typeof imgMapping>|null => {
	return source in imgMapping ? imgMapping[(source as KeyOf<typeof imgMapping>)] : null
}

type TileElementConPropsType = UpdateNewsType
// TODO: [FEATURE] Круто писать большие посты прямо на фасад, а короткие заметки рядом в подразделе /note
// Получается, завести избранные из телеги и показывать их на фасад
// TODO: [FEATURE] пока скрытый компонент, надо бы выводить через него избранное, а всё подряд показывать только мне, нпрмр
const TileElementCon: FunctionComponent<TileElementConPropsType> = props => (
	<TileElement
		className="post-element"
		href={props.link}
		name={(
			<div className="post-element__meta">
				<span className="post-element__favicons">
					{(getImage(props.source) || []).map(src => (
						<img className="post-element__favicon-image" src={src} />
					))}
				</span>
				<span className="post-element__meta-name">
					<span className="post-element__meta-name-inner">
						{props.source}
					</span>
				</span>
				<span className="post-element__date">{getDate(props.date)}</span>
			</div>
		)}
		description={getText(props.text)}
	/>
)

// TODO: [MIDDLE] кжтс, не используется, это надо исправить. Вывести на отдельную страницу, получать данные с бекенда
export const LastUpdates: FunctionComponent = () => {
	const [ newsList ] = useApi<UpdateNewsType[]>(API_ROUTE.updateNews, { limit: 12 })
	const isLoading = useLoadingState([newsList.status])
	const isListEmpty = useEmptyDataState(newsList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<PrecentationContainer className="last-updates__container">
			<TextContainer>
				<IntroHeader>Недавно опубликовал</IntroHeader>
			</TextContainer>

			{/* TODO: [MIDDLE] пока не могу заменить аналогично другим интро, нужно переверстать заново */}
			<TilesGallery
				className="last-updates"
				title="Недавно опубликовал"
				left={newsList.data.map(item => (
					<TileElementCon key={item.id} {...item} />
				))}
			/>
		</PrecentationContainer>
	)
}
