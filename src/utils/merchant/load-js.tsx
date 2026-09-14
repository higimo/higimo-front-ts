// https://developer.tbank.ru/eacq/intro/developer/setup_js/
export async function loadJs(url: string) {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${url}"]`)) {
			resolve(null);
			return;
		}

		const element = document.createElement('script');
		element.src = url;
		element.type = 'text/javascript';
		element.async = true;
		// @ts-ignore
		element.onload = () => resolve();
		element.onerror = () => reject();

		document.body.appendChild(element);
	});
}
