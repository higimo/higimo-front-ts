import { FormProvider, useForm } from 'react-hook-form'
import { FunctionComponent } from 'preact'
import { MerchantProductType } from 'api-types/merchant.types'

import { useLayoutEffect } from 'preact/hooks'

import { ButtonGroup } from 'components/form/button-group'
import { FiledForm } from 'components/form/filed-form'
import { FormButton } from 'components/form/form-button'
import { FullpageFormContainer } from 'components/form/fullpage-form-container'

import { initPayment } from 'utils/merchant/init-payment'

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

	useLayoutEffect(() => {
		if (!product) {
			return
		}

		// TODO: [HARD] надо исправить это как у VK
		initPayment(() => ({
			currentProduct: product,
			getValues: formMethods.getValues
		})).then().catch()
	}, [product])

	return (
		<div className="checkout-form">
			<FullpageFormContainer>
				<FormProvider {...formMethods}>
					<form
						autocomplete="off"
					>
						<FiledForm name="email" label="Электропочта" />
						<FiledForm name="comment" type="textarea" label="Комментарий к заказу" />
						<ButtonGroup variant="gap">
							<FormButton
								type="submit"
								variant="default"
								disabled={formMethods.formState.isSubmitting}
							>
								{formMethods.formState.isSubmitting ? 'Добавление…' : 'Добавить'}
							</FormButton>
						</ButtonGroup>
					</form>
				</FormProvider>
			</FullpageFormContainer>
		</div>
	)
}
