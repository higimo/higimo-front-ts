import { MessageContainer } from 'components/ui/message-container'
// TODO: [LIGHT] если мессаги не нужны, то удалить компонент и этот хук
/**
 * Возвращает контейнер и добавлялку месседжей
 */
export const useMessage = () => {
	const showMessage = (message: string) => {
		window.dispatchEvent(new CustomEvent('add-message', { detail: { message } }))
	}

  return { showMessage, MessageContainer }
}
