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
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../pet-project.css'

export const PetProjectFormPage: FunctionComponent = () => {
	const { params: { projectId = DEFAULT_ID } } = useRoute()

	const[ probbiSingle ] = useApi<Partial<PetProjectType>>(API_ROUTE.probbiSingle({ projectId }))

	return (
		<Layout title="Пэт-проекта" className="pet-project">
			<TextContainer>
				<h1>Редактирование и создание пэт-проекта</h1>
			</TextContainer>

			<LoadSuspense data={probbiSingle}>
				<EmptyData data={probbiSingle} skipEmpty>
					{/* TODO: [LIGHT] здесь правильное обновление формы на создание и редактирование */}
					<PetProjectForm
						key={probbiSingle.data.id ?? DEFAULT_ID}
						initialData={probbiSingle.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
