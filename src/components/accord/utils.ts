// TODO: [BACKEND] Перенести теги на бекенд
export const filterKey = {
	new: 'new',
	pop: 'pop',
	liric: 'liric',
	scream: 'scream',
	korol: 'korol',
	funny: 'funny',
	rap: 'rap',
	old: 'old',
	ussr: 'ussr',
	lacky: 'lacky',
	newschool: 'newschool',
	bard: 'bard',
	noList: 'noList',
	manyList: 'manyList',
} as const

const korol = [25, 26, 27, 28, 29, 30, 31, 32, 33, 125, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 161, 169, 188, 190, 214, 235, 239, 240, 241, 242, 244, 265] as const
const liric = [2, 3, 35, 36, 37, 49, 65, 66, 67, 70, 71, 76, 85, 86, 92, 93, 94, 100, 102, 114, 115, 122, 140, 141, 151, 154, 171, 173, 175, 177, 178, 184, 191, 197, 218, 219, 222, 226, 238, 251, 260] as const
const scream = [2, 4, 11, 14, 18, 19, 20, 21, 22, 23, 35, 37, 70, 76, 112, 114, 115, 141, 145, 155, 163, 166, 170, 171, 175, 176, 179, 196, 197, 198, 210, 215, 224, 225, 226, 229, 232, 233, 234, 236, 253, 260, 261, 262, 263, 264, 266] as const
const funny = [34, 105, 123, 142, 143, 144, 146, 167, 179, 181, 197, 198, 223, 245, 246, 268] as const
const rap = [2, 4, 5, 6, 7, 8, 9, 122, 153, 179, 182, 183, 189, 211, 271] as const
const old = [2, 12, 24, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 70, 76, 83, 94, 112, 185, 186, 187, 266] as const
const ussr = [13, 17, 24, 35, 36, 37, 83, 103, 126, 160, 219, 220, 237, 247, 266, 269, 270] as const
const lacky = [1, 2, 10, 11, 12, 24, 35, 37, 49, 65, 70, 73, 74, 76, 77, 79, 83, 84, 88, 89, 95, 102, 107, 114, 115, 171, 172, 175, 179, 186, 187, 189, 197, 203, 210, 220, 222, 224, 225, 233, 253, 266, 270] as const
const newschool = [106, 108, 109, 110, 114, 115, 116, 117, 119, 120, 121, 147, 148, 149, 150, 155, 163, 166, 171, 175, 176, 179, 199, 200, 201, 202, 204, 205, 206, 207, 208, 210, 216, 221, 222, 225, 233, 234, 248, 249, 250, 254, 255, 256, 257, 258, 259] as const
const bard = [15, 16, 184] as const

export const filterMapping =  {
	[filterKey.new]: item => item.isNew,
	[filterKey.pop]: item => item.isMostView,
	[filterKey.liric]: item => liric.includes(item.id),
	[filterKey.scream]: item => scream.includes(item.id),
	[filterKey.korol]: item => korol.includes(item.id),
	[filterKey.funny]: item => funny.includes(item.id),
	[filterKey.rap]: item => rap.includes(item.id),
	[filterKey.old]: item => old.includes(item.id),
	[filterKey.ussr]: item => ussr.includes(item.id),
	[filterKey.lacky]: item => lacky.includes(item.id),
	[filterKey.newschool]: item => newschool.includes(item.id),
	[filterKey.bard]: item => bard.includes(item.id),
	[filterKey.noList]: (item) => {
		return Object.keys(filterKey)
		.map(key => filterKey[key])
		.filter(i => ![filterKey.noList, filterKey.manyList].includes(i))
		.reduce((acc, key) => acc && !filterMapping[key](item), true)
	},
	[filterKey.manyList]: item => {
		const count = Object.keys(filterKey)
		.map(key => filterKey[key])
		.filter(i => ![filterKey.noList, filterKey.manyList].includes(i))
		.reduce((acc, key) => acc + (filterMapping[key](item) && 1), 0)
		return count > 2
	},
	'': () => true,
}

export const median = (arr: number[]): number => {
	const mid = Math.floor(arr.length / 2)
	const nums = arr.concat().sort((a, b) => a - b)
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}
