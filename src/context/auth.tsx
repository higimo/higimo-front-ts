import { createContext, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
}

const defAuth: AuthContextType = {
    isAuth: false,
    setIsAuth: () => {},
}

export const AuthContext = createContext<AuthContextType>(defAuth)

export const AuthProvider: FunctionComponent = ({children}) => {
	const [ isAuth, setIsAuth ] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
