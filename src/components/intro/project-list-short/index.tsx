import { FunctionComponent } from 'preact'
import { ProjectType, VendorType } from '../../../types'
import { filterType } from '../../project/project-tag-gallery/filter-type'

import useApi, { API_STATUS } from '../../../hook/use-api'
import { useMemo } from 'preact/hooks'

import { TextContainer } from '../../ui/text-container'
import { ProjectTag } from '../../project/project-tag'
import { NotFoundData } from '../../ui/not-found-data'
import { Loading } from '../../accord/accord-single'

import { ANCHOR_LINKS } from '../../../dic/ANCHOR_LINKS'
import { API_ROUTE } from '../../../api-route'

import './style.css'
import { ProjectList } from '../../project/project-list'
import { ProjectMore } from '../../project/project-more/ProjectMore'

export const ProjectListShort: FunctionComponent = () => {
	const [ highProjectList ] = useApi<ProjectType>('/api/v1/project/project', {
		filter: { cover_size: 'high'},
		limit: 6
	})
	const [ projectIds ] = useApi<number>(API_ROUTE.projectIds)
	const [ vendorList ] = useApi<VendorType>(API_ROUTE.projectVendor)
		
	if (([API_STATUS.INIT, API_STATUS.LOADING].includes(highProjectList.status)) ||
		([API_STATUS.INIT, API_STATUS.LOADING].includes(projectIds.status)) ||
		([API_STATUS.INIT, API_STATUS.LOADING].includes(vendorList.status))) {
		return <Loading />
	}

	if ((API_STATUS.LOADED === highProjectList.status && !highProjectList.data.length) ||
		(API_STATUS.LOADED === projectIds.status && !projectIds.data.length) ||
		(API_STATUS.LOADED === vendorList.status && !vendorList.data.length)) {
		return <NotFoundData />
	}

	const projectsList = useMemo(() => {
		return highProjectList.data
			.slice(0, 5)
			.map(item => {
				const vendorData: Partial<VendorType> = (vendorList.data || []).find(vendor => vendor.id == item.vendor)
				const vendorCode = vendorData.code || ''
				return {
					...item,
					vendorCode,
				}
			})
	}, [ ...highProjectList.data, ...vendorList.data ])

	return (
		<div className="project-list project-list--short" id={ANCHOR_LINKS.done}>
			<TextContainer>
				<h2 className="project-list__header">Сделал</h2>
			</TextContainer>
			<TextContainer className="project-list__filter">
				<ProjectTag filterName={filterType.FILTER_TAG}>грандиозный</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>SuperJob</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Рамблер</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Студия Лебедева</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Эртоп</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>Пересечения</ProjectTag>
				<ProjectTag filterName={filterType.FILTER_TAG}>хомяк</ProjectTag>
			</TextContainer>
			<ProjectList projectsList={projectsList} />
			<ProjectMore count={projectIds.data.length} />
		</div>
	)
}
