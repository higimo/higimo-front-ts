import { FunctionComponent } from 'preact'
import { YoutubeType } from 'api-types/youtube.types'

import './style.css'

export const YouTubeElement: FunctionComponent<YoutubeType> = ({ code, name }) => (
	<div className="youtube">
		<a href={`https://youtu.be/${code}`} className="youtube__link">
			<img
				src={`https://img.youtube.com/vi/${code}/maxresdefault.jpg`}
				alt={name}
				title={name}
				className="youtube__img"
				loading="lazy"
			/>
			<div className="youtube__name">{name}</div>
		</a>
	</div>
)
