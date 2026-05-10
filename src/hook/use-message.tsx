import { MessageContainer } from 'components/ui/message-container'

/**
 * Возвращает контейнер и добавлялку месседжей
 * @returns
 */
export const useMessage = () => {
	const showMessage = (message: string) => {
		window.dispatchEvent(new CustomEvent('add-message', { detail: { message } }))
	}

  return { showMessage, MessageContainer }
}
