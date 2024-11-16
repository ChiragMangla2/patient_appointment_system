"use client";
import Image from "next/image";
import close from "../public/close.svg";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Patient data type
interface Patient {
    _id: string;
    fname: string;
}

// props data type
interface CancelAppointmentPropsType {
    isCancelTabOpen: boolean;
    setIsCancelTabOpen: (isOpen: boolean) => void;
    update: boolean;
    setUpdate: (update: boolean) => void;
    confirmPatientData: {
        _id: string;
        patientId: Patient;
        drname: string;
        reasonForApp: string;
        note: string;
        selectedDate: Date;
        status: 'pending' | 'confirm' | 'cancel';
    } | null;
}

const CancelAppointment = ({ isCancelTabOpen, setIsCancelTabOpen, confirmPatientData, update, setUpdate }: CancelAppointmentPropsType) => {

    const [reasonForCancellation, setReasonForCancellation] = useState<string>('');
    const [errors, setErrors] = useState<{ reasonForCancellation: string }>({ reasonForCancellation: '' });

    // validating form fields
    const validateForm = () => {
        const newErrors = {
            reasonForCancellation: reasonForCancellation?.trim() ? '' : 'Please enter reason for cancellation',
        };
        setErrors(newErrors);
        return Object.values(newErrors).some((error) => error);
    };

    // handle cancel form
    const handleSubmit = async () => {
        if (validateForm()) {
            alert("fill details");
        } else {
            if (confirmPatientData) {
                const result = await axios.put('/api/dashboard/status', { appointmentId: confirmPatientData?._id, status: 'cancel', reasonForCancellation });
                if (result.data.success) {
                    toast.success("Appointment cencelled.");
                }
                else {
                    toast.error("Something wrong!");
                }
                setReasonForCancellation('');
                setIsCancelTabOpen(false);
                setUpdate(!update);
            }
        }
    }

    return (
        <div className="w-[640px] h-[454px] pt-10 px-10 pb-12 flex flex-col gap-10 otp popup">

            {/* heading */}
            <div className="heading flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className='text-xl lg:text-2xl font-bold'>
                        Cancel Appointment
                    </div>
                    <div className="cancel p-2 cursor-pointer" onClick={() => {
                        setIsCancelTabOpen(!isCancelTabOpen)
                    }}>
                        <Image src={close} alt="close" />
                    </div>
                </div>
                <div className='text-sm lg:text-base font-medium text-color'>
                    Are you sure you want to cancel your appointment
                </div>
            </div>

            {/* fields */}
            <div className="flex flex-col gap-10">

                {/* reason for appointment cancellation */}
                <div className="dr text-base flex flex-col gap-y-4">
                    <label htmlFor="cancelTextarea">Reason for cancellation</label>
                    <textarea className="col1 appo-sch p-4 text-base rounded-lg" style={{ resize: 'none', width: '100%', height: '100px' }} placeholder="ex: Urgent meeting came up" id="cancelTextarea" value={reasonForCancellation}
                        onChange={e => setReasonForCancellation(e.target.value)}
                    />
                    {errors.reasonForCancellation && <p className="text-red-500 text-sm">{errors.reasonForCancellation}</p>}

                </div>

                <div>
                    <button className='cancel-btn py-[8px] px-[10px] w-full rounded-md font-bold' onClick={handleSubmit}>Cancel appointment</button>
                </div>

            </div>
        </div>
    )
}

export default CancelAppointment