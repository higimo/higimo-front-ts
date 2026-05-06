import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import getRandomColor from 'utils/get-random-color'
import { copyToClipboard } from 'utils/copy-to-clipboard'

export const ComojiElement: FunctionComponent<ComojiType> = props => (
	<div className="comoji">
		<div
			className="comoji__content"
			style={{
				background: `${getRandomColor()}`,
				backgroundImage: `linear-gradient(to bottom, ${getRandomColor()}, ${getRandomColor()})`
			}}
			onClick={() => {copyToClipboard(props.comoji)}}
		>
			{props.comoji}
		</div>
	</div>
)
