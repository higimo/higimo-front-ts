import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { FaqItem } from 'components/info-service/faq/faq-item'

import './style.css'

type FaqListPropsType = {
	faqList: FaqType[]
	onRemove: (id: FaqType['id']) => () => void
}

export const FaqList: FunctionComponent<FaqListPropsType> = ({
	faqList,
	onRemove
}) => (
	<div className="faq-list">
		{faqList.map((item) => (
			<FaqItem
				key={item.id}
				{...item}
				onRemove={onRemove}
			/>
		))}
	</div>
)
