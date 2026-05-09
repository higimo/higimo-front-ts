import { Brand } from "utils.type";

type PetProjectId = Brand<number, 'PetProjectId'>

export type PetProjectType = {
	id: PetProjectId
	name: string
	description: string
	priority: number
};
