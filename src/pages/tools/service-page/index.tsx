import { FunctionComponent } from 'preact'

import { AboutInvite } from 'components/intro/about-invite'
import { FunnyIntro } from 'components/intro/funny-invite'
import { Layout } from 'components/ui/layout/Layout'
import { ShareKnowledge } from 'components/intro/share-knowledge'
import { ToolsIntro } from 'components/intro/tools-intro'

export const ServicePage: FunctionComponent = () => (
	<Layout title="Сервисы">
		<ShareKnowledge />
		<ToolsIntro />
		<AboutInvite />
		<FunnyIntro />
	</Layout>
)
