import { isDefined } from 'utils/is-defined'

export const convertPathToUrl = (path: string): string[] => {
	const parts = path.split('/').filter(isDefined)
	return parts.reduce(
		(acc, part) => acc.concat(`${acc[acc.length - 1]}/${part}/`.replace('//', '/')),
		['/']
	)
}
