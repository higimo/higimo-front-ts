import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { AboutInvite } from 'components/intro/about-invite'
import { BlogInvite } from 'components/intro/blog-invite'
import { ContactList } from 'components/intro/contact-list'
import { FunnyIntro } from 'components/intro/funny-invite'
import { LastUpdates } from 'components/intro/last-updates'
import { LogismSingle } from 'components/intro/logism-single'
import { LookedThis } from 'components/intro/looked-this'
import { MainIntro } from 'components/intro/main-intro'
import { ProjectListShort } from 'components/intro/project-list-short'
import { ShareKnowledge } from 'components/intro/share-knowledge'
import { ToolsIntro } from 'components/intro/tools-intro'
import { TravelInvite } from 'components/intro/travel-invite'

// TODO: Круто писать большие посты прямо на фасад, а короткие заметки рядом в подразделе /note
// TODO: Можно писать, что ищу проекты, просто посылать нахуй не интересное
// TODO: Получается, завести избранные из телеги и показывать их на фасад

export const IndexPage: FunctionComponent = () => {
	usePageTitle('Менеджер продукта — higimo') // higimo — программист на Java Script

	return [
		<MainIntro />,
		<LastUpdates />,
		<ProjectListShort />,
		<ContactList />,
		<ShareKnowledge />,
		<BlogInvite />,
		<TravelInvite />,
		<ToolsIntro />,
		<AboutInvite />,
		<FunnyIntro />,
		<LookedThis />,
		<LogismSingle />,
		// <OnlyAdmin><DonatIntro /></OnlyAdmin>,
	]
}
