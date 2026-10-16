import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'

import { IG_LINK_LIST } from 'data/ig-link-list'

import './style.css'

export const IgLinkPage: FunctionComponent = () => (
	<Layout title="Ссылки в био инсты" className="ig-link-page">
		<div className="ig-link-page__content">
			{IG_LINK_LIST.map(item => (
				<div key={item.title} className="ig-link-page__item">
					<div className="ig-link-page__name">
						<a href={item.href as string} className="ig-link-page__link">
							{item.title}
						</a>
					</div>
					<div className="ig-link-page__description">
						{item.description}
					</div>
				</div>
			))}
		</div>
	</Layout>
)
