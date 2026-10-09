import { AccordType, AccordRealTagType } from 'api-types/accord.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useFilterByTags } from 'hook/tags/use-filter-by-tags'
import { useMemo } from 'preact/hooks'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { AccordElement } from 'components/accord/accord-element'
import { AccordTagGallery } from 'components/accord/accord-baidge-gallery'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { median } from 'utils/math/median'

import { ACCORD_TAG_CATEGORY } from 'data/accord/tags-category'
import { API_ROUTE } from 'dic/API_ROUTE'
import { ACCORD_TAGS_MAPPING } from 'data/accord/tags-mapping'
import { NEWS_ACCORD_LENGTH } from 'config/ACCORD'
import { totalTags } from 'dic/accord/tags'

import './style.css'


export const AccordIndexPage: FunctionComponent = () => {
	const [ accordList ] = useApi<AccordType[]>(API_ROUTE.accord)

	// TODO: [BACKEND] это должен бекенд присылать
	const accordRichList: AccordRealTagType[] = useMemo(() => {
		if (!accordList.data) {
			return []
		}
		const firstTags = (accordList.data || [])
			.map((item) => {
				const tags: { id: number, title: string }[] = []
				for (const [id, key, ids] of ACCORD_TAGS_MAPPING) {
					if (ids.has(item.id)) {
						tags.push({ id, title: totalTags[key] || '' })
					}
				}
				return { ...item, tags }
			})
			.sort((a, b) => a.name.localeCompare(b.name))

		const length = accordList.data.length
		const minimumViewed = median(accordList.data.map(i => i.view))

		return firstTags.map(item => {
			if (item.tags.length === 0) {
				item.tags.push({ id: 11, title: totalTags.nolist || ''})
			}
			if (item.tags.length >= 3) {
				item.tags.push({ id: 12, title: totalTags.manylist || ''})
			}
			if (item.id > length - NEWS_ACCORD_LENGTH) {
				item.tags.push({ id: 13, title: totalTags.new || ''})
			}
			if (item.view > minimumViewed) {
				item.tags.push({ id: 14, title: totalTags.pop || ''})
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
		<Layout title="Аккорды">
			<TextContainer className="accord">
				<h1>Аккорды</h1>
				<AccordTagGallery
					toggleTag={toggleTag}
					isSelected={isSelected}
				/>
				<div>

				<LoadSuspense data={accordList}>
					<EmptyData data={accordList}>
						{accordListFiltred.map(item => (
							<AccordElement key={item.id} {...item} />
						))}
					</EmptyData>
				</LoadSuspense>
				</div>
			</TextContainer>
		</Layout>
	)
}
