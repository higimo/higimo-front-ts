import { FunctionComponent } from 'preact'
import { GradientDicType } from 'components/tool/pet-project/types'
import { PetProjectType } from 'api-types/petproject.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { usePageTitle } from 'hook/browser/use-page-title'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { PetProject } from 'components/tool/pet-project'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../../pet-project.css'

export const PetProjectPage: FunctionComponent = () => {
	usePageTitle('Пробби')

	const [ unsortProjectList ] = useApi<PetProjectType[]>(API_ROUTE.probbi)
	const isLoading = useLoadingState([unsortProjectList.status])
	const isListEmpty = useEmptyDataState(unsortProjectList.data)

	const gradients = useJsonApi<GradientDicType[]>('/json/pet-project/gradient.json')
	const textProjects = useJsonApi<PetProjectType[]>('/json/pet-project/projects.json')

	const projects = useMemo(() => {
		if (isLoading || gradients === null || textProjects === null) {
			return []
		}

		return unsortProjectList.data
			.concat(textProjects)
			.sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data, textProjects])

	if (isLoading || gradients === null || textProjects === null) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}


	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
				<div>
					<a href={ROUTE_LINKS.petProjectCreate}>Добавить</a>
				</div>
			</TextContainer>
			<PetProject
				petprojects={projects}
				gradients={gradients}
			/>
		</div>
	)
}
