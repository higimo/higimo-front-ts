
export const loadD3Modules = async () => {
	const {
		select, selectAll, scaleLinear, scaleBand, scaleOrdinal, axisLeft, axisBottom, stack, max, timeFormat
	} = await import('d3');

	return {
		select,
		selectAll,
		scaleLinear,
		scaleBand,
		scaleOrdinal,
		axisLeft,
		axisBottom,
		stack,
		max,
		timeFormat
	};
};
