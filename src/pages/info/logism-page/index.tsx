import { FunctionComponent } from 'preact'
import { Logism } from '../../../components/logism/logism'

export const LogismPage: FunctionComponent = () => {
	document.title = 'Логизмы'

	return <Logism />
}
