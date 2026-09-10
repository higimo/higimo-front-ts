import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

type FaqListPropsType = {
	faqs: FaqType[]
}

export const FaqList: FunctionComponent<FaqListPropsType> = ({ faqs }) => (
	<div className="faq-list">
		{faqs.map(({ id, name, code }) => (
			<a href={ROUTE_LINKS.faqDetail({ idcode: code })} className="faq-list__link" key={id}>
				<div className="faq-list__name">{name}</div>
			</a>
		))}
	</div>
)
