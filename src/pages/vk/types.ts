export type VkSessionType = {
	mid: string // userId,
	sid: string // vk-sid
	sig: string // key
	secret: 'oauth'
	expire: number // date timestamp
	user: {
		id: string // userId
		domain: string // userLogin
		href: string // http url
		first_name: string
		last_name: string
		nickname: string // там пусто почему-то, отчество?
	}
}