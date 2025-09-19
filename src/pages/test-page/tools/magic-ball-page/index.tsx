import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { MagicBall } from 'components/tool/magic-ball'

export const MagicBallPage: FunctionComponent = () => {
	document.title = 'ToolPage'

	return (
		<div className="tool-index-page">
			<TextContainer>
				<h1>Волшебный шар</h1>
				<p>
					Наводишь — показывает ответ
				</p>
			</TextContainer>
			<MagicBall />
		</div>
	)
}
