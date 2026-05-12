import { useState, useCallback } from 'preact/hooks';

// сократит код, а сеттер удобнее передавать с одинарными скобками в параметр, не надо функцию городить
export const useSwitcher = <T extends Object>(initValue?: T): [(val: T) => boolean, (val: T) => () => void] => {
	const [state, setState] = useState<T | undefined>(initValue);

	const isChoosed = useCallback((val: T) => val === state, [state]);
	const setChoose = useCallback((val: T) => () => setState(val), [setState]);

	return [isChoosed, setChoose];
};
