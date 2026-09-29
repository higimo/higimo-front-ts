import { EmptyObject } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { PetProjectForm } from 'components/tool/pet-project-form'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../pet-project.css'

const DEFAULT_ID = '-1'

export const PetProjectFormPage: FunctionComponent = () => {
	const { params: { projectId = DEFAULT_ID } } = useRoute()

	const[ probbiSingle ] = useApi<PetProjectType | EmptyObject>(API_ROUTE.probbiSingle({ projectId }))

	return (
		<Layout title="Пэт-проекта" className="pet-project">
			<TextContainer>
				<h1>Редактирование пэт-проекта</h1>
			</TextContainer>

			<LoadSuspense data={probbiSingle}>
				<EmptyData data={probbiSingle}>
					<PetProjectForm
						{...probbiSingle.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
