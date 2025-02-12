'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BeatLoader from 'react-spinners/BeatLoader';

export default function VerifyOTP() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Loading state


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const storedEmail = localStorage.getItem("forgotPasswordEmail"); // geting the email address from the forgot password page

        if (!storedEmail) {
            console.error("No email found. Please go back to the forgot-password page.");
            router.push("/forgot-password");
            return;
        }

        try {
            setLoading(true); // Start loading
            const response = await axios.post('https://myapp-backend-production.up.railway.app/api/auth/verify-otp', {
                email: storedEmail,
                otp
            });
            // const email = localStorage.getItem('email', email) // taking data from the local storage
            setMessage(response.data.message);
            // Redirect to reset password page after successful verification
            router.push('/reset-password');
        } catch (error) {
            setError(error.response?.data?.message || 'OTP verification failed.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
                <form onSubmit={handleSubmit}>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div> */}
                    <div className="mb-4">
                        <label className="block text-gray-700">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button type="submit" className=" mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        {
                            loading ? <BeatLoader color='#fff' /> : "Verify OTP"
                        }
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
