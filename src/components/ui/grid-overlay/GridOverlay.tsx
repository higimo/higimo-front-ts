import { useEffect, useState } from 'preact/hooks'

import './style.css'

export const GridOverlay = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isModifier = event.ctrlKey || event.metaKey
			if (!isModifier || event.key.toLowerCase() !== 'g') return

			event.preventDefault()
			setIsVisible((prev) => !prev)
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	if (!isVisible) {
		return null
	}

	return (
		<div class="grid-overlay">
			<div class="grid-overlay-row" />
		</div>
	)
}
