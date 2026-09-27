import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { getDate } from 'utils/date/get-date'
import { getImage } from 'components/blog/last-updates/get-image'
import { getText } from 'components/blog/last-updates/getText'

type BlogItemPropsType = UpdateNewsType
export const BlogItem: FunctionComponent<BlogItemPropsType> = (post) => {
	return (
		<a
			className="last-updates__item post"
			href={post.link}
		>
			<div className="post__meta">
				<span className="post__favicons">
					{(getImage(post.source) || []).map(src => (
						<img className="post__favicon-image" src={src} />
					))}
				</span>
				<span className="post__blog-name">
					<span className="post__blog-title">
						{post.source}
					</span>
				</span>
				<span className="post__date">{getDate(post.date)}</span>
			</div>
			<div className="post__description">
				{getText(post.text)}
			</div>
		</a>
	)
}
