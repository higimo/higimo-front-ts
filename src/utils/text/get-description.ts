import { linkify } from 'utils/text/linkify'

/**
 * Готовит описание пет-проекта к отображению в карточке/списке,
 * превращая URL-адрес в HTML-ссылку и обрезает строку до 320 символов
 *
 * @example
 * getShortDescription('Проект на https://example.com — быстрый и удобный')
 * // → 'Проект на <a href="https://example.com">https://example.com</a> — быстрый и удобный'
 */
export const getShortDescription = (str?: string) => linkify((str || '')).substring(0, 320)
