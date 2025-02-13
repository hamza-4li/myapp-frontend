"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");  // Redirect if token is missing
                return;
            }
            try {
                setLoading(true); // Start loading
                const response = await axios.get("https://myapp-backend-production.up.railway.app/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                localStorage.removeItem("token");  // Clear invalid token
                router.push("/login");  // Redirect if token is invalid
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [router]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600">Welcome, {user?.fullname}!</h2>
                <p className="mt-4 text-center text-gray-700">Email: {user?.email}</p>
                {/* Logout Button */}
                <button
                    onClick={() => {
                        localStorage.removeItem("token");  // Clear token
                        localStorage.removeItem("forgotPasswordEmail");  // Clear stored email
                        router.push("/login");  // Redirect to login
                    }}
                    className="w-full mt-6 bg-red-500 text-white py-2 px-4 rounded-xl shadow-md hover:bg-red-600 transition duration-200">
                    Log Out
                </button>
            </div>
        </div>
    );
}
