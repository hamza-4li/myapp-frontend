"use client";
import { useState, useEffect } from "react";

const OTPVerification = ({ onResendOTP }) => {
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResendOTP = () => {
        setTimer(60);
        setCanResend(false);
        onResendOTP();
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <button
                onClick={handleResendOTP}
                disabled={!canResend}
                className={`px-4 py-2 text-white font-medium rounded-md transition ${canResend ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
            </button>
        </div>
    );
};

export default OTPVerification;
