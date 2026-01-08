import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { FaqSingle } from 'components/info-service/faq/faq-single'

export const FaqSinglePage: FunctionComponent = props => {
	usePageTitle('Статьи')

	return (
		<div className="faq-page">
			<FaqSingle />
		</div>
	)
}
