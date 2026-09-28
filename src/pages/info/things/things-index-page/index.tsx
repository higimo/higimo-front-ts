import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { ThingsIndex } from 'components/data/things/things-index'
import { Layout } from 'components/ui/layout/Layout'

export const ThingsIndexPage: FunctionComponent = () => (
	<Layout title="Мои вещи">
		<TextContainer>
			<h1>Мои вещи</h1>
			<ThingsIndex />
		</TextContainer>
	</Layout>
)
