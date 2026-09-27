import { KeyOf, ValueOf } from 'utils.type'
import { BAR_COLOR_MAPPING } from 'dic/tourism/BAR_COLOR_MAPPING'

export const getBarColor = (mood: KeyOf<typeof BAR_COLOR_MAPPING>): ValueOf<typeof BAR_COLOR_MAPPING> => BAR_COLOR_MAPPING[mood]
