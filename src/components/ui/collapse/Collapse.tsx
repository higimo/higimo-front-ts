import { ComponentChildren, FunctionComponent } from 'preact'

import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import cs from 'classnames'

import './style.css'

/**
 * На основе https://github.com/nkbt/react-collapse
 * @license MIT
 */

// Должно быть чуть больше длительности transition в css
const TRANSITION_FALLBACK_MS = 400

/**
 * Аргументы для `onRest` и `onWork`.
 */
export type CollapseCallbackArgs = {
	/** Флаг завершенности анимации открытости контейнера */
	isFullyOpened: boolean
	/** Флаг завершенности анимации закрытости контейнера */
	isFullyClosed: boolean
	/** Текущее целевое состояние, переданное родителем */
	isOpened: boolean
	/** Фактическая высота контейнера на момент вызова */
	containerHeight: number
	/** Целевая высота контента при открытии */
	contentHeight: number
}

/**
 * CSS-классы внутренних элементов
 */
type CollapseThemeType = {
	/** Класс внешнего контейнера */
	collapse?: string
	/** Класс контента */
	content?: string
}

type CollapsePropsType = {
	/** Управление состоянием `true` — раскрыт */
	isOpened: boolean
	/** Содержимое, которое отображается внутри сворачиваемой области. */
	children?: ComponentChildren
	/** Переопределение CSS-классов внутренних элементов. */
	theme?: CollapseThemeType
	/** Дополнительный CSS-класс, добавляемый к внешнему контейнеру. */
	className?: string
	/** Начальные inline-стили контейнера до первой анимации. */
	initialStyle?: {
		/** Начальная высота контейнера. Если не задана — вычисляется из `isOpened`. */
		height?: string | number
		/** Начальное значение CSS-свойства `overflow`. */
		overflow?: string
	}
	/**
	 * Коллбэк завершения анимации открытия/закрытия
	 *
	 * Например:
	 * * для отрисовки внутри тяжёлых графиков
	 * * для сбора факта раскрытия для аналитики
	 * * сохранить состояние раскрытия во внешнее хранилище (нпрмр, localStorage)
	 */
	onRest?: (args: CollapseCallbackArgs) => void
	/**
	 * Колбэк проигрывания анимации, вызывается на каждом шаге, пока не достигнет onRest
	 *
	 * Например:
	 * * показать скелетон внутри
	 */
	onWork?: (args: CollapseCallbackArgs) => void
}

const DEFAULT_THEME: Required<CollapseThemeType> = {
	collapse: 'collapse',
	content: 'collapse__content',
}

export const Collapse: FunctionComponent<CollapsePropsType> = ({
	isOpened,
	children,
	theme,
	className,
	initialStyle,
	onRest,
	onWork,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const onRestRef = useRef(onRest)
	const onWorkRef = useRef(onWork)

	onRestRef.current = onRest
	onWorkRef.current = onWork

	const mergedTheme = { ...DEFAULT_THEME, ...theme }

	const [height, setHeight] = useState<string | number>(
		initialStyle?.height ?? (isOpened ? 'auto' : 0),
	)

	// Вызываем коллбэки
	const notify = useCallback(
		(isFullyOpened: boolean, isFullyClosed: boolean) => {
			const container = containerRef.current
			const content = contentRef.current
			if (!container || !content) return

			const args: CollapseCallbackArgs = {
				isFullyOpened,
				isFullyClosed,
				isOpened,
				containerHeight: Math.floor(container.clientHeight),
				contentHeight: Math.floor(content.clientHeight),
			}

			if (isFullyOpened || isFullyClosed) {
				onRestRef.current?.(args)
			} else {
				onWorkRef.current?.(args)
			}
		},
		[isOpened],
	)

	useEffect(() => {
		const container = containerRef.current
		const content = contentRef.current
		if (!container || !content) {
			return undefined
		}

		const contentHeight = content.scrollHeight
		let ended = false

		const finish = (isFullyOpened: boolean, isFullyClosed: boolean) => {
			if (ended) {
				return
			}
			ended = true
			if (isFullyOpened) {
				setHeight('auto')
			}
			notify(isFullyOpened, isFullyClosed)
		}

		const handleTransitionEnd = (event: TransitionEvent) => {
			if (event.target !== container || event.propertyName !== 'height') {
				return
			}
			finish(isOpened, !isOpened)
		}

		container.addEventListener('transitionend', handleTransitionEnd)
		const fallbackId = window.setTimeout(
			() => finish(isOpened, !isOpened),
			TRANSITION_FALLBACK_MS,
		)

		if (isOpened) {
			if (height === 'auto') {
				finish(true, false)
			} else {
				notify(false, false)
				setHeight(contentHeight)
			}
		} else if (height === 0) {
			finish(false, true)
		} else {
			notify(false, false)

			if (height === 'auto') {
				// Сначала фиксируем текущую высоту, чтобы transition сработал
				setHeight(contentHeight)
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setHeight(0)
					})
				})
			} else {
				setHeight(0)
			}
		}

		return () => {
			container.removeEventListener('transitionend', handleTransitionEnd)
			window.clearTimeout(fallbackId)
		}
	}, [isOpened])

	return (
		<div
			ref={containerRef}
			className={cs(mergedTheme.collapse, className)}
			style={{
				...initialStyle,
				height: typeof height === 'number' ? `${height}px` : height,
				overflow: height === 'auto' ? 'initial' : 'hidden',
			}}
			aria-hidden={!isOpened}
		>
			<div ref={contentRef} className={mergedTheme.content}>
				{children}
			</div>
		</div>
	)
}
