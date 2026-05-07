import { Brand, Code } from "utils.type"

type YaMapId = Brand<number, 'YaMapId'>

export type YaMapType = {
	id: YaMapId
	name: string
	code: Code
	map: string
}
