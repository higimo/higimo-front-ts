import { useState, useCallback } from 'preact/hooks';

type UseForceUpdatePropsType = () => () => void;
export const useForceUpdate: UseForceUpdatePropsType = () => {
	const [, setA] = useState(false);
	const makeUpdate = useCallback(() => setA(pState => !pState), [setA]);
	return makeUpdate;
};
