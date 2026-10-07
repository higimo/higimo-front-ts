import { Brand, UnixTime, YearNumber } from 'utils.type'

type NasheId = Brand<number, 'NasheId'>

export type NasheType = {
	id: NasheId
	name: string
	// TODO: [LIGHT] точно такой тип?
	time: UnixTime
	scene: number
	visit: number,
	year: YearNumber
}
