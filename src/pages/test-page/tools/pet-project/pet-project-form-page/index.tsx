import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { PetProjectForm } from 'components/tool/pet-project-form'
import { TextContainer } from 'components/ui/text-container'

import '../../pet-project.css'

export const PetProjectFormPage: FunctionComponent = () => {
	usePageTitle('пэт-проекта')

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Редактирование пэт-проекта</h1>
			</TextContainer>

			<PetProjectForm />
		</div>
	)
}
