import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { PortfolioProjectFullType } from 'api-types/portfolio.types'
import { MaybeLink } from 'components/ui/maybe-link/maybe-link'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export const ProjectElement: FunctionComponent<PortfolioProjectFullType> = props => {
	const link = props.isLink ? props.link : ROUTE_LINKS.projectDetail({
		vendor: (props.vendor.code as unknown as string),
		project: props.code
	})
	const tags = props.tags || []

	return (
		<div className={cs('project__item', `project__item--${props.cover_size}-size`)}>
			<div className="project__name">
				<MaybeLink href={link} className="project__title">
					<span dangerouslySetInnerHTML={{__html: props.name}} />
				</MaybeLink>
			</div>
			<MaybeLink href={link} className="project__image">
				<img
					className="project__image-anons"
					src={`https://storage.yandexcloud.net/higimo-home/project/${props.vendor.code}/${props.code}/asset/img/anons.${props.image}`}
					loading="lazy"
				/>
				{!!tags.length && (
					<div className="project__tags">
						{tags.map(tag => (
							<span className="project__tag">{tag.title}</span>
						))}
					</div>
				)}
			</MaybeLink>
		</div>
	)
}
