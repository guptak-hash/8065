// import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();

    const handleLogin = async (formData) => {
        try {
            await login(formData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <AuthForm onLogin={handleLogin} />
        </div>
    );
};

export default Login;