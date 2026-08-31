import { FunctionComponent } from 'preact'
import { AboutBlock } from 'pages/resume/components/block-renderer/types'

import { BlockRenderer } from 'pages/resume/components/block-renderer/BlockRenderer'

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
