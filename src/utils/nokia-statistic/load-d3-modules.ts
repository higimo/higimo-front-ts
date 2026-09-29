export const loadD3Modules = async () => {
	const [
		{ select, selectAll },
		{ scaleLinear, scaleBand, scaleOrdinal },
		{ axisLeft, axisBottom },
		{ stack },
		{ max },
		{ timeFormat },
	] = await Promise.all([
		import('d3-selection'),
		import('d3-scale'),
		import('d3-axis'),
		import('d3-shape'),
		import('d3-array'),
		import('d3-time-format'),
	])

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
	}
}
