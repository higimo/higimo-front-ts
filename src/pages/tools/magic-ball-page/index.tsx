import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { MagicBall } from 'components/tool/magic-ball'
import { TextContainer } from 'components/ui/text-container'

export const MagicBallPage: FunctionComponent = () => (
	<Layout title="Волшебный шар" className="tool-index-page">
		<TextContainer>
			<h1>Волшебный шар</h1>
			<p>
				Наводишь — показывает ответ
			</p>
		</TextContainer>
		<MagicBall />
	</Layout>
)
