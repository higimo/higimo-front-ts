import { UpdateNewsType } from 'api-types/last-update.types'
import { KeyOf, ValueOf } from 'utils.type'

import higimo from './img/higimo.png'
import rak from './img/rak.png'
import screen from './img/screen.png'
import tech from './img/tech.png'
import tg from './img/tg.svg'

const imgMapping = {
	'Техники → навыки → счастье': [tg, tech],
	'Хигимо': [tg, higimo],
	'Скриншотил': [tg, screen],
	'Раковарня 2.0': [tg, rak],
} as const

export const getImage = (source: UpdateNewsType['source']): ValueOf<typeof imgMapping>|null => {
	return source in imgMapping ? imgMapping[(source as KeyOf<typeof imgMapping>)] : null
}

