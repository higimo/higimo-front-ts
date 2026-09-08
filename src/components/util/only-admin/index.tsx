import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/fetch/use-auth'

export const OnlyAdmin: FunctionComponent = (props) => {
	const { isAuth } = useAuth()
	return isAuth ? props.children : null
}
