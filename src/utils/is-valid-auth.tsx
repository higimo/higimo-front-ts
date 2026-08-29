type AuthDataType = {
	access_token?: string
	token_type?: string
	user?: {
		id: number
	}
}

export const isValidAuth = (authData: AuthDataType): boolean => {
	return !!authData.access_token?.length &&
		authData.token_type === 'bearer' &&
		(authData?.user?.id || 0) > 0
}
