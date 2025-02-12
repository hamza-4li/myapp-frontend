"use client";

import { BeatLoader } from 'react-spinners';
import { useState } from 'react';

export default function AnimatedButton({ text, onClick, isLoading = false, disabled = false }) {
    const [loading, setLoading] = useState(isLoading);

    // const handleClick = async () => {
    //     if (!disabled && !loading) {
    //         setLoading(true);
    //         await onClick();  // Execute the passed onClick function
    //         setLoading(false);
    //     }
    // };

    return (
        <button
            // onClick={handleClick}
            disabled={loading || disabled}
            className={`
                bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-md 
                hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
        >
            {loading ? <BeatLoader color="#ffffff" size={10} /> : text}
        </button>
    );
} 
