import { PetProjectType } from 'api-types/petproject.types'
import { FunctionComponent } from 'preact'

import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import { useMemo } from 'preact/hooks'

import { PetProject } from 'components/tool/pet-project'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

import { textProjects } from 'components/tool/pet-project/text-project'
import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import 'pages/test-page/tools/pet-project.css'

export const PetProjectPage: FunctionComponent = () => {
	usePageTitle('Пробби')

	const [ unsortProjectList ] = useApi<PetProjectType[]>(API_ROUTE.probbi)
	const isLoading = useLoadingState([unsortProjectList.status])
	const isListEmpty = useEmptyDataState(unsortProjectList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	const projects = useMemo(() => {
		return unsortProjectList.data
			.concat(textProjects)
			.sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data])

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
				<div>
					<a href={ROUTE_LINKS.petProjectCreate}>Добавить</a>
				</div>
			</TextContainer>
			<PetProject petprojects={projects} />
		</div>
	)
}
