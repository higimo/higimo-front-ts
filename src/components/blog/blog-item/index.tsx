import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { getHumanMonthDate } from 'utils/date/get-date'
import { getText } from 'utils/text/get-text'

import higimo from './img/higimo.png'
import rak    from './img/rak.png'
import screen from './img/screen.png'
import tech   from './img/tech.png'
import tg     from './img/tg.svg'

const imgMapping = {
	'Техники → навыки → счастье': [tg, tech],
	'Хигимо':                     [tg, higimo],
	'Скриншотил':                 [tg, screen],
	'Раковарня 2.0':              [tg, rak],
} as const

type BlogSource = keyof typeof imgMapping

const isBlogSource = (source: string): source is BlogSource =>
	Object.prototype.hasOwnProperty.call(imgMapping, source)

const getBlogImage = (source: string): readonly string[] =>
	isBlogSource(source) ? imgMapping[source] : []

type BlogItemPropsType = UpdateNewsType

export const BlogItem: FunctionComponent<BlogItemPropsType> = (post) => {
	return (
		<a
			className="last-updates__item post"
			href={post.link}
		>
			<div className="post__meta">
				<span className="post__favicons">
					{(getBlogImage(post.source)).map(src => (
						<img key={src} className="post__favicon-image" src={src} alt="" />
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
