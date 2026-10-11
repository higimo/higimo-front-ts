import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'

export const ThingsVeloPage: FunctionComponent = () => (
	<Layout title="Велосипед">
		<TextContainer>
			<h1>Велосипед</h1>
			<p>Forward NEXT 27,5 3.0 disc, 27.5</p>
		</TextContainer>
	</Layout>
)
