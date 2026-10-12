import { getRandom } from 'utils/get-random'

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[getRandom(16)]
	}
	return color
}
