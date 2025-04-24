import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { ProjectFullInfoType } from '../../../types'
import { MaybeLink } from '../../ui/maybe-link/maybe-link'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

import './style.css'

export const ProjectElement: FunctionComponent<ProjectFullInfoType> = props => {
	const link = props.isLink == 'true' ? props.link : ROUTE_LINKS.projectDetail({
		vendor: props.vendorCode,
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
					src={`/assets/project/${props.vendorCode}/${props.code}/asset/img/anons.${props.image}`}
					loading="lazy"
				/>
				{!!tags.length && (
					<div className="project__tags">
						{tags.map(tag => (
							<span className="project__tag">{tag}</span>
						))}
					</div>
				)}
			</MaybeLink>
		</div>
	)
}
