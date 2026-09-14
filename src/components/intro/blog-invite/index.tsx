import { FunctionComponent } from 'preact'

import { GridTail } from '../grid-tail'
// TODO: конкурент CategoryTitle
import { IntroHeader } from 'components/intro/intro-header'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { blogInviteData } from 'dic/intra-links/blog-invite'
import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'

import './style.css'

export const BlogInvite: FunctionComponent = () => (
	<PrecentationContainer className="blog-invite" id={ANCHOR_LINKS.blog}>
		<TextContainer>
			<IntroHeader>Пишу в блоги</IntroHeader>
		</TextContainer>

		<div className="blog-invite__gallery">
			{blogInviteData.map(item => (
				<GridTail
					title={[item.name, item.isArhive ? <sup>(архив)</sup> : null]}
					description={item.description}
					href={item.link}
					isArhive={item.isArhive}
				/>
			))}
		</div>
	</PrecentationContainer>
)
