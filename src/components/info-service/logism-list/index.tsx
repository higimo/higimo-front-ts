import { FunctionComponent } from 'preact'
import { LogismType } from 'api-types/logism.types'

import { linkify } from 'utils/text/linkify'
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
				dangerouslySetInnerHTML={{ __html: linkify(logism.text) }}
			/>
		))}
	</div>
)
