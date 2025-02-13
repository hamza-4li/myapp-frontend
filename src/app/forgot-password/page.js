'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import BeatLoader from 'react-spinners/BeatLoader';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (user) {
            router.push('/dashboard'); // Redirect to dashboard if logged in
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            setLoading(true); // Start loading
            const response = await axios.post('https://myapp-backend-production.up.railway.app/api/auth/forgot-password', { email });
            setMessage(response.data.message); // Redirect to OTP verification page
            if (response.status === 200) {
                console.log('setting mail', email);
                localStorage.setItem("forgotPasswordEmail", email);
                router.push('/verify-otp');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button type="submit" className=" mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        {
                            loading ? <BeatLoader color='#fff' /> : "Send OTP"
                        }
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
