import { magicBallPhrases } from 'data/magic-ball-phrases'

// TODO: [LIGHT] Лучше это будет единая функция рандома с передаваемым массивом
export const getRandomPhrases = (): string =>
	magicBallPhrases[Math.floor(Math.random() * magicBallPhrases.length)] || ''
