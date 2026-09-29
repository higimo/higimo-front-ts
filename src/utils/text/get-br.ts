/**
 * Заменяет все символы перевода строки (`\n`) в строке на HTML-тег `<br />`.
 *
 * @example
 * getBr('line1\nline2')
 * // → 'line1<br />line2'
 *
 * // Одна строка — вернётся как есть
 * getBr('hello')
 * // → 'hello'
 *
 * // В React-компоненте
 * <div dangerouslySetInnerHTML={{ __html: getBr(text) }} />
 */
export const getBr = (str: string): string => str.replace(/\r?\n/g, '<br />')
