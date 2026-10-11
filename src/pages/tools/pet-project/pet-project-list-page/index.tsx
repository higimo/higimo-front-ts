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
import { PetProjectList } from 'components/tool/pet-project/pet-project-list'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import '../pet-project.css'

type PetProjectDataType = {
	gradients: GradientDicType[]
	textProjects: PetProjectType[]
}

export const PetProjectListPage: FunctionComponent = () => {
	const [ unsortProjectList ] = useApi<PetProjectType[]>(API_ROUTE.probbi)
	const [ jsonCollection ] = useMultiJsonApi<PetProjectDataType>({
		gradients:    '/json/pet-project/gradient.json',
		textProjects: '/json/pet-project/projects.json',
	})

	const projects = useMemo(() => {
		if (unsortProjectList.status === 'LOADING' || jsonCollection.textProjects.status === 'LOADING') {
			return []
		}
		if (!unsortProjectList.data || !jsonCollection.textProjects.data) {
			return []
		}

		return unsortProjectList.data
			.concat(jsonCollection.textProjects.data)
			.sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data, jsonCollection.gradients.data, jsonCollection.textProjects.data])

	return (
		<Layout title="Пробби" className="pet-project">
			<TextContainer>
				<h1>Пробби</h1>
				<OnlyAdmin>
					<div>
						<a href={ROUTE_LINK.petProjectCreate}>Добавить</a>
					</div>
				</OnlyAdmin>
			</TextContainer>

			<LoadSuspense data={[unsortProjectList, jsonCollection.gradients, jsonCollection.textProjects]}>
				<EmptyData data={[unsortProjectList, jsonCollection.gradients, jsonCollection.textProjects]}>
					<PetProjectList
						petprojects={projects}
						gradients={jsonCollection.gradients.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
