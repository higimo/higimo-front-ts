import { getRandom } from 'utils/get-random'

import { MAGIC_BALL_PHRASE } from 'data/magic-ball-phrase'

export const getRandomPhrases = (): string =>
	MAGIC_BALL_PHRASE[getRandom(MAGIC_BALL_PHRASE.length)]!
