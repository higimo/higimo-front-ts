import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'

import cs from 'classnames'

import './style.css'

type LogismGalleryPropsType = {
	logismList: LogismType[] | null
}
export const LogismGallery: FunctionComponent<LogismGalleryPropsType> = ({
	logismList
}) => logismList && (
	<div className="gallery-logism">
		{logismList.map(({ text }) => (
			<div
				className={cs('gallery-logism__item', {
					'gallery-logism__item--long': text.length > 100
				})}
				dangerouslySetInnerHTML={{ __html: text.replace(/(https?:\/\/.*)/g, '<a href="$1">источник</a>') }}
			/>
		))}
	</div>
)
