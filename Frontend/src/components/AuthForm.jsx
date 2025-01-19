import React, { useState } from 'react';

const AuthForm = ({ onRegister, onLogin }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await onRegister(formData);
            } else {
                await onLogin(formData);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {isRegistering && (
                <div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                </div>
            )}
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </form>
    );
};

export default AuthForm;