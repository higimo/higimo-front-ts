export const getYesterday = (date: Date) => {
	const d = new Date(date);
	d.setDate(d.getDate() - 1);
	d.setUTCHours(0, 0, 0, 0);
	return d;
}
