import { MerchantProductType } from 'api-types/merchant.types'
import { ValueOf } from 'utils.type'

import { signal } from '@preact/signals'

import { API_STATUS } from 'dic/API_STATUS'

interface MerchantProductState {
	status: ValueOf<typeof API_STATUS>
	products: MerchantProductType[]
}

export const merchantProductSignal = signal<MerchantProductState>({
	status: API_STATUS.INIT,
	products: [],
})
