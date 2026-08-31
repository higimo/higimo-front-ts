import { FunctionComponent } from 'preact'
import { SkillsBlock } from 'pages/resume/components/block-renderer/types'

export const SkillsRenderer: FunctionComponent<SkillsBlock> = ({ title, items }) => (
	<div className="skill">
		<div className="skill_header">{title}</div>
		<div className="skill_content">{items.join(', ')}</div>
	</div>
)
