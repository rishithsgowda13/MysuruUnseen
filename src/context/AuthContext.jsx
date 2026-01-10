import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('userName');
        const storedRole = localStorage.getItem('role');
        const storedEmail = localStorage.getItem('userEmail');

        if (storedUser) {
            setUser({
                name: storedUser,
                role: storedRole,
                email: storedEmail
            });
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userName', userData.name);
        if (userData.role) localStorage.setItem('role', userData.role);
        if (userData.email) localStorage.setItem('userEmail', userData.email);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        // Clear other potential auth items if any
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
