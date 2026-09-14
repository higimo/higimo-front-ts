export const copyToClipboard = (str: string) => {
	navigator.clipboard.writeText(str)
		.then(() => {
			console.log('Скопировано')
		})
		.catch(error => {
			console.error(`Текст не скопирован ${error}`)
		})
}
