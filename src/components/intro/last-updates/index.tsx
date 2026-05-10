import { FunctionComponent } from 'preact'
import { UpdateNewsType } from '../../../api-types/last-update.types'
import { KeyOf, ValueOf } from 'utils.type'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TileElement } from 'components/ui/tile-element'
import { TilesGallery } from 'components/ui/tiles-gallery'

import { getDate } from 'utils/formatter/get-date'

import { API_ROUTE } from 'dic/API_ROUTE'

import higimo from './img/higimo.png'
import rak	from './img/rak.png'
import screen from './img/screen.png'
import tech   from './img/tech.png'
import tg	 from './img/tg.svg'

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
		description={props.text.replace('</p>', '').split('<p>').filter(Boolean).slice(0, 1)[0]}
	/>
)

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
		<TilesGallery
			className="last-updates"
			title="Недавно опубликовал"
			left={newsList.data.map(item => <TileElementCon key={item.id} {...item} />)}
		/>
	)
}
