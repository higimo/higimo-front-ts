import { PetProjectType } from 'api-types/petproject.types'

import { useMemo } from 'preact/hooks'
import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { petProjectGradient } from 'components/tool/pet-project/gradient-dic'
import { textProjects } from 'components/tool/pet-project/text-project'

import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

// petProjectGradient[Math.floor(Math.random() * gradient.length) | 1]
const gradients = petProjectGradient
	.concat(petProjectGradient.slice(0), petProjectGradient.slice(0))
	.sort(() => 0.5 - Math.random())

// TODO: [LIGHT] fix type
const getDescription = (str) => (str || '').replace(/(https:\/\/[\S]+)/g, '<a href="$1">Ссылка</a>').substring(0, 320)

export const PetProject = () => {
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
		// TODO: [LIGHT] array concat
		return [
			...unsortProjectList.data,
			...textProjects,
		].sort((a, b) => a.priority - b.priority)
	}, [unsortProjectList.data])

	return (
		<div className="pet-project-gallery">
			{projects.map(({ name, description = '' }, index) => (
				<div
					className="pet-project__item"
					style={{
						background: gradients[index].g,
						'--color': gradients[index].c,
					}}
				>
					<div className="pet-project__title">{name}</div>
					<div
						className="pet-project__description"
						dangerouslySetInnerHTML={{ __html: getDescription(description)}}
					/>
				</div>
			))}
		</div>
	)
}
