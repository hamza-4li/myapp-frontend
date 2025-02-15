"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/passwordInput";
import { validateEmail, validatePassword } from "@/utils/validation";
import BeatLoader from 'react-spinners/BeatLoader';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");  // Redirect to dashboard if already logged in
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateEmail(formData.email)) {
            validationErrors.email = "Invalid email format.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true); // Start loading
            const response = await axios.post("https://myapp-backend-production.up.railway.app/api/auth/login", formData);
            localStorage.setItem("token", response.data.token); // Store JWT token in localStorage
            router.push("/dashboard"); // Redirect to dashboard on successful login
        } catch (error) {
            setApiError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Log In</h2>
                {apiError && (
                    <p className="text-red-500 text-center mb-4">{apiError}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    {/* Password with Eye Toggle */}
                    <PasswordInput
                        label="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    {/* Submit Button */}
                    <button type="submit" className=" mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        {
                            loading ? <BeatLoader color='#fff' /> : "Log In"
                        }
                    </button>
                </form>
                {/* Redirect to Signup */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
                {/* Forgot Password Button */}
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => router.push('/forgot-password')}
                        className="text-blue-500 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>
        </div>
    );
}
