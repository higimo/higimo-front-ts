import { ProjectFullInfoType, ProjectTagType, ProjectType, TagNameType, VendorType } from '../types'
import { filterType } from 'components/project/project-tag-gallery/filter-type'

import { useEffect, useMemo, useState } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import sendRequest from '../utils/send-request'


const mapingProjectToProjectFullInfo = (vendors: VendorType[], tags: ProjectTagType[], tagNames: TagNameType[]) => {
	return (projectItem: ProjectType): ProjectFullInfoType => {
		const vendorData: VendorType = vendors.find(vendor => vendor.id == projectItem.vendor)
		const vendorCode = vendorData ? vendorData.code : 'UNDEFINED'
		if (!vendorData) {
			console.log('vendorData undefined', vendorData, projectItem, vendors)
		}

		const curTagNames: string[] = tags.filter(tagLink => tagLink.projectId == projectItem.id)
			.map(tagLink => {
				const tagName = tagNames.find(tagName => tagLink.tagId == tagName.id)
				return tagName ? tagName.title : ''
			})
			.filter(Boolean)

		return {
			...projectItem,
			vendorCode,
			tags: curTagNames,
		}
	}
}

type DownloadDataType = {
	projects: ProjectType[],
	vendors: VendorType[],
	tags: ProjectTagType[],
	tagNames: TagNameType[],
}
export const useProject = () => {
	const [downloadData, setDownloadData] = useState<DownloadDataType>({
		projects: [],
		vendors: [],
		tags: [],
		tagNames: [],
	})

	useEffect(() => {
		(async () => {
			try {
				const [projects, vendors, tags, tagNames] = await Promise.all([
					sendRequest('/api/v1/project/project'),
					sendRequest('/api/v1/project/vendor'),
					sendRequest('/api/v1/project/tag/tag'),
					sendRequest('/api/v1/project/tag/name')
				])

				setDownloadData({
					projects,
					vendors,
					tags,
					tagNames,
				})
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		})()
	}, [])

	let projectsList: ProjectFullInfoType[] = useMemo(
		() => downloadData.projects
			.map(mapingProjectToProjectFullInfo(downloadData.vendors, downloadData.tags, downloadData.tagNames)),
		[ ...downloadData.projects, ...downloadData.vendors, ...downloadData.tags, ...downloadData.tagNames ]
	)

	const { query } = useRoute()
	if (query[filterType.FILTER_TAG]) {
		projectsList = projectsList.filter(projectItem => projectItem.tags.includes(query.filterTag))
	}
	if (query[filterType.FILTER_SIZE]) {
		projectsList = projectsList.filter(projectItem => projectItem.cover_size == query.filterSize)
	}

	const uniqTags: ProjectFullInfoType['tags'] = downloadData.tagNames.map(tagName => tagName.title)

	return { projectsList, uniqTags }
}