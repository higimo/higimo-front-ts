import { useState, useCallback } from 'preact/hooks'

type QueueHook<T> = {
	/**
	 * Текущая очередь
	 */
	queue: T[]
	/**
	 * Добавление элемента в очередь
	 * @param item 
	 * @returns 
	 */
	push: (item: T) => void
	/**
	 * Извлечь из очереди
	 * @returns 
	 */
	pull: () => T | undefined
	/**
	 * просмотр первого элемента без извлечения
	 * @returns 
	 */
	view: () => T | undefined
	/**
	 * очистка очереди
	 * @returns 
	 */
	clear: () => void
	/**
	 * текущий размер очереди
	 */
	size: number
}

/**
 * FIFO логика - строго соблюдается принцип "первым пришел - первым ушел"
 * @param initialQueue 
 * @returns 
 */
export function useQueue<T>(initialQueue: T[] = []): QueueHook<T> {
	const [queue, setQueue] = useState<T[]>(initialQueue)

	const push = useCallback((item: T) => {
		setQueue(prevQueue => [...prevQueue, item])
	}, [])

	const pull = useCallback(() => {
		let item: T | undefined
		setQueue(prevQueue => {
			if (prevQueue.length === 0) return prevQueue
			item = prevQueue[0]
			return prevQueue.slice(1)
		})
		return item
	}, [])

	const view = useCallback(() => {
		return queue.length > 0 ? queue[0] : undefined
	}, [queue])

	const clear = useCallback(() => {
		setQueue([])
	}, [])

	return {
		queue,
		push,
		pull,
		view,
		clear,
		size: queue.length,
	}
}