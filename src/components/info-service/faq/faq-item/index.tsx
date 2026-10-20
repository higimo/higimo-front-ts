import { FaqType } from 'api-types/faq.types';
import { OnlyAdmin } from 'components/util/only-admin';
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK';
import { FunctionComponent } from 'preact';

type FaqItemPropsType = FaqType & {
	onRemove: (id: FaqType['id']) => () => void;
};
export const FaqItem: FunctionComponent<FaqItemPropsType> = ({
	id, name, code, onRemove,
}) => (
	<div className="faq-list__item">
		<a
			href={ROUTE_LINK.faqDetail({ idcode: code })}
			className="faq-list__link"
		>
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
);
