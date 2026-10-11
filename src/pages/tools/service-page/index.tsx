import { FunctionComponent } from 'preact'

import { ShelfInvite } from 'components/invite/shelf-invite'
import { FunnyInvite } from 'components/invite/funny-invite'
import { Layout } from 'components/ui/layout/Layout'
import { KnowledgeInvite } from 'components/invite/knowledge-invite'
import { ToolsInvite } from 'components/invite/tools-invite'

export const ServicePage: FunctionComponent = () => (
	<Layout title="Сервисы">
		<KnowledgeInvite />
		<ToolsInvite />
		<ShelfInvite />
		<FunnyInvite />
	</Layout>
)
