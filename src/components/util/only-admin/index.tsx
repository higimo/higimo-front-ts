import { FunctionComponent } from 'preact'

import { useAuth } from 'hook/use-auth'

export const OnlyAdmin: FunctionComponent = (props) => {
	const { isAuth } = useAuth()
	return isAuth ? props.children : null
}
