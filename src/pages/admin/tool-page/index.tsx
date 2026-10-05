// TODO: [BACKEND] а как этим пользоваться, лол?
import { FunctionComponent } from 'preact'

import { useApiRequest } from 'hook/useApiRequest'
import { useCallback, useState } from 'preact/hooks'

import { AdminToolContent } from 'components/admin-tool/admin-tool-content'
import { Layout } from 'components/ui/layout/Layout'
import { FormValues, Sidebar } from 'components/admin-tool/sidebar'

import { parseJsonWithFallback } from 'utils/parse-json-with-fallback'

import { toast } from 'toast'

import './style.css'

export const ToolPage: FunctionComponent = () => {
	const [response, setResponse] = useState('')
	const { sendRequest } = useApiRequest()

	const handleSubmit = useCallback(async (values: FormValues) => {
		try {
			// TODO: [LIGHT] где-то в sendRequest есть хорошая функция такая же
			const parsedOptions = parseJsonWithFallback(values.options)

			const result = await sendRequest(values.method, values.uri, parsedOptions)
			setResponse(result)
		} catch (error) {
			toast.warning(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}, [sendRequest, setResponse])

	return (
		<Layout title="Tool" className="tool-page">
			<div className="tool-page__sidebar">
				<Sidebar
					onSubmit={handleSubmit}
				/>
			</div>
			<AdminToolContent
				response={response}
			/>
		</Layout>
	)
}
