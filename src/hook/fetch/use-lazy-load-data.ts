import { useEffect, useState } from 'preact/hooks'

// TODO: [LIGHT] move to hook/fetch
export const useLazyLoadData = <T,>(modulePromise: Promise<any>) => {
	const [stateData, setStateData] = useState<T>()

	useEffect(() => {
		(async () => {
			try {
				const module = await modulePromise
				setStateData(module.default || module)
			} catch (error) {
				console.error('Module loading failed:', error)
			}
		})()
	}, [modulePromise])

	return stateData
}
