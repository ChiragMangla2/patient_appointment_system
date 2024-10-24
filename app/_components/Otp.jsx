"use client";
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { AiOutlineClose } from "react-icons/ai";

export default function Otp({ setIsOpen,handleOtpSubmit }) {
    const [otp, setOtp] = useState('');

    function handleSubmit(){
        if(otp.length<6){
            alert("Enter otp")
        }else{
            handleOtpSubmit(otp);
        }
    }

    return (
        <div className='otp w-[40rem] h-[23rem] rounded-lg border p-10'>
            <div className="otp-heading w-full h-10 flex items-center justify-between gap-x-16">
                <div className="text text-2xl font-extrabold">
                    Verify OTP
                </div>
                <button onClick={() => setIsOpen(false)}><AiOutlineClose className='w-6 h-6' /></button>
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
                    renderInput={(props) => <input {...props}className='text-white bg-stone-800 border-2 rounded-lg text-center gap-1 text-lg' style={{ width: '80px', height: '50px' }} />}
                />
            </div>
            <button className='login-btn w-full h-12 text-xl' onClick={handleSubmit}>Verify</button>
        </div>
    );
}