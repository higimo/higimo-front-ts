export const copyToClipboard = (str) => {
	const element = document.createElement('input')
	element.style.position = 'absolute'
	element.style.left = '-9999px'
	element.value = str
	document.body.appendChild(element)
	element.select()
	document.execCommand('copy')
	document.body.removeChild(element)
}