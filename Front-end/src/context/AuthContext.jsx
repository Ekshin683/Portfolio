import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const getStoredToken = () => sessionStorage.getItem('adminToken');
    const [token, setToken] = useState(getStoredToken());
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getStoredToken()));

    const login = (newToken) => {
        sessionStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
    };

    // Clear authentication (called after each CRUD operation)
    const clearAuth = () => {
        sessionStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
