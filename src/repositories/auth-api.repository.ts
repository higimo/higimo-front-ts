import { AuthDataType, LoginResponseType } from 'api-types/auth.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/route/API_ROUTE'

class AuthApiRepository {
	async login(values: LoginResponseType): Promise<AuthDataType | null> {
		const data = await sendRequest<AuthDataType>(API_ROUTE.login, {
			method: 'POST',
			values: values
		})

		return data.data
	}
}

export const authApi = new AuthApiRepository()
