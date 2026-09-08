import { useJsonApi } from 'hook/fetch/use-json-api';
import { useState, useEffect } from 'preact/hooks';
import { HigimoMapPoint, YaMapPolygon } from '../data/types';

export type MoscowWalkaroundStateDataType = {
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
	moscowPovPoints: HigimoMapPoint[]
}

type LoadingState = { isLoading: true, data: null } | { isLoading: false, data: MoscowWalkaroundStateDataType }

export const useLoadMoscowWalkaround = (): LoadingState => {
	const [state, setState] = useState<LoadingState>({ isLoading: true, data: null });

	const moscowPovPoints = useJsonApi<HigimoMapPoint[]>('/json/tourism/moscow-pov-points.json');
	const stateYear2021 = useJsonApi<YaMapPolygon[]>('/json/tourism/walk-moscow-2021.json');
	const stateYear2024 = useJsonApi<YaMapPolygon[]>('/json/tourism/walk-moscow-2024.json');

	useEffect(() => {
		const isLoading = moscowPovPoints === null || stateYear2021 === null || stateYear2024 === null;
		if (isLoading) {
			if (!state.isLoading) {
				setState({
					isLoading: true,
					data: null
				});
			}
			return;
		}
		setState({
			isLoading: false,
			data: {
				moscowPovPoints,
				stateYear2021,
				stateYear2024,
			}
		});
	}, [moscowPovPoints, stateYear2021, stateYear2024]);

	return state;
};
