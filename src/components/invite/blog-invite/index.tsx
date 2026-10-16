import { FunctionComponent } from 'preact'

import { GridTail } from 'components/ui/grid-tail'
import { Heading } from 'components/ui/heading'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { BLOG_INVITE } from 'data/ivite-links/blog-invite'
import { ANCHOR_LINK } from 'dic/route/ANCHOR_LINK'

import './style.css'

export const BlogInvite: FunctionComponent = () => (
	<PrecentationContainer className="blog-invite" id={ANCHOR_LINK.blog}>
		<TextContainer>
			<Heading variant="intro" level={2}>Пишу в блоги</Heading>
		</TextContainer>

		<div className="blog-invite__gallery">
			{BLOG_INVITE.map(item => (
				<GridTail
					key={item.href}
					title={[item.title, item.isArchive ? <sup>(архив)</sup> : null]}
					description={item.description}
					href={item.href as string}
					isArhive={item.isArchive}
				/>
			))}
		</div>
	</PrecentationContainer>
)
