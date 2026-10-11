import { toast } from "toast"

/**
 * Получает текст и копирует его в буфер обмена
 * @param str Текст для копирования
 */
export const copyToClipboard = async (str: string) => {
	try {
		navigator.clipboard.writeText(str)

		toast.success('Скопировано')
	} catch (error) {
		toast.error(`Текст не скопирован ${error}`)
	}
}
