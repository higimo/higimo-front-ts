import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { MagicBall } from 'components/tool/magic-ball'

export const MagicBallPage: FunctionComponent = () => {
	usePageTitle('ToolPage')

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
