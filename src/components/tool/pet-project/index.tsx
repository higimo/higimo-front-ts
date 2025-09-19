import { PetProjectType } from 'types'

import { useMemo } from 'preact/hooks'
import useApi, { API_STATUS } from 'hook/use-api'

import { petProjectGradient } from './gradient-dic'
import { textProjects } from './text-project'

import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'

import './style.css'
import { API_ROUTE } from 'dic/api-route'

// petProjectGradient[Math.floor(Math.random() * gradient.length) | 1]
const gradients = petProjectGradient
	.concat(petProjectGradient.slice(0), petProjectGradient.slice(0))
	.sort(() => 0.5 - Math.random())

const getDescription = (str) => (str || '').replace(/(https:\/\/[\S]+)/g, '<a href="$1">Ссылка</a>').substring(0, 320)

export const PetProject = () => {
	const [ unsortProjectList ] = useApi<PetProjectType>(API_ROUTE.probbi)
			
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(unsortProjectList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === unsortProjectList.status && !unsortProjectList.data.length) {
		return <NotFoundData />
	}

	const projects = useMemo(() => {
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
