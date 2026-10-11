import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { Layout } from 'components/ui/layout/Layout'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const ThingsIndexPage: FunctionComponent = () => (
	<Layout title="Мои вещи">
		<TextContainer>
			<h1>Мои вещи</h1>
			<ul>
				<li><a href={ROUTE_LINK.thingsNotebook}>Ноутбук</a></li>
				<li><a href={ROUTE_LINK.thingsVelo}>Велосипед</a></li>
				<li><a href={ROUTE_LINK.libraryIndex}>Библиотека</a></li>
			</ul>
		</TextContainer>
	</Layout>
)
