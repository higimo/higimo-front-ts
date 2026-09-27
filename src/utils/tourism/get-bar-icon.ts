import { BAR_ICON_MAPPING } from 'dic/tourism/BAR_ICON_MAPPING'
import { BarIconDictType, BarIconColorType } from 'api-types/tourism.types'

export const getBarIcon = (barIconName: BarIconDictType): BarIconColorType => BAR_ICON_MAPPING[barIconName]
