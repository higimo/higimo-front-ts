export const extractWithDOMParser = (htmlString: string, selector: string) => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(htmlString, 'text/html')

	const elements = doc.querySelectorAll(selector)
	const outerHTML = Array.from(elements).map(el => el.outerHTML)
	const textContent = Array.from(elements).map(el => el.textContent)
	const innerHTML = Array.from(elements).map(el => el.innerHTML)

	elements.forEach(i => i.remove())

	return {
		outerHTML,
		textContent,
		innerHTML,
		resultHtml: doc.body.innerHTML
	}
}
