import { useState, useCallback } from 'preact/hooks';

// сократит код, а сеттер удобнее передавать с одинарными скобками в параметр, не надо функцию городить
/**
 * @example
 * ```tsx
 * const [isChooseVisualizator, setVizualizator] = useSwitcher<ValueOf<typeof VISUALIZATOR_MAP>>(VISUALIZATOR_MAP.CARD)
 *
 * <Switcher
 *     options={[
 *         { title: 'Все', active: isChooseVisitedMode(VISITED_MAP.INIT), onClick: setVisitedMode(VISITED_MAP.INIT), },
 *         { title: 'Только посещённые', active: isChooseVisitedMode(VISITED_MAP.VISITED), onClick: setVisitedMode(VISITED_MAP.VISITED), },
 *         { title: 'Только непосещённые', active: isChooseVisitedMode(VISITED_MAP.WANTED), onClick: setVisitedMode(VISITED_MAP.WANTED), },
 *     ]}
 * />
 */
export const useSwitcher = <T extends Object>(initValue?: T): [(value: T) => boolean, (value: T) => () => void] => {
	const [state, setState] = useState<T | undefined>(initValue);

	const isChoosed = useCallback((value: T) => value === state, [state]);
	const setChoose = useCallback((value: T) => () => setState(value), [setState]);

	return [isChoosed, setChoose];
};
