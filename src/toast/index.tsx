import { useEffect, useState } from 'preact/hooks'

import './Toast.css'

interface ToastProps {
  id: string
  message: string
  removeToast: (id: string) => void
}

interface ToastContainerProps {
  autoCloseDelay?: number
  maxWidth?: number
  gap?: number
}

const Toast: React.FC<ToastProps> = ({ id, message, removeToast }) => {
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

export const ToastContainer: React.FC<ToastContainerProps> = ({
  autoCloseDelay = 8000,
  maxWidth = 320,
  gap = 8,
}) => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>([])

  const addToast = (message: string) => {
	const newToast = {
	  id: Date.now().toString(),
	  message,
	}

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
	const event = new CustomEvent('add-toast', { detail: { message } })
	window.dispatchEvent(event)
  }

  return { showToast, ToastContainer: toastContainer }
}