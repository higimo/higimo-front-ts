type DraftEntry = {
	data: unknown
	expiresAt: number
}

export type Store = Record<string, DraftEntry>
