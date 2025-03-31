import { createContext } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { VkSessionType } from '../pages/vk/types.js';
import { useEffect } from 'preact/hooks';

export const useVKInit = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (window.VK) {
			setIsLoaded(true);
			return;
		}

		window.vkAsyncInit = () => {
			try {
				VK.init({
					apiId: 6661731,
					apiVersion: 5.199,
				});
				setIsLoaded(true);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("VK init failed"));
			}
		};

		const script = document.createElement('script');
		script.src = 'https://vk.com/js/api/openapi.js?169';
		script.async = true;
		script.onerror = () => setError(new Error('Failed to load VK API script'));

		const container = document.getElementById('vk_api_transport') || document.body;
		container.appendChild(script);

		return () => {
			if (script.parentNode) {
				script.remove();
			}
		};
	}, []);

	return { isLoaded, error };
};

declare global {
	interface Window {
		vkAsyncInit?: () => void;
	}
}

interface IVkContext {
    isVkLogin: boolean;
    session: VkSessionType;
    fetchLogin: () => void;
}

const defaultState: IVkContext = {
    isVkLogin: false,
	// @ts-ignore
	session: {},
	fetchLogin: () => {}
};

export const VkContext = createContext<IVkContext>(defaultState);

export const VkContextProvider = (props) => {
	const [isVkLogin, setIsVkLogin] = useState<boolean>(false);
	const [session, setSession] = useState<VkSessionType>(null);

	const { isLoaded, error } = useVKInit()
	
	const handleAuth = useCallback(({ status, session, ...other }) => {
		setIsVkLogin(status === 'connected')
		setSession(session)
	}, [setIsVkLogin, setSession])

	const fetchLogin = useCallback(() => {
		if (isLoaded) {
			VK.Auth.login(handleAuth, 4)
		}
		if (error) {
			console.error(error)
		}
	}, [handleAuth, isLoaded, error])

	return (
		<VkContext.Provider value={{ isVkLogin, session, fetchLogin }}>
			<div id="vk_api_transport"></div>
			{props.children}
		</VkContext.Provider>
	);
}