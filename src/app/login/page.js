"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/passwordInput";
import { validateEmail, validatePassword } from "@/utils/validation";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");  // Redirect to dashboard if already logged in
        }
    }, [router]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateEmail(formData.email)) {
            validationErrors.email = "Invalid email format.";
        }

        // if (!validatePassword(formData.password)) {
        //   validationErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
        // }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post("https://myapp-backend-production.up.railway.app/api/auth/login", formData);

            // Store JWT token in localStorage
            localStorage.setItem("token", response.data.token);

            // Redirect to dashboard on successful login
            router.push("/dashboard");
        } catch (error) {
            setApiError(error.response?.data?.message || "Login failed. Please try again.");
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        Log In
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
