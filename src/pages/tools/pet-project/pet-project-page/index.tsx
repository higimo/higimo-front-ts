import { FunctionComponent } from 'preact'
import { GradientDicType } from 'api-types/json-api.types'
import { PetProjectType } from 'api-types/petproject.types'

import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { OnlyAdmin } from 'components/util/only-admin'
import { PetProject } from 'components/tool/pet-project'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../pet-project.css'

type PetProjectDataType = {
	gradients: GradientDicType[]
	textProjects: PetProjectType[]
}

export const PetProjectPage: FunctionComponent = () => {
	usePageTitle('Пробби')

	const [ unsortProjectList ] = useApi<PetProjectType[]>(API_ROUTE.probbi)
	const [ data ] = useMultiJsonApi<PetProjectDataType>({
		gradients: '/json/pet-project/gradient.json',
		textProjects: '/json/pet-project/projects.json',
	})

	const isLoading = useLoadingState([unsortProjectList.status, data.status])
	const isError = [unsortProjectList.status, data.status].some(i => i === 'ERROR')

	const projects = useMemo(() => {
		if (isLoading) {
			return []
		}

		return unsortProjectList.data
			.concat(data.data.textProjects!)
			.sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data, data.data.textProjects])

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
				<OnlyAdmin>
					<div>
						<a href={ROUTE_LINKS.petProjectCreate}>Добавить</a>
					</div>
				</OnlyAdmin>
			</TextContainer>

			{(isError
				? (<NotFoundData />)
				: (
					<PetProject
						petprojects={projects}
						gradients={data.data.gradients!}
					/>
				)
			)}
		</div>
	)
}
