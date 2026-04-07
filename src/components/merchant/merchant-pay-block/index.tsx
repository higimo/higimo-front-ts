import { FunctionComponent } from 'preact'

import './style.css'

export const MerchantPayBlock: FunctionComponent = () => (
	<div className="checkout-button">
		<div id="paymentContainer" />
		<div class="checkout-button__secure">
			Безопасная оплата через банковский сайт через чудесный Мир
		</div>
		<div class="checkout-button__thanks">
			💛 Спасибо, что заботитесь о проекте
		</div>
	</div>
)
