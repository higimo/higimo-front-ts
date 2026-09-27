import { linkify } from 'utils/text/linkify'

/**
 * Пет проектам описание подготавливается
 * http обрамляет в ссылки
 * Сокращает описание до 320 символов
 *
 * @param str Описание пет-проекта
 * @returns string
 */
export const getShortDescription = (str?: string) => linkify((str || '')).substring(0, 320)
