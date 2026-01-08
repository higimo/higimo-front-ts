import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { ThingsIndex } from 'components/data/things/things-index/ThingsIndex'

export const ThingsIndexPage: FunctionComponent = () => {
	usePageTitle('Мои вещи')

	return (
		<TextContainer>
			<h1>Мои вещи</h1>
			<ThingsIndex />
		</TextContainer>
	)
}
