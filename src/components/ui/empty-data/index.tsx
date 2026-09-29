import { ApiState } from 'hook/fetch/use-api'
import { JsonApiState } from 'hook/fetch/use-json-api'
import { VNode, FunctionComponent } from 'preact'

import { EmptyState, ErrorState } from 'components/ui/state'
import { checkEmpty } from 'utils/check-empty'

type EmptyDataPropsType = {
	data?: ApiState<any, Object> | ApiState<any, Object>[] | JsonApiState<any> | JsonApiState<any>[]
	errorComponent?: VNode
	emptyComponent?: VNode
	skipEmpty?: boolean
}

export const EmptyData: FunctionComponent<EmptyDataPropsType> = ({
	data = [],
	errorComponent = <ErrorState />,
	emptyComponent = <EmptyState />,
	children,
	skipEmpty = false,
}) => {
	const isError = (Array.isArray(data)
		? data.some(i => i.status === 'ERROR')
		: data.status === 'ERROR'
	)
	if (isError) {
		return errorComponent
	}

	const isEmpty = !skipEmpty && (Array.isArray(data)
		? data.some(i => i.status === 'LOADED' && checkEmpty(i.data))
		: data.status === 'LOADED' && checkEmpty(data.data)
	)
	if (isEmpty) {
		return emptyComponent
	}

	return children
}
