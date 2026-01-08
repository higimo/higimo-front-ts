import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { PetProject } from 'components/tool/pet-project'

import '../../pet-project.css'

export const PetProjectPage: FunctionComponent = () => {
	usePageTitle('Пробби')

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
			</TextContainer>
			<PetProject />
		</div>
	)
}
