export const formatResponse = (responseText: string): string => {
	try {
		const jsonObj = JSON.parse(responseText);
		return JSON.stringify(jsonObj.data, null, '\t');
	} catch {
		return responseText;
	}
};
