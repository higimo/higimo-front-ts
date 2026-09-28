import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { ThingsVelo } from 'components/data/things/things-velo'

export const ThingsVeloPage: FunctionComponent = () => (
	<Layout title="Велосипед">
		<TextContainer>
			<ThingsVelo />
		</TextContainer>
	</Layout>
)
