import { createContext, FunctionComponent } from 'preact'

import { useContext, useState } from 'preact/hooks'

interface IGlobalContext {
	isNotFound: boolean
	toggleNotFound: (value: boolean) => void
}

const defaultState = {
	isNotFound: false,
	toggleNotFound: () => false
}

const Global = createContext<IGlobalContext>(defaultState)

export const useGlobalContext = () => {
	const {
		isNotFound,
		toggleNotFound
	} = useContext(Global)
	return {
		isNotFound,
		toggleNotFound
	}
}

export const GlobalProvider: FunctionComponent = ({ children }) => {
	const [isNotFound, toggleNotFound] = useState<boolean>(false)

	return (
		<Global.Provider value={{ isNotFound, toggleNotFound }}>
			{children}
		</Global.Provider>
	)
}
