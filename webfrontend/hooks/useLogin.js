"use client"
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios, { AxiosResponse } from "axios";
// import { useRouter } from 'next/router'; // Import the useRouter hook
import { useRouter } from 'next/navigation';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const router = useRouter(); // Initialize the router

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
            const json = response.data;

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);

            router.push('/');
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    }

    return { login, isLoading, error}
}