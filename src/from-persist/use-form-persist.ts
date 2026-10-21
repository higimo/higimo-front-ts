import { FieldValues, UseFormReturn, useFormState } from 'react-hook-form'

import { useRef, useEffect } from 'preact/hooks'

import { saveDraft, removeDraft } from 'from-persist/store'

import { DEBOUNCE_MS } from 'from-persist/config'

export function useFormPersist<T extends FieldValues>(
	url: string,
	formMethods: UseFormReturn<T>
): void {
	const timerRef = useRef<number | null>(null)

	const { isSubmitSuccessful } = useFormState({
		control: formMethods.control,
	})

	useEffect(() => {
		const flush = () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
				timerRef.current = null
				saveDraft(url, formMethods.getValues())
			}
		}

		const { unsubscribe } = formMethods.watch((values) => {
			if (timerRef.current !== null) clearTimeout(timerRef.current)
			timerRef.current = window.setTimeout(() => {
				timerRef.current = null
				saveDraft(url, values)
			}, DEBOUNCE_MS)
		})

		window.addEventListener('pagehide', flush)

		return () => {
			unsubscribe()
			window.removeEventListener('pagehide', flush)
			flush()
		}
	}, [url, formMethods])

	const prevRef = useRef(isSubmitSuccessful)
	useEffect(() => {
		const wasSuccessful = prevRef.current
		prevRef.current = isSubmitSuccessful

		if (!isSubmitSuccessful || wasSuccessful) return

		if (timerRef.current !== null) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
		removeDraft(url)
	}, [isSubmitSuccessful, url])
}
