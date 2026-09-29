/**
 * Заменяет четыре девиса (`----`) на `<hr />`
 *
 * @example
 * getHr('text----text')
 * // → 'text<hr />text'
 */
export const getHr = (str: string): string => str.replace(/----/g, '<hr />')
