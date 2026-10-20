import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { PetProjectForm } from 'components/tool/pet-project/pet-project-form'
import { TextContainer } from 'components/ui/text-container'

import { ifTitle } from 'utils/if-title'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../pet-project.css'

export const PetProjectFormPage: FunctionComponent = () => {
	const { params: { projectId = DEFAULT_ID } } = useRoute()

	const[ probbiItem ] = useApi<PetProjectType>(API_ROUTE.probbiSingle({ projectId }))

	const title = ifTitle(projectId, 'Создание пэт-проекта', 'Редактирование пэт-проекта')

	return (
		<Layout title={`${title} | Пэт-проект`} className="pet-project">
			<TextContainer>
				<h1>{title}</h1>
			</TextContainer>

			<LoadSuspense data={probbiItem}>
				<EmptyData data={probbiItem} skipEmpty>
					<PetProjectForm
						key={probbiItem.data?.id ?? DEFAULT_ID}
						initialData={probbiItem.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
