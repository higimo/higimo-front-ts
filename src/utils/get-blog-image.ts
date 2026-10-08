import { UpdateNewsType } from 'api-types/last-update.types'
import { ValueOf, KeyOf } from 'utils.type'

import { imgMapping } from 'utils/get-image'

// TODO: [MIDDLE] надо общую функцию, найти где похожая
export const getBlogImage = (source: UpdateNewsType['source']): ValueOf<typeof imgMapping> | null => {
	return source in imgMapping ? imgMapping[(source as KeyOf<typeof imgMapping>)] : null
}
