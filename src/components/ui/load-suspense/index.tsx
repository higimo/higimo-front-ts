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
	const dataArr = (Array.isArray(data) ? data : [data])

	const isInit = dataArr.some(i => i.status === 'INIT')
	const isLoading = dataArr.some(i => i.status === 'LOADING')
	if (isInit || isLoading) {
		return loaderComponent
	}

	return children
}
