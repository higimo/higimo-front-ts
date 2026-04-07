import { FunctionComponent } from 'preact'

import { NAME, ADRESS, OGRN, INN, INVOICE, BANK, BIK, EMAIL } from 'components/merchant/merchant-const'

export const MerchantCredits: FunctionComponent = () => (
	<p>
		Дима Уткин:
		<br />
		{NAME}
		<br />
		{ADRESS}
		<br />
		ОГРН {OGRN},
		<br />
		ИНН {INN}
		<br />
		Расчётный счёт {INVOICE} в {BANK}, БИК {BIK}
		<br />
		{EMAIL}
	</p>
);
