import { AuthDataType } from 'api-types/auth.types'

export const isValidAuth = (authData: AuthDataType): boolean => {
	return !!authData.access_token?.length &&
		authData.token_type === 'bearer' &&
		(authData?.user?.id || 0) > 0
}
