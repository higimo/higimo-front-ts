import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { getHumanMonthDate } from 'utils/date/get-date'
import { getBlogImage } from 'utils/get-blog-image'
import { getText } from 'utils/text/get-text'

type BlogItemPropsType = UpdateNewsType

export const BlogItem: FunctionComponent<BlogItemPropsType> = (post) => {
	return (
		<a
			className="last-updates__item post"
			href={post.link}
		>
			<div className="post__meta">
				<span className="post__favicons">
					{(getBlogImage(post.source) || []).map(src => (
						<img className="post__favicon-image" src={src} />
					))}
				</span>
				<span className="post__blog-name">
					<span className="post__blog-title">
						{post.source}
					</span>
				</span>
				<span className="post__date">{getHumanMonthDate(post.date)}</span>
			</div>
			<div className="post__description">
				{getText(post.text)}
			</div>
		</a>
	)
}
