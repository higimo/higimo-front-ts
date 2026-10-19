import { AccordType, AccordRealTagType } from 'api-types/accord.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useFilterByTags } from 'hook/tags/use-filter-by-tags'
import { useMemo } from 'preact/hooks'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { AccordList } from 'components/accord/accord-list'
import { AccordTagList } from 'components/accord/accord-tag-list'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { median } from 'utils/math/median'

import { ACCORD_TAG_CATEGORY } from 'dic/accord/ACCORD_TAG_CATEGORY'
import { ACCORD_TAG_MAPPING } from 'dic/accord/ACCORD_TAG_MAPPING'
import { ACCORD_TOTAL_TAGS } from 'dic/accord/ACCORD_TOTAL_TAGS'
import { API_ROUTE } from 'dic/route/API_ROUTE'
import { NEWS_ACCORD_LENGTH } from 'config/ACCORD'

import '../accord-style.css'

export const AccordListPage: FunctionComponent = () => {
	const [ accordList ] = useApi<AccordType[]>(API_ROUTE.accord)

	// TODO: [BACKEND] это должен бекенд присылать
	const accordRichList: AccordRealTagType[] = useMemo(() => {
		if (!accordList.data) {
			return []
		}
		const firstTags = (accordList.data || [])
			.map((item) => {
				const tags: { id: number, title: string }[] = []
				for (const [id, key, ids] of ACCORD_TAG_MAPPING) {
					if (ids.has(item.id)) {
						tags.push({ id, title: ACCORD_TOTAL_TAGS[key] || '' })
					}
				}
				return { ...item, tags }
			})
			.sort((a, b) => a.name.localeCompare(b.name))

		const length = accordList.data.length
		const minimumViewed = median(accordList.data.map(i => i.view))

		return firstTags.map(item => {
			if (item.tags.length === 0) {
				item.tags.push({ id: 11, title: ACCORD_TOTAL_TAGS.nolist || ''})
			}
			if (item.tags.length >= 3) {
				item.tags.push({ id: 12, title: ACCORD_TOTAL_TAGS.manylist || ''})
			}
			if (item.id > length - NEWS_ACCORD_LENGTH) {
				item.tags.push({ id: 13, title: ACCORD_TOTAL_TAGS.new || ''})
			}
			if (item.view > minimumViewed) {
				item.tags.push({ id: 14, title: ACCORD_TOTAL_TAGS.pop || ''})
			}
			return item
		})
	}, [accordList.data])

	const {
		selectedTagTitles,
		toggleTag,
		isSelected,
	} = useSmartTags({
		// @ts-ignore
		categories: ACCORD_TAG_CATEGORY,
		mode: 'single',
	})

	const accordListFiltred = useFilterByTags(accordRichList, selectedTagTitles)

	return (
		<Layout title="Аккорды" className="accord-identity-page">
			<TextContainer>
				<h1>Аккорды</h1>
				<AccordTagList
					toggleTag={toggleTag}
					isSelected={isSelected}
				/>
				<div className="accord-list">
					<LoadSuspense data={accordList}>
						<EmptyData data={accordList}>
							<AccordList
								accordList={accordListFiltred}
							/>
						</EmptyData>
					</LoadSuspense>
				</div>
			</TextContainer>
		</Layout>
	)
}
