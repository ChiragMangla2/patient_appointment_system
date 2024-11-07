"use client";
import Image from "next/image";
import close from "../public/close.svg";
import { FaSearch } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calender from "../public/calender.svg";
import axios from "axios";

const ConfirmAppointment = ({setIsOpen,isOpen,confirmPatientData,update,setUpdate}) => {

    const handleSubmit = async () => {
        if(confirmPatientData){
            const result = await axios.put('/api/dashboard/status',{appointmentId:confirmPatientData?._id,status:'confirm'});
            setIsOpen(false);
            setUpdate(!update);
        }
    }

    return (
        <div className="w-[640px] h-[648px] pt-10 px-10 pb-12 flex flex-col gap-10 otp popup">

            {/* heading */}
            <div className="heading flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className='text-xl lg:text-2xl font-bold'>
                        Confirm Appointment
                    </div>
                    <div className="cancel p-2 cursor-pointer" onClick={() => {
                        setIsOpen(!isOpen)
                        }}>
                        <Image src={close} alt="close" />
                    </div>
                </div>
                <div className='text-sm lg:text-base font-medium text-color'>
                    Please fill in the following details to schedule
                </div>
            </div>

            {/* fields */}
            <div className="flex flex-col gap-6">
                {/* doctor */}
                <div className="dr text-base flex flex-col gap-y-4">
                    <label htmlFor="drname">Doctor</label>
                    <div className="col1 appo-sch px-4 text-xl flex items-center gap-x-4">
                        <FaSearch />
                        <span className="col1 py-4 w-full outline-none">{confirmPatientData?.drname}</span>
                    </div>
                </div>

                {/* reason for appointment */}
                <div className="dr text-base flex flex-col gap-y-4">
                    <label htmlFor="drname">Reason for appointment</label>
                    <textarea className="col1 appo-sch p-4 text-base" style={{ resize: 'none', width: '100%', height: '100px' }} placeholder="ex: Annual montly check-up" value={confirmPatientData?.reasonForApp} readOnly={true} />
                </div>

                {/* appointment date */}
                <div className="flex flex-col">
                    <label htmlFor="app-date" className='text-color text-base'>
                        Expected appointment date
                    </label>
                    <div className="flex gap-x-4 bg px-2 w-full border-white/50">
                        <Image src={calender} alt="img" />
                        <DatePicker
                            selected={confirmPatientData?.selectedDate}
                            placeholderText="Select your appointment date"
                            id="app-date"
                            className="bg px-2 py-4 w-[30vw] outline-none"
                            readOnly={true}
                        />
                    </div>
                </div>

                <div>
                    <button className='login-btn py-[8px] px-[10px] w-full rounded-md font-bold text-lg lg:text-xl'
                    onClick={handleSubmit}
                    >Confirm appointment</button>
                </div>

            </div>
        </div>
    )
}

export default ConfirmAppointment