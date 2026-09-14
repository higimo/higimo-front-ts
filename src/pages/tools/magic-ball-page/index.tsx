import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { MagicBall } from 'components/tool/magic-ball'
import { TextContainer } from 'components/ui/text-container'

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
