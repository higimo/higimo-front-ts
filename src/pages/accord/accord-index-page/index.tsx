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
import { liric, scream, korol, funny, rap, old, ussr, lacky, newschool, bard } from 'data/accord/tags-mapping'
import { NEWS_ACCORD_LENGTH } from 'config/ACCORD'
import { totalTags } from 'dic/accord/tags'

import './style.css'

export const AccordIndexPage: FunctionComponent = () => {
	const [ accordUnsortList ] = useApi<AccordType[]>(API_ROUTE.accord)

	// @ts-ignore
	const accordList: AccordRealTagType[] = useMemo(() => {
		const firstTags = accordUnsortList.data.map(item => ({
				...item,
				tags: [ // MAIN
					...(liric.includes(item.id)     ? [{ id: 1, title: totalTags.liric}] : []),
					...(scream.includes(item.id)    ? [{ id: 2, title: totalTags.scream} ] : []),
					...(korol.includes(item.id)     ? [{ id: 3, title: totalTags.korol} ] : []),
					...(funny.includes(item.id)     ? [{ id: 4, title: totalTags.funny} ] : []),
					...(rap.includes(item.id)       ? [{ id: 5, title: totalTags.rap} ] : []),
					...(old.includes(item.id)       ? [{ id: 6, title: totalTags.old} ] : []),
					...(ussr.includes(item.id)      ? [{ id: 7, title: totalTags.ussr} ] : []),
					...(lacky.includes(item.id)     ? [{ id: 8, title: totalTags.lacky} ] : []),
					...(newschool.includes(item.id) ? [{ id: 9, title: totalTags.newschool} ] : []),
					...(bard.includes(item.id)      ? [{ id: 10, title: totalTags.bard} ] : []),
				]
			}))
			.sort((a, b) => a.name.localeCompare(b.name))

		const length = accordUnsortList.data.length
		const minimumViewed = median(accordUnsortList.data.map(i => i.view))

		return firstTags.map(item => {
			if (item.tags.length === 0) {
				item.tags.push({ id: 11, title: totalTags.nolist})
			}
			if (item.tags.length >= 3) {
				item.tags.push({ id: 12, title: totalTags.manylist})
			}
			if (item.id > length - NEWS_ACCORD_LENGTH) {
				item.tags.push({ id: 13, title: totalTags.new})
			}
			if (item.view > minimumViewed) {
				item.tags.push({ id: 14, title: totalTags.pop})
			}
			return item
		})
	}, [accordUnsortList.data])

	const {
		selectedTagTitles,
		toggleTag,
		isSelected,
	} = useSmartTags({
		categories: ACCORD_TAG_CATEGORY,
		mode: 'single',
	})

	const filtredList = useFilterByTags(accordList, selectedTagTitles)

	return (
		<Layout title="Аккорды">
			<TextContainer className="accord">
				<h1>Аккорды</h1>
				<AccordTagGallery
					toggleTag={toggleTag}
					isSelected={isSelected}
				/>
				<div>

				<LoadSuspense data={accordUnsortList}>
					<EmptyData data={accordUnsortList}>
						{filtredList.map(item => (
							<AccordElement key={item.id} {...item} />
						))}
					</EmptyData>
				</LoadSuspense>
				</div>
			</TextContainer>
		</Layout>
	)
}
