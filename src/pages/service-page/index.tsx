import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { AboutInvite } from 'components/intro/about-invite'
import { FunnyIntro } from 'components/intro/funny-invite'
import { ShareKnowledge } from 'components/intro/share-knowledge'
import { ToolsIntro } from 'components/intro/tools-intro'


export const ServicePage: FunctionComponent = () => {
	usePageTitle('Сервисы') // higimo — программист на Java Script

	return [
		<ShareKnowledge />,
		<ToolsIntro />,
		<AboutInvite />,
		<FunnyIntro />,
	]
}
