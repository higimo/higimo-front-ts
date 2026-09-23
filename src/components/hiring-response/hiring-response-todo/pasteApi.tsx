import { PasteApiType } from 'api-types/paste.types';
import { API_ROUTE } from 'dic/API_ROUTE';
import { sendRequest } from 'utils/api/send-request';

class PasteApiService {
	async getByKey(key: PasteApiType['key']): Promise<PasteApiType[] | null> {
		try {
			const data = await sendRequest<PasteApiType[]>(API_ROUTE.pasteSingle({ id: key }));
			return data.data;
		} catch (error) {
			// TODO: [MIDDLE] что-то получше бы предоставить, тост хотя бы
			console.error(error);
			return null;
		}
	}

	async create(values: Partial<Omit<PasteApiType, 'id'>>): Promise<PasteApiType | null> {
		try {
			const data = await sendRequest<PasteApiType>(API_ROUTE.paste, {
				method: 'POST',
				values: values
			});
			return data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async edit(values: Partial<PasteApiType>): Promise<PasteApiType | null> {
		try {
			const data = await sendRequest<PasteApiType>(API_ROUTE.pasteSingle({ id: values.id?.toString() || '' }), {
				method: 'PUT',
				values: values
			});
			return data.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
export const pasteApi = new PasteApiService();
