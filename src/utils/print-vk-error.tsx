import { VkResponceError } from './VkApi';

export const printVkError = (response: VkResponceError) => {
	return '' +
		`<p>[${response.error.error_code}] ${response.error.error_msg}</p>` +
		`<p>request params:</p>` +
		`<pre>${JSON.stringify(response.error.request_params, null, '\t')}</pre>`;
};
