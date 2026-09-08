// TODO: [BACKEND] а как этим пользоваться, лол?

import { FunctionComponent } from 'preact'

import { useApiRequest } from 'components/admin-tool/hook/useApiRequest'
import { useToolForm } from 'components/admin-tool/hook/useToolForm'
import { useCallback } from 'preact/hooks'

import { AdminToolContent } from 'components/admin-tool/admin-tool-content'
import { Sidebar } from 'components/admin-tool/sidebar'

import { parseJsonWithFallback } from 'components/admin-tool/utils/parseJsonWithFallback'

import './style.css'

export const ToolPage: FunctionComponent = () => {
	// TODO: [LIGHT] useApi и неавторизованных выкидывать
	const { formData, response, updateField, setResponse } = useToolForm()
	const { sendRequest } = useApiRequest()

	const handleSubmit = useCallback(async () => {
		const { method, uri, options: optionsStr } = formData

		const parsedOptions = parseJsonWithFallback(optionsStr)

		try {
			const result = await sendRequest(method, uri, parsedOptions)
			setResponse(result)
		} catch (error) {
			setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}, [formData, sendRequest, setResponse])

	return (
		<div className="tool-page">
			<Sidebar
				formData={formData}
				onFieldChange={updateField}
				onSubmit={handleSubmit}
			/>
			<AdminToolContent response={response} />
		</div>
	)
}
