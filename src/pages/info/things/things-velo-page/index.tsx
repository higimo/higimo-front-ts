import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { ThingsVelo } from 'components/data/things/things-velo/ThingsVelo'

export const ThingsVeloPage: FunctionComponent = () => {
	usePageTitle('Велосипед')

	return (
		<TextContainer>
			<ThingsVelo />
		</TextContainer>
	)
}
