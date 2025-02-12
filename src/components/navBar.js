'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">AuthApp</div>
            <div>
                <Link href="/login">
                    <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-xl mr-4 hover:bg-blue-600 hover:text-white transition">
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                        Sign Up
                    </button>
                </Link>
            </div>
        </nav>
    );
}