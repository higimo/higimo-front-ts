import { FunctionComponent } from 'preact'

import { BlogInvite } from 'components/intro/blog-invite'
import { ContactList } from 'components/intro/contact-list'
import { DonatIntro } from 'components/intro/donat-intro'
import { Layout } from 'components/ui/layout/Layout'
import { LogismSingle } from 'components/intro/logism-single'
import { LookedThis } from 'components/intro/looked-this'
import { MainIntro } from 'components/intro/main-intro'
import { ProjectListShort } from 'components/intro/project-list-short'
import { TravelInvite } from 'components/intro/travel-invite'

// TODO: [FEATURE] Можно писать, что ищу проекты, просто посылать нахуй не интересное

// TOOD: Layout поставить
export const IndexPage: FunctionComponent = () => (
	<Layout title="Разработчик и менеджер продукта — higimo">
		<MainIntro />
		<DonatIntro />
		<ProjectListShort />
		<ContactList />
		<TravelInvite />
		<LookedThis />
		<LogismSingle />
		<BlogInvite />
	</Layout>
)
