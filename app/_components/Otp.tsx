"use client";
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { AiOutlineClose } from "react-icons/ai";
import toast from 'react-hot-toast';

// Define props for the component
interface OtpProps {
    setIsOpen: (isOpen: boolean) => void;
    handleOtpSubmit: (otp: string) => void;
}

export default function Otp({ setIsOpen, handleOtpSubmit }: OtpProps) {
    const [otp, setOtp] = useState<string>('');
    const [inputWidth, setInputWidth] = useState<string>('');

    useEffect(() => {
        setInputWidth(typeof window !== 'undefined' && window.innerWidth >= 1024 ? '80px' : '35px');

        return () => {
            setOtp('');
            setInputWidth('');
        };
    }, []);

    // Handle OTP submission
    function handleSubmit() {
        if (otp.length < 6) {
            toast.error("Enter OTP");
        } else {
            handleOtpSubmit(otp);
            setOtp('');
        }
    }

    return (
        <div className='otp w-[30rem] lg:w-[40rem] lg:h-[23rem] bg-red-500 rounded-lg border p-4 lg:p-10'>
            <div className="otp-heading lg:w-full h-10 flex items-center justify-between gap-x-16">
                <div className="text text-2xl font-extrabold">
                    Verify OTP
                </div>
                <button onClick={() => setIsOpen(false)}>
                    <AiOutlineClose className='w-6 h-6' />
                </button>
            </div>
            <div className='font-extrabold text-base'>
                Please enter the OTP sent to your registered mobile number.
            </div>

            <div className="h-20 my-4 flex justify-center items-center">
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className='m-2'></span>}
                    renderInput={(props) => (
                        <input
                            {...props}
                            className='text-white bg-stone-800 border-2 rounded-lg text-center gap-1 text-lg'
                            style={{ width: inputWidth, height: '50px' }}
                        />
                    )}
                />
            </div>
            <button className='login-btn w-full h-12 text-xl' onClick={handleSubmit}>Verify</button>
        </div>
    );
}
