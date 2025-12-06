import { FunctionComponent } from 'preact'
import { ProjectType, VendorType } from 'types'

import useApi from 'hook/use-api'
import { useMemo } from 'preact/hooks'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { TextContainer } from 'components/ui/text-container'
import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'
import { ProjectTag } from 'components/project/project-tag'
import { filterType } from 'components/project/project-tag-gallery/filter-type'
import { ProjectList } from 'components/project/project-list'
import { ProjectMore } from 'components/project/project-more/ProjectMore'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const ProjectListShort: FunctionComponent = () => {
	const [ highProjectList ] = useApi<ProjectType>('/api/v1/project/project', {
		filter: { cover_size: 'high'},
		limit: 6
	})
	const [ projectIds ] = useApi<number>(API_ROUTE.projectIds)
	const [ vendorList ] = useApi<VendorType>(API_ROUTE.projectVendor)
	const isLoading = useLoadingState([highProjectList.status, projectIds.status, vendorList.status])
	const isHighProjectListEmpty = useEmptyDataState(highProjectList.data)
	const isProjectIdsEmpty = useEmptyDataState(projectIds.data)
	const isVendorListEmpty = useEmptyDataState(vendorList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isHighProjectListEmpty || isProjectIdsEmpty || isVendorListEmpty) {
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
