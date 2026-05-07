import { Brand } from 'utils.type'

type ComojiId = Brand<number, 'ComojiId'>

export type ComojiType = {
	id: ComojiId;
	comoji: string;
};
