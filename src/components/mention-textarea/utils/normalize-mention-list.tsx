import { MentionSuggest } from 'components/mention-textarea/types'

export const normalizeMentionList = (list: string[], filtredSuggestList: MentionSuggest[]): MentionSuggest[] => {
	let result: MentionSuggest[] = [];
	for (let mention of list) {
		const cleanName = mention.replace(/[\{\}]/g, '').replace(/^\@/m, '').replace(/_/g, ' ');
		for (const mentionItem of filtredSuggestList) {
			if (mentionItem.display === cleanName) {
				result.push(mentionItem);
			}
		}
	}
	return result;
};
