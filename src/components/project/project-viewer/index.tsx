import { FunctionComponent } from 'preact'
import { CreditsType, PortfolioProjectType, ProjectTagType, ProjectType, TagNameType, VendorType, WorkerType } from '../../../types'
import { filterType } from '../project-tag-gallery/filter-type'

import { useEffect, useState } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { NotFoundPage } from '../../../pages/not-found-page'

import sendRequest from '../../../utils/send-request'

import { ProjectTag } from '../project-tag'
import { Loading } from '../../accord/accord-single'
import { TextContainer } from '../../ui/text-container'

import './style.css'

const getHumanDate = str => new Date(str || '').toLocaleDateString()

// TODO useProject спорит с этим
const useProjectViewer = (vendorProp: string, projectProp: string): [PortfolioProjectType | null, boolean] => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [curProject, setProject] = useState<PortfolioProjectType | null>(null)

	useEffect(() => {
		(async () => {
			if (!projectProp || !projectProp) {
				return null
			}

			setIsLoading(true)
			const vendors: VendorType[] = await sendRequest(`/api/v1/project/vendor/${vendorProp}`)
			const projects: ProjectType[] = await sendRequest(`/api/v1/project/project/${projectProp}`)
			const credits: CreditsType[] = await sendRequest(`/api/v1/project/credits`)
			const workers: WorkerType[] = await sendRequest(`/api/v1/project/worker`)
			const tagMaping: ProjectTagType[] = await sendRequest(`/api/v1/project/tag/tag`)
			const tagName: TagNameType[] = await sendRequest(`/api/v1/project/tag/name`)
			setIsLoading(false)

			if (!vendors.length || !projects.length || !credits.length || !workers.length) {
				return null
			}

			setProject({
				...projects
					.find(proj => proj.vendor == vendors[0].id && proj.code === projectProp),
				vendor: vendors[0],
				role: credits.filter(titr => {
					return titr.project == projects[0].id
				}).map(titr => {
					return {
						...workers.find(worker => worker.id == titr.worker),
						...titr,
					}
				}),
				tags: tagMaping.filter(tagMap => tagMap.projectId === projects[0].id)
					.map(tagMap => {
						return tagName.find(item => item.id === tagMap.tagId)
					})
			})
		})()
	}, [vendorProp, projectProp])

	return [curProject, isLoading]
}

// TODO: Добавить <WorkerInput projectId={id} />
export const ProjectViewer: FunctionComponent = () => {
	const { params: { vendor, project } } = useRoute()

	const [curProject, isLoading] = useProjectViewer(vendor, project);

	if (isLoading) {
		return <Loading />
	}

	if (!curProject) {
		return <NotFoundPage />
	}

	const { date, name, text = '' } = curProject
	const baseurl = location.pathname
	document.title = name

	return (
		<div className="project-viewer">
			<TextContainer className="project-viewer__date">
				<div className="date">
					{getHumanDate(date)}
				</div>
			</TextContainer>
			<TextContainer>
				<h1>{name}</h1>
			</TextContainer>
			{console.log(text)}
			<div
				className="content"
				dangerouslySetInnerHTML={{
					__html: text.replace(/\.\/asset/g, `/assets/${baseurl}/asset`).replace(/\/\//g, '/')
				}}
			/>
			{!!(curProject.role || []).length && (
				<div className="project-viewer__credits">
					{(curProject.role || []).map(role => (
						<div className="project-viewer__person person">
							<div className="person__name">
								{role.name} {role.family}
								{(!role.name.length && !role.family.length) && role.login}
							</div>
							<div className="person__role">
								{role.role}
							</div>
						</div>
					))}
				</div>
			)}
			{/* TODO TAGS применить мапинг категоризации тегов */}
			{!!(curProject.tags || []).length && (
				<TextContainer className="project-viewer__tags">
					{(curProject.tags || []).map(tag => (
						<ProjectTag filterName={filterType.FILTER_TAG}>
							{tag.title}
						</ProjectTag>
					))}
				</TextContainer>
			)}
		</div>
	)
}
