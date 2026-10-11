import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { OnlyAdmin } from 'components/util/only-admin'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type FaqListPropsType = {
	faqList: FaqType[] | null
	onRemove: (id: FaqType['id']) => () => void
}

export const FaqList: FunctionComponent<FaqListPropsType> = ({ faqList, onRemove }) => faqList && (
	<div className="faq-list">
		{faqList.map(({ id, name, code }) => (
			<div className="faq-list__item">
				<a href={ROUTE_LINK.faqDetail({ idcode: code })} className="faq-list__link" key={id}>
					<div className="faq-list__name">{name}</div>
				</a>
				<OnlyAdmin>
					<div className="faq-list__action">
						<a href={ROUTE_LINK.faqFormEdit({ idcode: id })}>
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
