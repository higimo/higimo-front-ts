import { FunctionComponent } from 'preact'
import { UpdateNewsType } from './types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { getDate } from '../../../utils/get-date'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element'
import { Loading } from '../../accord/accord-single'
import { NotFoundData } from '../../ui/not-found-data'

import tg     from './img/tg.svg'
import tech   from './img/tech.png'
import higimo from './img/higimo.png'
import screen from './img/screen.png'
import rak    from './img/rak.png'

import { API_ROUTE } from '../../../api-route'

import './style.css'

const imgMapping = {
	'Техники → навыки → счастье': [tg, tech],
	'Хигимо': [tg, higimo],
	'Скриншотил': [tg, screen],
	'Раковарня 2.0': [tg, rak],
} as const

const TileElementCon = props => (
	<TileElement
		className="post-element"
		href={props.link}
		name={(
			<div className="post-element__meta">
				<span className="post-element__favicons">
					{(imgMapping[props.source] || []).map(src => (
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
	const [ newsList ] = useApi<UpdateNewsType>(API_ROUTE.updateNews, { limit: 12 })
	
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(newsList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === newsList.status && !newsList.data.length) {
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
