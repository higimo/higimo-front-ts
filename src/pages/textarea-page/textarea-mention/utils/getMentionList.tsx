// чекает упоминания типа @higimo valid: @let_ha-yf#fewew
const HASH_TAG_REGEXP = /(?:^|[^\S])@([a-zA-Z0-9_\-]{1,25})(?:\b|$)/gmi;
const getMentionList = (text: string) => {
	return [...(new Set(text.matchAll(HASH_TAG_REGEXP)))].map(i => i[1] || null);
};
