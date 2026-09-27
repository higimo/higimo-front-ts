import { FunctionComponent } from 'preact'
import { KeyOf, ValueOf } from 'utils.type'
import { UpdateNewsType } from 'api-types/last-update.types'

import { IntroHeader } from 'components/intro/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { TileElement } from 'components/ui/tile-element'
import { TilesGallery } from 'components/ui/tiles-gallery'

import { getDate } from 'utils/date/get-date'
import { getText } from 'components/intro/last-updates/getText'

import higimo from 'components/intro/last-updates/img/higimo.png'
import rak from 'components/intro/last-updates/img/rak.png'
import screen from 'components/intro/last-updates/img/screen.png'
import tech from 'components/intro/last-updates/img/tech.png'
import tg from 'components/intro/last-updates/img/tg.svg'

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

type LastUpdatesPropsType = {
	newsList: UpdateNewsType[]
}

export const LastUpdates: FunctionComponent<LastUpdatesPropsType> = ({
	newsList,
}) => {
	return (
		<PrecentationContainer className="last-updates__container">
			<TextContainer>
				<IntroHeader>Недавно опубликовал</IntroHeader>
			</TextContainer>

			{/* TODO: [MIDDLE] пока не могу заменить аналогично другим интро, нужно переверстать заново */}
			<TilesGallery
				className="last-updates"
				title="Недавно опубликовал"
				left={newsList.map(item => (
					<TileElementCon key={item.id} {...item} />
				))}
			/>
		</PrecentationContainer>
	)
}
