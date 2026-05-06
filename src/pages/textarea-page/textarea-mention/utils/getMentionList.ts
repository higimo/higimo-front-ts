// чекает упоминания типа @higimo valid: @let_ha-yf#fewew
const HASH_TAG_REGEXP = /(?:^|[^\S])@(\{[a-zа-яё0-9_\-]{1,25}\})/gmi

export const getMentionList = (text: string) => {
	const matches = text.matchAll(HASH_TAG_REGEXP)
	return Array.from(new Set(matches)).map(i => i[1] || null)
}
