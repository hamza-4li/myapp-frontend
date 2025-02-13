'use client';
import Navbar from '@/components/navBar';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");  // Redirect to dashboard if user is logged in
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">AuthApp</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          A secure and seamless authentication experience for all your applications. Login, sign up, and manage your account effortlessly.
        </p>
        <Link href="/signup">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>
      {/* Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Features</h2>
          <p className="text-gray-600 mb-12">
            Discover why AuthApp is the best choice for secure and user-friendly authentication.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                We ensure your data is safe with advanced security protocols.
              </p>
            </div>
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Easy Integration</h3>
              <p className="text-gray-600">
                Integrate our authentication system seamlessly with your applications.
              </p>
            </div>
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">User-Friendly</h3>
              <p className="text-gray-600">
                A smooth and intuitive interface for a better user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} AuthApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
