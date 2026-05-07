import { PortfolioTag, PortfolioProjectTableType } from 'api-types/portfolio.types'

import { PROJECT_FILTER_DIC } from 'components/project/project-tag-category/dic'

import { useEmptyDataState } from './use-empty-data-state'
import { useLoadingState } from './use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from './use-api'

import { API_ROUTE } from 'dic/api-route'
import { useMemo } from 'preact/hooks'

// TODO: подумай над неймингом, потому что есть PortfolioProjectTableType в API
export type PortfolioProjectTableSmartType = {
	id: PortfolioProjectTableType['id']
    vendor: PortfolioProjectTableType['vendor']['code']
    name: PortfolioProjectTableType['name']
    code: PortfolioProjectTableType['code']
    date: PortfolioProjectTableType['date']
    image: PortfolioProjectTableType['image']
    cover_size: PortfolioProjectTableType['cover_size']
	tags: string[]
	[k: string]: any
// 	PortfolioProjectType = PortfolioProjectApiType & {
//     tags: PortfolioTag[];
//     credits?: PortfolioCreditsType[];
//     description?: string;
//     text?: string;
// } & {
//     isLink: false;
// }
}

const extractWithDOMParser = (htmlString: string, selector: string) => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(htmlString, 'text/html')

	const elements = doc.querySelectorAll(selector)
	const outerHTML = Array.from(elements).map(el => el.outerHTML)
	const textContent = Array.from(elements).map(el => el.textContent)
	const innerHTML = Array.from(elements).map(el => el.innerHTML)

	elements.forEach(i => i.remove())

	return {
		outerHTML,
		textContent,
		innerHTML,
		resultHtml: doc.body.innerHTML
	}
}

type UseProjectType = () => {
    isLoading: boolean
    isEmpty: boolean
	tableProjects: PortfolioProjectTableSmartType[],
    tagList: PortfolioTag[]
}

/**
 * Вернёт список проектов
 */
export const useTableProject: UseProjectType = () => {
	const { query } = useRoute()

	const [projects] = useApi<PortfolioProjectTableType[]>(API_ROUTE.projectProjectTable)
	const [tagList] = useApi<PortfolioTag[]>(API_ROUTE.projectGroupedTags)

	const isLoading = useLoadingState([projects.status, tagList.status])
	const isProjectListEmpty = useEmptyDataState(projects.data)
	const isTagListEmpty = useEmptyDataState(tagList.data)

	const tableProjects: PortfolioProjectTableSmartType[] = useMemo(() => {
		return projects.data.map(project => {
			const isLinkDefine = project.isLink && 'link' in project ? !!(project.link as string)?.length : false
			const checkLink = project.isLink && !isLinkDefine ? 'fail' : 'pass'
			const checkExistTags = project.tags.length ? 'pass' : 'fail'
			const checkCover = ['jpg', 'png'].includes(project.image) ? 'pass' : 'fail'


			const taskRaw = extractWithDOMParser(project.text, '.task')
			const announceTextRaw = extractWithDOMParser(taskRaw.resultHtml, '.announce__text, .container')
			const picture = extractWithDOMParser(announceTextRaw.resultHtml, '.announce__picture')
			const picNote = extractWithDOMParser(picture.resultHtml, '.announce__picture-note')
			const realImgRaw = extractWithDOMParser(project.text, 'img')
			const realVideoRaw = extractWithDOMParser(project.text, 'video')
			const siteLinkRaw = extractWithDOMParser(picNote.resultHtml, '.site-link')
			const unitOfSenseRaw = extractWithDOMParser(siteLinkRaw.resultHtml, '.unit-of-sense')
			const metricRaw = extractWithDOMParser(unitOfSenseRaw.resultHtml, '.result-metric')
			const cardTableRaw = extractWithDOMParser(metricRaw.resultHtml, '.announce__card-table, .announce__pic-table, .announce__info-table')
			const factoidGalleryRaw = extractWithDOMParser(cardTableRaw.resultHtml, '.factoid-gallery')
			const resultTextRaw = extractWithDOMParser(factoidGalleryRaw.resultHtml, '.container-panel--30, .container-panel--50, h2, img, video, .horizontal-item__note, .container-panel--70, script, .sector-sum--half, .sector-sum')

			// TODO: [BACKEND] КЦЗНН странно сверстан

			console.log(resultTextRaw.resultHtml)

			const task = taskRaw.textContent
			const announceTextHtml = announceTextRaw.innerHTML
			const announceText = (announceTextRaw.textContent || []).join('').substring(0, 300)
			const countParagraph = ((announceTextHtml.join('') || '').match(/<p>/g) || []).length

			const countRealImg = realImgRaw.outerHTML.length
			const countPicture = taskRaw.innerHTML.length
			const countVideo = realVideoRaw.innerHTML.length
			const countPictureNote = picNote.innerHTML.length
			const countCardTable = cardTableRaw.innerHTML.length
			const countFactoidGallery = factoidGalleryRaw.innerHTML.length

			const checkTask = (task || []).join('').length > 4 ? 'pass' : 'fail'

			const checkLinkRaw = siteLinkRaw.innerHTML.length ? 'pass' : 'no'
			const checkUnitOfSenseRaw = unitOfSenseRaw.innerHTML.length ? 'pass' : 'fail'
			const checkMetricRaw = metricRaw.innerHTML.length ? 'pass' : 'fail'


			return {
				id:           project.id,
				vendor:       project.vendor.code,
				name:         project.name,
				code:         project.code,
				date:         project.date,
				image:        project.image,
				cover_size:   project.cover_size,
				tags:         project.tags.map(i => i.title),
				credits:      project.credits.map(i => `${i.role} ${i.worker.full_name}`),
				description:  project.description,
				// @ts-ignore
				isHide:       project.hide === 'true' ? 'HIDE' : 'SHOW',

				task,
				announceText,

				countParagraph,
				countRealImg,
				countVideo,
				countPicture,
				countPictureNote,
				countCardTable,
				countFactoidGallery,

				checkLinkRaw,
				checkUnitOfSenseRaw,
				checkMetricRaw,
				checkLink,
				checkExistTags,
				checkCover,
				checkTask,
			}
		})
		.sort((a, b) => {
			return a.vendor.localeCompare(b.vendor) || b.date.localeCompare(a.date)
		})
	}, [projects])

	// TODO: [MEDIUM] useTag применить
	let projectList = projects.data
	if (query[PROJECT_FILTER_DIC.FILTER_TAG]) {
		projectList = projects.data.filter(projectItem => {
			return projectItem.tags.find(tag => tag.title === query[PROJECT_FILTER_DIC.FILTER_TAG])
		})
	}

	return {
		isLoading: isLoading,
		isEmpty: isProjectListEmpty || isTagListEmpty,
		tableProjects,
		tagList: tagList.data,
	}
}
