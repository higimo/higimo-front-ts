import { signal } from '@preact/signals'

export const isNotFound = signal<boolean>(false)

export const setIsNotFound = (value: boolean): void => {
	isNotFound.value = value
}
