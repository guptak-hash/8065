import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Ensure this function is named correctly and exported properly
export const useAuth = () => {
    return useContext(AuthContext);
};