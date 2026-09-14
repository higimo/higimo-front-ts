
export const median = (arr: number[]): number => {
	const mid = Math.floor(arr.length / 2);
	const nums = arr.concat().sort((a, b) => a - b);
	// @ts-ignore
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
