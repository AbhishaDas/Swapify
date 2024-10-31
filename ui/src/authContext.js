import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user info if logged in
        axios.get('/api/user-info/', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("User not logged in or session expired");
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
