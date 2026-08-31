import { useState, useEffect } from 'preact/hooks'

// TODO: перенести в hook/{loading}/useJson
// TODO: добавить isLoading и прочая
export const useJsonApi = <T,>(uri: string) => {
	const [data, setData] = useState<T|null>(null)

	useEffect(() => {
		fetch(uri)
			.then(r => r.json())
			.then(data => {
				setData(data)
			})
	}, [])

	return data
}
