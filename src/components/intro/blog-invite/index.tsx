import { FunctionComponent } from 'preact'

import { GridTail } from './grid-tail'
// TODO: конкурент CategoryTitle
import { IntroHeader } from 'components/intro/intro-header'
import { TextContainer } from 'components/ui/text-container'

// TODO: [LAST] мб, такие датасеты унести в отдельную папку?
import { blogInviteData } from 'components/intro/blog-invite/data'
import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'

import './style.css'

export const BlogInvite: FunctionComponent = () => (
	<div className="blog-invite" id={ANCHOR_LINKS.blog}>
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
	</div>
)
