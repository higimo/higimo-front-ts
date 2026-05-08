import { useToast } from '.'

function SomeComponent() {
	const { showToast } = useToast()

	const handleClick = () => {
		showToast('Сообщение успешно сохранено!')
	}

	return (
		<button onClick={handleClick}>
			Сохранить
		</button>
	)
}
