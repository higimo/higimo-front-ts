import { VkResponceError } from 'vendor/vk-api'

export const printVkError = (response: VkResponceError) => {
	console.error(response)
	return 'SEE CONSOLE'
	// return '' +
	// 	`<p>[${response.error.error_code}] ${response.error.error_msg}</p>` +
	// 	`<p>request params:</p>` +
	// 	`<pre>${JSON.stringify(response.error.request_params, null, '\t')}</pre>`
}
