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
	const [ data ] = useMultiJsonApi<PetProjectDataType>({
		gradients:    '/json/pet-project/gradient.json',
		textProjects: '/json/pet-project/projects.json',
	})

	const projects = useMemo(() => {
		if (data.status === 'LOADING' || unsortProjectList.status === 'LOADING') {
			return []
		}

		return unsortProjectList.data
			.concat(data.data.textProjects!)
			.sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data, data.data.textProjects])

	return (
		<Layout title="Пробби">
			<div className="pet-project">
				<TextContainer>
					<h1>Пробби</h1>
					<OnlyAdmin>
						<div>
							<a href={ROUTE_LINKS.petProjectCreate}>Добавить</a>
						</div>
					</OnlyAdmin>
				</TextContainer>

				<LoadSuspense data={[unsortProjectList, data]}>
					<EmptyData data={[unsortProjectList, data]}>
						<PetProject
							petprojects={projects}
							gradients={data.data.gradients!}
						/>
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
