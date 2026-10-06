import { Brand, ISOString } from 'utils.type'

type MeIdType = Brand<number, 'id'>

export type MeDataType = {
	id: MeIdType
	name: string
	email: string
	email_verified_at: null
	created_at: ISOString
	updated_at: ISOString
}

export type AuthDataType = {
	access_token?: string
	token_type?: string
	expires_in?: number
	user?: MeDataType
}
