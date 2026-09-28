import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'

import { iglinksData } from 'data/ig-link-data'

import './style.css'

export const IgLinkPage: FunctionComponent = () => (
	<Layout title="Ссылки в био инсты">
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
	</Layout>
)
