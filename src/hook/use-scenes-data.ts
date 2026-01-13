import { useMemo } from 'preact/hooks';

/**
 * Хук для разделения данных по сценам
 */
export const useScenesData = <T extends { scene: number; time: number }>(
	data: T[]
): { mainScene: T[]; secondScene: T[] } =>
	useMemo(() => {
		const sorted = [...data].sort((a, b) => a.time - b.time)
		
		const mainScene = sorted.filter(item => item.scene === 1)
		const secondScene = sorted.filter(item => item.scene !== 1)
		
		return { mainScene, secondScene }
	}, [data])
