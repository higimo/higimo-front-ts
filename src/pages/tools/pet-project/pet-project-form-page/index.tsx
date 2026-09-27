import { EmptyObject } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PetProjectType } from 'api-types/petproject.types'

import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'

import { Loading } from 'components/ui/loading/Loading'
import { NotFoundData } from 'components/ui/not-found-data/NotFoundData'
import { PetProjectForm } from 'components/tool/pet-project-form'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../pet-project.css'

const DEFAULT_ID = '-1'

export const PetProjectFormPage: FunctionComponent = () => {
	usePageTitle('пэт-проекта')

	const { params: { projectId = DEFAULT_ID } } = useRoute()
	const[ probbiSingle ] = useApi<PetProjectType | EmptyObject>(API_ROUTE.probbiSingle({ projectId }))
	const isLoading = useLoadingState([probbiSingle.status])
	const isEmpty = useEmptyDataState(probbiSingle.data)

	if (isLoading) {
		return <Loading />
	}
	if (isEmpty && projectId !== DEFAULT_ID) {
		return <NotFoundData />
	}

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Редактирование пэт-проекта</h1>
			</TextContainer>

			<PetProjectForm
				{...probbiSingle.data}
			/>
		</div>
	)
}
