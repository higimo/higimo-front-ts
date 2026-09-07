import { AboutBlock } from 'components/block-renderer/types'
import { FunctionComponent } from 'preact'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'

export const AboutRenderer: FunctionComponent<AboutBlock> = ({ title, paragraphs }) => (
	<div className="about">
		<div className="about__header">{title}</div>
		<div className="about__description">
			{paragraphs.map((para, idx) => (
				<BlockRenderer key={idx} block={para} />
			))}
		</div>
	</div>
)
