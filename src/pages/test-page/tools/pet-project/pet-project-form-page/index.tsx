import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { PetProjectForm } from 'components/tool/pet-project-form'

import '../../pet-project.css'

export const PetProjectFormPage: FunctionComponent = () => {
	document.title = 'пэт-проекта'

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Редактирование пэт-проекта</h1>
			</TextContainer>
			<PetProjectForm />
		</div>
	)
}
