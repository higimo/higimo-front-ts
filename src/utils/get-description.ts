/**
 * Пет проектам описание подготавливается
 * http обрамляет в ссылки
 * Сокращает описание до 320 символов
 *
 * @param str Описание пет-проекта
 * @returns string
 */
export const getDescription = (str: string) => (str || '').replace(/(https:\/\/[\S]+)/g, '<a href="$1">Ссылка</a>').substring(0, 320);
