import { useEffect, useState } from "preact/hooks"

export const useLazyLoadData = <T,>(modulePromise: Promise<any>) => {
	const transformData = (data) => data
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