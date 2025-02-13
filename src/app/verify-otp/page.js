'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BeatLoader from 'react-spinners/BeatLoader';

export default function VerifyOTP() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30); // Initial timer duration (30 sec)
    const [showResend, setShowResend] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Loading state
    const storedEmail = localStorage.getItem("forgotPasswordEmail"); // geting the email address from the forgot password page
    const mail = storedEmail;
    // Resend OTP functionality
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setShowResend(true); // Show Resend OTP button when timer hits 0
        }
        // ✅ Ensure `localStorage` is accessed only in the browser
        if (!mail && typeof window !== "undefined") {
            mail = localStorage.getItem("storedEmail");
        }

        if (!mail) {
            console.error("No email found in localStorage.");
            return;
        }
    }, [timer]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');



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

    // Function to handle OTP Resend
    const handleResendOTP = async () => {
        setShowResend(false); // Hide the resend button
        setTimer(30); // Reset the timer

        try {
            await axios.post("https://myapp-backend-production.up.railway.app/api/auth/forgot-password", { email: mail });
            console.log("OTP Resent Successfully");
        } catch (error) {
            console.error("Error resending OTP:", error);
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

                    {/* Resend Password Button */}
                    {showResend ? (
                        <button
                            onClick={handleResendOTP}
                            className="mt-4 text-blue-500 underline"
                        >
                            Resend OTP
                        </button>
                    ) : (
                        <p className="mt-4 text-gray-600">Resend OTP in {timer}s</p>
                    )}
                </form>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
