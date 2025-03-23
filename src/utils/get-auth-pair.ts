import cookies from 'js-cookie'

export const getAuthPair = () => {
	if (!cookies.get('name') && !cookies.get('pass')) {
		return { login: null, pass: null }
	}
	return { login: cookies.get('name'), pass: cookies.get('pass') }
}
