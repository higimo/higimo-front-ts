export const convertPathToUrl = (path: string): string[] => {
	const parts = path.split('/').filter(Boolean);
	return parts.reduce(
		(acc, part) => acc.concat(`${acc[acc.length - 1]}/${part}/`.replace('//', '/')),
		['/']
	);
};
