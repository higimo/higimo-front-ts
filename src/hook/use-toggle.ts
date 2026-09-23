import { Dispatch, useCallback, useState } from 'preact/hooks'
import { SetStateAction } from 'preact/compat'

export function useToggle(
	defaultValue?: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
	const [value, setValue] = useState(!!defaultValue)

	const toggle = useCallback(() => {
		setValue(x => !x)
	}, [])

	return [value, toggle, setValue]
}
