import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'

import cs from 'classnames'

import './style.css'

type LogismGalleryPropsType = {
	logisms: LogismType[]
}
export const LogismGallery: FunctionComponent<LogismGalleryPropsType> = ({ logisms }) => (
	<div className="gallery-logism">
		{logisms.map(({ text }) => (
			<div
				className={cs('gallery-logism__item', {
					'gallery-logism__item--long': text.length > 100
				})}
				dangerouslySetInnerHTML={{ __html: text.replace(/(https?:\/\/.*)/g, '<a href="$1">источник</a>') }}
			/>
		))}
	</div>
)
