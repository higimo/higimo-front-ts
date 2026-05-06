import { useState } from 'preact/hooks'
import { HigimoServerResponse } from 'api-types/server-response.types'

export const useFormStatus: () => [ HigimoServerResponse, (val: HigimoServerResponse) => void] = () => {
	const [ status, setStatus ] = useState<HigimoServerResponse>([])
	const addStatus = (val: HigimoServerResponse) => setStatus(pState => [ ...pState, val ])
	return [ status, addStatus ]
}
