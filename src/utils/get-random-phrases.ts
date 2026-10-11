import { MAGIC_BALL_PHRASE } from 'data/magic-ball-phrase'

// TODO: [LIGHT] Лучше это будет единая функция рандома с передаваемым массивом
export const getRandomPhrases = (): string =>
	MAGIC_BALL_PHRASE[Math.floor(Math.random() * MAGIC_BALL_PHRASE.length)] || ''
