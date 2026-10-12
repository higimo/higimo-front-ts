import { Positive } from 'utils.type'

export function asPositive(n: number): Positive {
	if (n <= 0) {
		throw new RangeError(`Expected positive number, got ${n}`)
	}
	return n as Positive
}
