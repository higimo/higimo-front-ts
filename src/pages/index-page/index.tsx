import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { BlogInvite } from 'components/intro/blog-invite'
import { ContactList } from 'components/intro/contact-list'
import { LogismSingle } from 'components/intro/logism-single'
import { LookedThis } from 'components/intro/looked-this'
import { MainIntro } from 'components/intro/main-intro'
import { ProjectListShort } from 'components/intro/project-list-short'
import { TravelInvite } from 'components/intro/travel-invite'
// import { CharityIntro } from 'components/intro/carity-intro'
import { ProductServerBanner } from 'components/merchant/product-server-banner'
// import { DonatIntro } from 'components/intro/donat-intro'
// import { AboutMe } from 'components/intro/about-me'

// TODO: [FEATURE] Можно писать, что ищу проекты, просто посылать нахуй не интересное

export const IndexPage: FunctionComponent = () => {
	usePageTitle('Разработчик и менеджер продукта — higimo')

	return [
		<MainIntro />,
		<ProductServerBanner productKey="COFFEE" />,
		// TODO: [FEATURE] опубликовать, но пока не оч красиво выглядит
		// <AboutMe />,
		<ProjectListShort />,
		<ContactList />,
		<TravelInvite />,
		<LookedThis />,
		<LogismSingle />,
		<BlogInvite />,
		// <CharityIntro />,
		// <DonatIntro />,
	]
}
