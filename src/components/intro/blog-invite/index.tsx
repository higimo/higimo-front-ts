import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { CategoryTitle } from './category-title'
import { GridTail } from './grid-tail'

// TODO: [LAST] мб, такие датасеты унести в отдельную папку?
import { blogInviteData } from 'components/intro/blog-invite/data'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'

import './style.css'

export const BlogInvite: FunctionComponent = () => (
	<div id={ANCHOR_LINKS.blog} className="blog-invite">
		<TextContainer>
			<CategoryTitle>Пишу в блоги</CategoryTitle>
		</TextContainer>
		<div className="blog-invite__gallery">
			{blogInviteData.map(item => (
				<GridTail
					href={item.link}
					isArhive={item.isArhive}
					name={([item.name, item.isArhive ? <sup>(архив)</sup> : null])}
					description={item.description}
				/>
			))}
		</div>
	</div>
)
