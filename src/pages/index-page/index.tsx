import { FunctionComponent } from "preact"

import { AboutInvite } from "components/intro/about-invite"
import { BlogInvite } from "components/intro/blog-invite"
import { ContactList } from "components/intro/contact-list"
import { LastUpdates } from "components/intro/last-updates"
import { LogismSingle } from "components/intro/logism-single"
import { LookedThis } from "components/intro/looked-this"
import { MainIntro } from "components/intro/main-intro"
import { ProjectListShort } from "components/intro/project-list-short"
import { ShareKnowledge } from "components/intro/share-knowledge"
import { ToolsIntro } from "components/intro/tools-intro"
import { TravelInvite } from "components/intro/travel-invite"
import { FunnyIntro } from "components/intro/funny-invite"

export const IndexPage: FunctionComponent = () => {
	// document.title = 'higimo — программист на Java Script'
	document.title = 'Менеджер продукта — higimo'

	return [
		<MainIntro />,
		<LastUpdates />,
		<ProjectListShort />,
		<ContactList />,
		// <OnlyAdmin><RomaSchool /></OnlyAdmin>,
		<ShareKnowledge />,
		<BlogInvite />,
		<TravelInvite />,
		<ToolsIntro />,
		<AboutInvite />,
		<FunnyIntro />,
		<LookedThis />,
		<LogismSingle />,
		// <OnlyAdmin><DonatIntro /></OnlyAdmin>,
		// <OnlyAdmin><NokiaInto /></OnlyAdmin>,
	]
}
