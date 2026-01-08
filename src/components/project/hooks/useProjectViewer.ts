import { useEffect, useState } from 'preact/hooks'
import { CreditsType, PortfolioProjectType, ProjectTagType, ProjectType, TagNameType, VendorType, WorkerType } from 'types'
import sendRequest from 'utils/send-request'

// TODO useProject спорит с этим
export const useProjectViewer = (vendorProp: string, projectProp: string): [PortfolioProjectType | null, boolean] => {
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