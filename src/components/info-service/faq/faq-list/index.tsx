import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { OnlyAdmin } from 'components/util/only-admin'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

type FaqListPropsType = {
	faqs: FaqType[] | null
	onRemove: (id: FaqType['id']) => () => void
}

export const FaqList: FunctionComponent<FaqListPropsType> = ({ faqs, onRemove }) => faqs && (
	<div className="faq-list">
		{faqs.map(({ id, name, code }) => (
			<div className="faq-list__item">
				<a href={ROUTE_LINKS.faqDetail({ idcode: code })} className="faq-list__link" key={id}>
					<div className="faq-list__name">{name}</div>
				</a>
				<OnlyAdmin>
					<div className="faq-list__action">
						<a href={ROUTE_LINKS.faqFormEdit({ idcode: id })}>
							✏️
						</a>
						<span onClick={onRemove(id)}>
							❌
						</span>
					</div>
				</OnlyAdmin>
			</div>
		))}
	</div>
)
