import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { iglinksData } from './data'

import './style.css'

export const IgLinkPage: FunctionComponent = () => {
	usePageTitle('Ссылки в био инсты')

	return (
		<div className="ig-link-page">
			<div className="ig-link-page__content">
				{iglinksData.map(item => (
					<div className="ig-link-page__item">
						<div className="ig-link-page__name">
							<a href={item.href} className="ig-link-page__link">{item.title}</a>
						</div>
						<div className="ig-link-page__description">
							{item.description}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
