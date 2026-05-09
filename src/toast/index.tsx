import { useEffect, useState } from 'preact/hooks'

import './style.css'

type ToastType = {
	id: string
	message: string
}
interface ToastProps {
	id: string
	message: string
	removeToast: (id: string) => void
	autoCloseDelay?: number
}

const Toast: React.FC<ToastProps> = ({ id, message, removeToast, autoCloseDelay = 8000 }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(id)
		}, 8000)

		return () => clearTimeout(timer)
	}, [id, removeToast])

	return (
		<div className="toast">
			<div className="toast-content">{message}</div>
			<button
				className="toast-close-button"
				onClick={() => removeToast(id)}
				aria-label="Закрыть уведомление"
			>
				&times;
			</button>
		</div>
	)
}

interface ToastContainerProps {
	autoCloseDelay?: number
	maxWidth?: number
	gap?: number
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
	autoCloseDelay = 8000,
	maxWidth = 320,
	gap = 8,
}) => {
	const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>([])

	useEffect(() => {
		const handleAddToast = (event: CustomEvent<{ message: string; id?: string }>) => {
			const { message, id } = event.detail
			const newToast: ToastType = {
				id: id || Date.now().toString(),
				message,
			}
			// TODO: [LIGHT] array concat
			setToasts((prev) => [newToast, ...prev])
		}

		// Слушаем событие удаления тоста
		const handleRemoveToast = (event: CustomEvent<{ id: string }>) => {
			const { id } = event.detail
			setToasts((prev) => prev.filter((toast) => toast.id !== id))
		}

		// Слушаем событие очистки всех тостов
		const handleClearToasts = () => {
			setToasts([])
		}

		window.addEventListener('add-toast', handleAddToast as EventListener)
		window.addEventListener('remove-toast', handleRemoveToast as EventListener)
		window.addEventListener('clear-toasts', handleClearToasts as EventListener)

		return () => {
			window.removeEventListener('add-toast', handleAddToast as EventListener)
			window.removeEventListener('remove-toast', handleRemoveToast as EventListener)
			window.removeEventListener('clear-toasts', handleClearToasts as EventListener)
		}
	}, [])

	const addToast = (message: string) => {
		const newToast = {
			id: Date.now().toString(),
			message,
		}

		// TODO: [LIGHT] array concat
		setToasts((prev) => [newToast, ...prev])
	}

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}

	return (
		<div className="toast-container">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					id={toast.id}
					message={toast.message}
					removeToast={removeToast}
				/>
			))}
		</div>
	)
}

// Хук для удобного использования тостов
export const useToast = () => {
	const [toastContainer, setToastContainer] = useState<React.ReactElement | null>(null)

	const showToast = (message: string) => {
		// Если контейнер еще не создан, создаем его
		if (!toastContainer) {
			setToastContainer(<ToastContainer />)
		}

		// Добавляем тост
		window.dispatchEvent(new CustomEvent('add-toast', { detail: { message } }))
	}

	return { showToast, ToastContainer: toastContainer }
}

export const toast = {
	show: (message: string, id?: string) => {
		window.dispatchEvent(new CustomEvent('add-toast', { detail: { message, id } }))
	},
	remove: (id: string) => {
		window.dispatchEvent(new CustomEvent('remove-toast', { detail: { id } }))
	},
	clear: () => {
		window.dispatchEvent(new CustomEvent('clear-toasts'))
	},
	success: (message: string) => {
		toast.show(`✅ ${message}`)
	},
	error: (message: string) => {
		toast.show(`❌ ${message}`)
	},
	warning: (message: string) => {
		toast.show(`⚠️ ${message}`)
	},
	info: (message: string) => {
		toast.show(`ℹ️ ${message}`)
	},
}
