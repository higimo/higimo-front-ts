import { ProjectFullInfoType, ProjectTagType, ProjectType, TagNameType, VendorType } from "../types"
import { filterType } from "../components/project/project-tag-gallery/filter-type"

import { useEffect, useMemo, useState } from "preact/hooks"
import { useRoute } from "preact-iso"

import sendRequest from "../utils/send-request"


const mapingProjectToProjectFullInfo = (vendors: VendorType[], tags: ProjectTagType[], tagNames: TagNameType[]) => {
	return (projectItem: ProjectType): ProjectFullInfoType => {
		const vendorData: VendorType = vendors.find(vendor => vendor.id == projectItem.vendor)
		const vendorCode = vendorData ? vendorData.code : ''

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

export const useProject = () => {
	const [projects, setProjects] = useState<ProjectType[]>([])
	const [vendors, setVendors] = useState<VendorType[]>([])
	const [tags, setTags] = useState<ProjectTagType[]>([])
	const [tagNames, setTagNames] = useState<TagNameType[]>([])

	useEffect(() => {
		(async () => {
			setProjects(await sendRequest('/api/v1/project/project'))
			setVendors(await sendRequest('/api/v1/project/vendor'))
			setTags(await sendRequest('/api/v1/project/tag/tag'))
			setTagNames(await sendRequest('/api/v1/project/tag/name'))
		})()
	}, [])

	let projectsList: ProjectFullInfoType[] = useMemo(
		() => projects
			.map(mapingProjectToProjectFullInfo(vendors, tags, tagNames)),
		[ ...projects, ...vendors, ...tags, ...tagNames ]
	)

	const { query } = useRoute()
	if (query[filterType.FILTER_TAG]) {
		projectsList = projectsList.filter(projectItem => projectItem.tags.includes(query.filterTag))
	}
	if (query[filterType.FILTER_SIZE]) {
		projectsList = projectsList.filter(projectItem => projectItem.cover_size == query.filterSize)
	}

	const uniqTags: ProjectFullInfoType['tags'] = tagNames.map(tagName => tagName.title)

	return { projectsList, uniqTags }
}