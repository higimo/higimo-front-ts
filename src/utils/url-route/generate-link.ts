/**
 * Извлекает имена параметров из шаблона URI
 *
 * @example
 * ```ts
 * type Params = ExtractParams<'/api/v2/users/:userId/posts/:postId'>
 * // Результат: 'userId' | 'postId'
 * ```
 */
type ExtractParams<T extends string> =
	T extends `${string}:${infer Param}/${infer Rest}`
		? Param | ExtractParams<Rest>
		: T extends `${string}:${infer Param}`
			? Param
			: never

/**
 * Создаёт тип для параметров на основе шаблона URI
 */
type ParamsObject<T extends string> = Record<ExtractParams<T>, string | number>

/**
 * Тип для результата - всегда строка, начинающаяся с /api/v2/
 */
type ApiV2Path = `/api/v2/${string}`

/**
 * Генератор типобезопасных URI для API v2
 *
 * @template T - Строковый литерал с шаблоном URI
 *
 * @param link - URI-шаблон с плейсхолдерами :param
 * @returns Функция-генератор URI
 *
 * @example
 * ```ts
 * const userPosts = generateLink<userId>('/api/v2/users/:userId/posts')
 *
 * const url = userPosts({ userId: '123' })
 * // url: '/api/v2/users/123/posts'
 * ```
 *
 * @example
 * ```ts
 * const postComments = generateLink('/api/v2/posts/:postId/comments/:commentId')
 *
 * postComments({ postId: '1', commentId: '2' })
 * ```
 */
export const generateLink = <T extends string | number>(link: T) => {
	/**
	 * @param params - Объект с параметрами для подстановки
	 * @returns Сформированный URI
	 */
	return (params: ParamsObject<`${T}`>): ApiV2Path => {
		let result = String(link)

		for (const [key, value] of Object.entries(params)) {
			result = result.replaceAll(`:${key}`, encodeURIComponent(String(value)))
			result = result.replace(new RegExp(`:${key}`, 'g'), String(value))
		}

		return result as ApiV2Path
	}
}
