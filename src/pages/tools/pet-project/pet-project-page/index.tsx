import { FunctionComponent } from 'preact'
import { GradientDicType } from 'api-types/json-api.types'
import { PetProjectType } from 'api-types/petproject.types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo } from 'preact/hooks'
import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
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
	const [ unsortProjectList ] = useApi<PetProjectType[]>(API_ROUTE.probbi)
	const [ jsonData ] = useMultiJsonApi<PetProjectDataType>({
		gradients:    '/json/pet-project/gradient.json',
		textProjects: '/json/pet-project/projects.json',
	})

	const projects = useMemo(() => {
		if (unsortProjectList.status === 'LOADING' || jsonData.textProjects.status === 'LOADING') {
			return []
		}
		if (!unsortProjectList.data || !jsonData.textProjects.data) {
			return []
		}

		return unsortProjectList.data
			.concat(jsonData.textProjects.data)
			.sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data, jsonData.gradients.data, jsonData.textProjects.data])

	return (
		<Layout title="Пробби" className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
				<OnlyAdmin>
					<div>
						<a href={ROUTE_LINKS.petProjectCreate}>Добавить</a>
					</div>
				</OnlyAdmin>
			</TextContainer>

			<LoadSuspense data={[unsortProjectList, jsonData.gradients, jsonData.textProjects]}>
				<EmptyData data={[unsortProjectList, jsonData.gradients, jsonData.textProjects]}>
					<PetProject
						petprojects={projects}
						gradients={jsonData.gradients.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
