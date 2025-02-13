'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import BeatLoader from 'react-spinners/BeatLoader';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Loading state

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const storedEmail = localStorage.getItem("forgotPasswordEmail"); // Geting the email from the forgot password page

        if (!storedEmail) {
            console.error("No email found. Please go back to the forgot-password page.");
            router.push("/forgot-password");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true); // Start loading
            const response = await axios.post('https://myapp-backend-production.up.railway.app/api/auth/reset-password', {
                email: storedEmail,
                newPassword
            });
            setMessage(response.data.message);
            localStorage.removeItem("forgotPasswordEmail"); // Clear the email from localStorage after password reset
            router.push('/login');// Redirect to login page after successful password reset
        } catch (error) {
            setError(error.response?.data?.message || 'Password reset failed.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </span>
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </span>
                    </div>
                    <button type="submit" className=" mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        {
                            loading ? <BeatLoader color='#fff' /> : "Reset Password"
                        }
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
