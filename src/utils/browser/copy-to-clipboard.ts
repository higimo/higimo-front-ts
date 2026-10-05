import { toast } from "toast"

/**
 * Получает текст и копирует его в буфер обмена
 * @param str Текст для копирования
 */
export const copyToClipboard = (str: string) => {
	navigator.clipboard.writeText(str)
		.then(() => {
			toast.success('Скопировано')
		})
		.catch(error => {
			toast.error(`Текст не скопирован ${error}`)
		})
}
