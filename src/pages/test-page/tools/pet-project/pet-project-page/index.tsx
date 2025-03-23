import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../../../components/ui/text-container'
import { PetProject } from '../../../../../components/tool/pet-project'

import '../../pet-project.css'

export const PetProjectPage: FunctionComponent = () => {
	document.title = 'Пробби'

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
			</TextContainer>
			<PetProject />
		</div>
	)
}
