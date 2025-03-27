import { FunctionComponent } from "preact"

import { AboutInvite } from "../../components/intro/about-invite"
import { BlogInvite } from "../../components/intro/blog-invite"
import { ContactList } from "../../components/intro/contact-list"
import { LastUpdates } from "../../components/intro/last-updates"
import { LogismSingle } from "../../components/intro/logism-single"
import { LookedThis } from "../../components/intro/looked-this"
import { MainIntro } from "../../components/intro/main-intro"
import { ProjectListShort } from "../../components/intro/project-list-short"
import { RightNowIDo } from "../../components/intro/right-now-i-do"
import { ShareKnowledge } from "../../components/intro/share-knowledge"
import { ToolsIntro } from "../../components/intro/tools-intro"
import { TravelInvite } from "../../components/intro/travel-invite"
import { OnlyAdmin } from "../../components/util/only-admin"

export const IndexPage: FunctionComponent = () => {
	document.title = 'higimo — программист на Java Script'

	return [
		<MainIntro />,
		<LastUpdates />,
		<OnlyAdmin><RightNowIDo /></OnlyAdmin>,
		<ProjectListShort />,
		<ContactList />,
		// <OnlyAdmin><RomaSchool /></OnlyAdmin>,
		<ShareKnowledge />,
		<BlogInvite />,
		<TravelInvite />,
		<ToolsIntro />,
		<AboutInvite />,
		<LookedThis />,
		<LogismSingle />,
		// <OnlyAdmin><DonatIntro /></OnlyAdmin>,
		// <OnlyAdmin><NokiaInto /></OnlyAdmin>,
	]
}
