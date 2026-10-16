import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'

import cs from 'classnames'

import './style.css'

type LogismListPropsType = {
	logismList: LogismType[] | null
}

export const LogismList: FunctionComponent<LogismListPropsType> = ({
	logismList
}) => logismList && (
	<div className="gallery-logism">
		{logismList.map((logism) => (
			<div
				key={logism.id}
				className={cs('gallery-logism__item', {
					'gallery-logism__item--long': logism.text.length > 100
				})}
				// TODO: [LIGHT] linkify?
				dangerouslySetInnerHTML={{ __html: logism.text.replace(/(https?:\/\/.*)/g, '<a href="$1">источник</a>') }}
			/>
		))}
	</div>
)
