import { useState, useEffect } from 'preact/hooks'

export const useJsonApi = <T,>(uri: string) => {
	const [citys, setCitys] = useState<T|null>(null)

	useEffect(() => {
		fetch(uri)
			.then(r => r.json())
			.then(data => {
				setCitys(data)
			})
	}, [])

	return citys
}
