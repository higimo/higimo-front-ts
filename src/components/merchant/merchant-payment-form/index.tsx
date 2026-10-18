import { FormProvider, useForm } from 'react-hook-form'
import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import { FiledForm } from 'components/form/filed-form'
import { FromContainer } from 'components/form/form-container'
import { MerchantPayBlock } from 'components/merchant/merchant-pay-block'
import { TbankSdkLoader } from 'components/merchant/tbank-sdk-loader'

import './style.css'

export type FormValues = {
	email: string
	comment: string
}

type MerchantPaymentFormPropsType = {
	product: MerchantProductType
}

export const MerchantPaymentForm: FunctionComponent<MerchantPaymentFormPropsType> = ({
	product,
}) => {
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
						<TbankSdkLoader
							currentProduct={product}
							getValues={formMethods.getValues}
						/>
						<FiledForm name="email" label="Электропочта" />
						<FiledForm name="comment" type="textarea" label="Комментарий к заказу" />
						<MerchantPayBlock />
					</form>
				</FormProvider>
			</FromContainer>
		</div>
	)
}
