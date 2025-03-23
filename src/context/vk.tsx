import { createContext } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { VkSessionType } from '../pages/vk/types.js';

// TODO lazyloading
import '../vendor/openapi.js'

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
	
	const handleAuth = useCallback(({ status, session, ...other }) => {
		setIsVkLogin(status === 'connected')
		setSession(session)
	}, [setIsVkLogin, setSession])

	const fetchLogin = useCallback(() => {
		VK.init({
			apiId: 6661731,
			apiVersion: 5.199,
		})
		VK.Auth.login(handleAuth, 4)
	}, [handleAuth])

	return (
		<VkContext.Provider value={{ isVkLogin, session, fetchLogin }}>
			{props.children}
		</VkContext.Provider>
	);
}