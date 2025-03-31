import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element'

import { blogInviteData } from './data'

import { ANCHOR_LINKS } from '../../../dic/ANCHOR_LINKS'

import './style.css'

const halfList = Math.floor(blogInviteData.length / 2)

export const BlogInvite: FunctionComponent = () => (
	<TilesGallery
		className="blog-invite"
		id={ANCHOR_LINKS.blog}
		title="Пишу в блоги"
		left={blogInviteData.slice(0, halfList).map(item => (
			<TileElement
				className={cs(
					'blog-invite__item',
					{ 'blog-invite__item--archive': item.isArhive }
				)}
				href={item.link}
				name={([item.name, item.isArhive ? <sup>(архив)</sup> : null])}
				description={item.description}
			/>
		))}
		right={blogInviteData.slice(halfList, blogInviteData.length).map(item => (
			<TileElement
				className={cs(
					'blog-invite__item',
					{ 'blog-invite__item--archive': item.isArhive }
				)}
				href={item.link}
				name={([item.name, item.isArhive ? <sup>(архив)</sup> : null])}
				description={item.description}
			/>
		))}
	/>
)
