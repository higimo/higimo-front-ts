import { FunctionComponent } from 'preact'
import { UseFormRegister } from 'react-hook-form'
import { FormValues } from './types'

import './style.css'

type MerchantPaymentFormPropsType = {
	register: UseFormRegister<FormValues>
}
export const MerchantPaymentForm: FunctionComponent<MerchantPaymentFormPropsType> = ({ register }) => (
	<div className="checkout-form">
		<div className="checkout-form__line">
			<div className="checkout-form__label">
				Электропочта
			</div>
			<div className="checkout-form__field">
				<input {...register('email')} type="text" name="email" />
			</div>
		</div>
		<div className="checkout-form__line">
			<div className="checkout-form__label">
				Комментарий к заказу
			</div>
			<div className="checkout-form__field">
				<textarea {...register('comment')} name="comment" />
			</div>
		</div>
	</div>
)
