import { ApiState } from 'hook/fetch/use-api'
import { JsonApiState } from 'hook/fetch/use-json-api'
import { VNode, FunctionComponent } from 'preact'

import { Loading } from 'components/ui/loading/Loading'

type LoadSuspensePropsType = {
	data?: ApiState<any, Object> | ApiState<any, Object>[] | JsonApiState<any> | JsonApiState<any>[]
	loaderComponent?: VNode
}
export const LoadSuspense: FunctionComponent<LoadSuspensePropsType> = ({
	data = [],
	loaderComponent = <Loading />, children,
}) => {
	const isLoading = (Array.isArray(data)
		? data.some(i => i.status === 'LOADING')
		: data.status === 'LOADING'
	)
	if (isLoading) {
		return loaderComponent
	}

	return children
}
