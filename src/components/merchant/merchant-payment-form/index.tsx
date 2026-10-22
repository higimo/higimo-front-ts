import { FormProvider, useForm } from 'react-hook-form'
import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import { FiledForm } from 'components/form/filed-form'
import { FromContainer } from 'components/form/form-container'
import { MerchantTbankSdkLoader } from 'components/merchant/merchant-tbank-sdk-loader'

import './style.css'

export type FormValues = {
	email: string
	comment: string
}

type MerchantPaymentFormPropsType = {
	product: MerchantProductType | null
}

export const MerchantPaymentForm: FunctionComponent<MerchantPaymentFormPropsType> = ({
	product,
}) => {
	if (!product) {
		return null
	}
	// здесь никогда не потребуются значения по умолчанию
	const formMethods = useForm<FormValues>({
		defaultValues: {
			email: '',
			comment: ''
		}
	})

	return (
		<div className="checkout-form">
			<FromContainer variant="inner">
				<FormProvider {...formMethods}>
					<form
						autocomplete="off"
					>
						<MerchantTbankSdkLoader
							currentProduct={product}
							getValues={formMethods.getValues}
						/>
						<FiledForm name="email" label="Электропочта" />
						<FiledForm name="comment" type="textarea" label="Комментарий к заказу" />
						<div className="checkout-button">
							<div id="paymentContainer" />
							<div class="checkout-button__secure">
								Безопасная оплата через банковский сайт через чудесный Мир
							</div>
							<div class="checkout-button__thanks">
								💛 Спасибо, что заботитесь о проекте
							</div>
						</div>
					</form>
				</FormProvider>
			</FromContainer>
		</div>
	)
}
