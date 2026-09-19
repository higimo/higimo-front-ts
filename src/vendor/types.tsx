export type VkResponseError = {
	error: {
		error_code: number
		error_msg: string
		request_params: Record<string, unknown>
	}
}

export type VkResponseData<T> = {
	response: T
}

export type VkResponse<T> = VkResponseData<T> | VkResponseError
