// import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { register } = useAuth();

    const handleRegister = async (formData) => {
        try {
            await register(formData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <AuthForm onRegister={handleRegister} />
        </div>
    );
};

export default Register;