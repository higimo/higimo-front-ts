import { VkSessionType } from 'pages/vk/types'

import { useCallback, useState } from 'preact/hooks'
import { useEffect } from 'preact/hooks'

import { createContext, FunctionComponent } from 'preact'

declare global {
	interface Window {
		vkAsyncInit?: () => void
	}
}

interface IVkContext {
	isVkLogin: boolean
	session: VkSessionType|null
	fetchLogin: () => void
}

const DEFAULT_SESSION: VkSessionType|null = null
const DEFAULT_VK_STATE = {
	isVkLogin: false,
	session: DEFAULT_SESSION,
	fetchLogin: () => {}
}

export const VkContext = createContext<IVkContext>(DEFAULT_VK_STATE)

type VkStateType = {
	isLoaded: boolean,
	error: null | Error,
}

export const useVKInit = () => {
	const [state, setState] = useState<VkStateType>({
		isLoaded: false,
		error: null,
	})

	useEffect(() => {
		if (window.VK) {
			setState(prev => ({ ...prev, isLoaded: true }))
			return undefined
		}

		window.vkAsyncInit = () => {
			try {
				VK.init({
					apiId: 6661731,
					apiVersion: 5.199,
				})
				setState(prev => ({ ...prev, isLoaded: true }))
			} catch (err) {
				setState(prev => ({
					...prev,
					error: err instanceof Error ? err : new Error('VK init failed')
				}))
			}
		}

		const script = document.createElement('script')
		script.src = 'https://vk.com/js/api/openapi.js?169'
		script.async = true
		script.onerror = () => setState(prev => ({
			...prev,
			error: new Error('Failed to load VK API script')
		}))

		const container = document.getElementById('vk_api_transport') || document.body
		container.appendChild(script)

		return () => {
			if (script.parentNode) {
				script.remove()
			}
			delete window.vkAsyncInit
		}
	}, [])

	return state
}

type HandleAuthPropsType = {
	status: 'connected' | string
	session: VkSessionType|null
}

export const VkContextProvider: FunctionComponent = (props) => {
	const [ isVkLogin, setIsVkLogin ] = useState<boolean>(false)
	const [ session, setSession ] = useState<VkSessionType|null>(DEFAULT_SESSION)
	const { isLoaded, error } = useVKInit()

	const handleAuth = useCallback(({ status, session }: HandleAuthPropsType) => {
		setIsVkLogin(status === 'connected')
		setSession(session)
	}, [])

	const fetchLogin = useCallback(() => {
		if (!isLoaded || isVkLogin) return

		VK.Auth.login(handleAuth, 4)
	}, [isLoaded, isVkLogin, handleAuth])

	useEffect(() => {
		if (error) {
			console.error('VK Init error:', error)
		}
	}, [error])

	return (
		<VkContext.Provider value={{ isVkLogin, session, fetchLogin }}>
			<div id="vk_api_transport"></div>
			{props.children}
		</VkContext.Provider>
	)
}
