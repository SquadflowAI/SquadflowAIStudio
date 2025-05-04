import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from "@/node_modules/next/navigation";
import { useDataContext } from './DataContext';

const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const authStatus = !!localStorage.getItem('token');

        setIsAuthenticated(authStatus);
        if (authStatus) {
            const userId = localStorage.getItem('userId');
            setUser({ userId: userId });
        }
        setLoading(false);
    }, []);

    const authProviderLogin = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        setUser({ userId: userId });
        setIsAuthenticated(true);

        router.push('/dashboard');
    };

    const authProviderLogout = () => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('userId');
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            authProviderLogin,
            authProviderLogout,
            isAuthenticated,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
