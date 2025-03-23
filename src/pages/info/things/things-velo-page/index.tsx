import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../../components/ui/text-container'
import { ThingsVelo } from '../../../../components/data/things/things-velo/ThingsVelo'

export const ThingsVeloPage: FunctionComponent = () => {
    document.title = 'Велосипед'

    return (
        <TextContainer>
            <ThingsVelo />
        </TextContainer>
    )
}
