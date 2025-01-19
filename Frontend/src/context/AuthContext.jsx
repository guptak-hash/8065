import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        user: null,
        loading: true // Added loading state
    });

    // Fetch user details
    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/auth', {
                headers: { 'x-auth-token': authState.token }
            });
            setAuthState({ ...authState, user: res.data, loading: false });
        } catch (err) {
            console.error(err.response ? err.response.data : 'Failed to fetch user data');
            if (err.response && err.response.status === 401) {
                logout(); // Clear token if unauthorized
            } else {
                setAuthState({ ...authState, loading: false });
            }
        }
    };

    useEffect(() => {
        if (authState.token) {
            axios.defaults.headers.common['x-auth-token'] = authState.token;
            fetchUser();
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            setAuthState({ ...authState, loading: false });
        }
    }, [authState.token]);

    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setAuthState({ ...authState, token: res.data.token, loading: true });
            await fetchUser(); // Fetch user details after successful login
            return res.data;
        } catch (err) {
            console.error(err.response ? err.response.data : 'Login failed');
            throw err;
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            return res.data;
        } catch (err) {
            console.error(err.response ? err.response.data : 'Registration failed');
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({ token: null, user: null, loading: false });
    };

    return (
        <AuthContext.Provider value={{ authState, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};