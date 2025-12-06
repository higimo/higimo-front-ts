import { getRandom } from 'utils/get-random'
import { useMemo } from "preact/hooks"

export const useRandomElements = <T,>(items: T[], count: number): T[] => 
	useMemo(() => {
		if (!items.length || items.length <= count) return items
		const startIndex = getRandom(Math.max(0, items.length - count - 1))
		return items.slice(startIndex, startIndex + count)
	}, [items, count])