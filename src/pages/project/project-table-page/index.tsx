import { FunctionComponent } from 'preact'
import { PortfolioGroupedTagType, PortfolioProjectTableFullType, PortfolioProjectTableType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo } from 'preact/hooks'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { PortfolioProjectTable } from 'components/project/portfolio-project-table'
import { ProjectTagCategory } from 'components/project/project-tag-category'
import { TextContainer } from 'components/ui/text-container'

import { calculateProjectTableList } from 'utils/project/calculate-project-table-list'
import { sortableProjectByVendor } from 'utils/project/sortable-project-by-vendor'

import { API_ROUTE } from 'dic/API_ROUTE'

// Мы потихоньку ведём классификационную работу над советами.
// Помимо формальных характеристик («диаграмма», «таблица», «сайт», «предмет»)
// советы помечаются идеями, которые в них излагаются. Таким образом, каждый совет
// получит ссылки на похожие на него советы.
export const ProjectTablePage: FunctionComponent = () => {
	const [projects] = useApi<PortfolioProjectTableType[]>(API_ROUTE.projectProjectTable)
	const [tagList] = useApi<PortfolioGroupedTagType[]>(API_ROUTE.projectGroupedTags)

	const {
		selectedTagTitles,
		isSelected,
		toggleTag,
	} = useSmartTags({
		categories: tagList.data,
	})

	const tableProjects: PortfolioProjectTableFullType[] = useMemo(() => {
		if (projects.status !== 'LOADED') {
			return []
		}
		return projects.data
			.filter(project => {
				for (const selectedTag of Array.from(selectedTagTitles)) {
					for (const itemTag of project.tags) {
						if (itemTag.title === selectedTag) {
							return true
						}
					}
				}
				return false
			})
			.map(calculateProjectTableList)
			.sort(sortableProjectByVendor)
	}, [projects, selectedTagTitles])

	return (
		<Layout title="Сделал">
			<div className="project-index-page">
				<TextContainer>
					<h1>Таблица сделанного</h1>
				</TextContainer>

				<LoadSuspense data={[projects, tagList]}>
					<EmptyData data={[projects, tagList]}>
						<ProjectTagCategory
							groupedTags={tagList.data}
							isSelected={isSelected}
							toggleTag={toggleTag}
						/>

						<PortfolioProjectTable tableProjects={tableProjects} />
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
