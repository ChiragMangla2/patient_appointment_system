"use client";
import Image from "next/image";
import illustrtion from "../public/illustration.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

const patientForm = () => {

    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState(null);
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('m');
    const [occupation, setOccupation] = useState('');
    const [emergencyName, setEmergencyName] = useState('');
    const [emergencyNum, setEmergencyNum] = useState('');
    const [primaryPhysician, setPrimaryPhysician] = useState('Dr. Amit');
    const [insuranceProvider, setInsuranceProvider] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [allergies, setAllergies] = useState('');
    const [currentMedication, setCurrentMedication] = useState('');
    const [familyMedicalHistory, setFamilyMedicalHistory] = useState('');
    const [postMedicalHistory, setPostMedicalHistory] = useState('');
    const [identificationType, setIdentificationType] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [idCopy, setIdCopy] = useState(null);
    const [term1, setTerm1] = useState(false);
    const [term2, setTerm2] = useState(false);
    const [term3, setTerm3] = useState(false);
    const router = useRouter();

    // check patient login
    useEffect(() => {
        const data = sessionStorage.getItem('patientToken');
        if (data) {
            router.push('/appointment-form');
        }
    }, []);

    const handleOptionChange = (event) => {
        setGender(event.target.value);
    };

    function check() {
        console.log("fname =>", fname);
        console.log("email =>", email);
        console.log("Address =>", address);
        console.log("Phone =>", phone);
        console.log("DOB => ", dob)
        console.log("Gender =>", gender);
        console.log("Occupation =>", occupation);
        console.log("emergency name =>", emergencyName);
        console.log("Emergency number =>", emergencyNum);
        console.log("Insurance provider =>", insuranceProvider);
        console.log("policy num =>", policyNumber);
        console.log("Allergy =>", allergies);
        console.log("Current medication =>", currentMedication);
        console.log("Family medi his =>", familyMedicalHistory);
        console.log("Post Medical his =>", postMedicalHistory);
        console.log("Id type =>", identificationType);
        console.log("Id num =>", identificationNumber);
        console.log("id copy =>", idCopy);
        console.log("Dr => ", primaryPhysician);
        console.log("Term 1 => ", term1);
        console.log("Term2 => ", term2);
        console.log("term3 => ", term3);
    }

    const handleSubmit = async () => {
        // check(); //check all input values on client side.
        if (!fname || !email || !phone || !dob || !gender || !address || !occupation || !emergencyName || !emergencyNum || !drname || !insuranceProvider || !policyNumber || !allergies || !currentMedication || !familyMedicalHistory || !postMedicalHistory ||
            !identificationType || !identificationNumber || !idCopy) {
            alert("Details missing");
        } else {

            const response = await axios.post('/api/patient', {
                fname, email, phone, dob, gender, address, occupation, emergencyName, emergencyNum, primaryPhysician, insuranceProvider, policyNumber, allergies, currentMedication, familyMedicalHistory, postMedicalHistory, identificationType, identificationNumber, idCopy
            });
            console.log(response);
            if (response.data.success) {
                router.push('/appointment-form');
            }
        }
    }

    return (
        <div className="grid grid-cols-10 w-full min-h-[100vh] pb-24">
            <div className="col-span-7">
                <div className="login w-full h-full px-28">
                    <div className="logo py-16">
                        <div className="svg">
                            <svg width="164" height="38" viewBox="0 0 164 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_dd_13001_399)">
                                    <rect x="3.1" y="2.1" width="31.8" height="31.8" rx="7.9" fill="white" />
                                    <rect x="3.1" y="2.1" width="31.8" height="31.8" rx="7.9" fill="url(#paint0_linear_13001_399)" />
                                    <rect x="3.1" y="2.1" width="31.8" height="31.8" rx="7.9" stroke="#D0D5DD" strokeWidth="0.2" />
                                    <path d="M18.3546 13.1828C22.7105 11.4504 27.4742 12.8185 29.6373 14.9133C30.106 15.3671 30.5041 15.8275 30.845 16.2852C31.0394 15.2107 31.0552 14.1405 30.8681 13.1055C30.1847 9.32649 26.6195 7.18561 23.4233 8.29149C20.2415 9.3924 19.0005 11.5321 19.0005 11.5321C19.0005 11.5321 17.7595 9.3924 14.5777 8.29149C11.3812 7.18561 7.81603 9.32672 7.1328 13.1055C6.62842 15.8944 7.58356 18.9392 9.61033 21.6298C10.0372 21.7732 10.4847 21.8809 10.9586 21.9431C13.7978 22.3163 14.8184 21.557 16.0178 21.0486C16.8142 20.7113 17.4134 21.0942 17.3843 21.3626C17.3392 21.7786 15.7693 22.4895 16.106 22.6388C17.4351 23.2285 19.0718 23.2334 20.3053 22.18C21.838 20.8712 22.4114 21.7659 22.4114 21.7659C22.4114 21.7659 21.6502 23.7076 19.3581 24.6717C17.4457 25.4761 15.4419 25.6743 13.6107 25.4683C15.19 26.5846 17.0035 27.5204 19.0005 28.1883C24.7099 26.2784 28.9276 22.1871 30.4145 17.9096C29.4072 16.9157 28.1716 16.2996 26.6988 16.0763C23.8674 15.6471 22.8322 16.3863 21.6228 16.8708C20.8198 17.1926 20.2285 16.7978 20.263 16.5299C20.3161 16.1148 21.8999 15.4351 21.5661 15.279C20.249 14.6633 18.6125 14.626 17.3585 15.6549C15.8003 16.9332 15.2446 16.0274 15.2446 16.0274C15.2446 16.0274 16.0438 14.1015 18.3546 13.1828ZM17.2709 18.5052H18.3709V17.4052H19.6296V18.5052H20.7296V19.7639H19.6296V20.8639H18.3709V19.7639H17.2709V18.5052Z" fill="url(#paint1_linear_13001_399)" />
                                    <path d="M17.2709 18.5052H18.3709V17.4052H19.6296V18.5052H20.7295V19.7639H19.6378C21.2597 20.5834 24.2383 21.8027 27.8177 22.3451C28.9956 20.9517 29.8813 19.4428 30.4143 17.9096C29.4069 16.9157 28.1713 16.2996 26.6986 16.0763C23.8672 15.647 22.8319 16.3863 21.6226 16.8708C20.8196 17.1926 20.2282 16.7978 20.2627 16.5299C20.3159 16.1148 21.8997 15.4351 21.5659 15.279C20.2488 14.6633 18.6123 14.626 17.3583 15.6548C15.8 16.9332 15.2443 16.0274 15.2443 16.0274C15.2443 16.0274 16.0438 14.1013 18.3543 13.1823C22.7102 11.4499 27.4739 12.818 29.637 14.9128C30.1057 15.3666 30.5038 15.8271 30.8447 16.2847C31.0392 15.2102 31.055 14.14 30.8679 13.105C30.1844 9.326 26.6192 7.18512 23.423 8.291C20.2412 9.39191 19.0002 11.5316 19.0002 11.5316C19.0002 11.5316 17.7592 9.39191 14.5774 8.291C12.7519 7.65927 10.8067 8.0883 9.34619 9.27521C10.0323 10.7442 10.836 12.1168 13.1254 14.8773C14.9868 17.1222 17.2709 18.5052 17.2709 18.5052Z" fill="url(#paint2_linear_13001_399)" />
                                    <path opacity="0.31" d="M27.277 9.64954C24.2712 8.13944 21.169 10.4892 20.1851 11.7299C21.882 11.3725 23.3668 11.1892 25.2457 11.5839C28.0252 12.1679 29.0654 13.1715 30.3064 14.6542C30.0871 11.9069 28.3519 10.1896 27.277 9.64954Z" fill="url(#paint3_linear_13001_399)" />
                                </g>
                                <path d="M55.128 28.288C53.848 28.288 52.664 28.056 51.576 27.592C50.504 27.128 49.56 26.48 48.744 25.648C47.944 24.816 47.32 23.84 46.872 22.72C46.424 21.6 46.2 20.376 46.2 19.048C46.2 17.72 46.416 16.496 46.848 15.376C47.296 14.24 47.92 13.264 48.72 12.448C49.536 11.616 50.488 10.976 51.576 10.528C52.664 10.064 53.848 9.832 55.128 9.832C56.408 9.832 57.552 10.048 58.56 10.48C59.584 10.912 60.448 11.488 61.152 12.208C61.856 12.912 62.36 13.688 62.664 14.536L59.736 15.904C59.4 15.008 58.832 14.272 58.032 13.696C57.232 13.104 56.264 12.808 55.128 12.808C54.008 12.808 53.016 13.072 52.152 13.6C51.304 14.128 50.64 14.856 50.16 15.784C49.696 16.712 49.464 17.8 49.464 19.048C49.464 20.296 49.696 21.392 50.16 22.336C50.64 23.264 51.304 23.992 52.152 24.52C53.016 25.048 54.008 25.312 55.128 25.312C56.264 25.312 57.232 25.024 58.032 24.448C58.832 23.856 59.4 23.112 59.736 22.216L62.664 23.584C62.36 24.432 61.856 25.216 61.152 25.936C60.448 26.64 59.584 27.208 58.56 27.64C57.552 28.072 56.408 28.288 55.128 28.288ZM68.7756 28.288C67.8636 28.288 67.0716 28.136 66.3996 27.832C65.7276 27.528 65.2076 27.096 64.8396 26.536C64.4716 25.96 64.2876 25.296 64.2876 24.544C64.2876 23.824 64.4476 23.184 64.7676 22.624C65.0876 22.048 65.5836 21.568 66.2556 21.184C66.9276 20.8 67.7756 20.528 68.7996 20.368L73.0716 19.672V22.072L69.3996 22.696C68.7756 22.808 68.3116 23.008 68.0076 23.296C67.7036 23.584 67.5516 23.96 67.5516 24.424C67.5516 24.872 67.7196 25.232 68.0556 25.504C68.4076 25.76 68.8396 25.888 69.3516 25.888C70.0076 25.888 70.5836 25.752 71.0796 25.48C71.5916 25.192 71.9836 24.8 72.2556 24.304C72.5436 23.808 72.6876 23.264 72.6876 22.672V19.312C72.6876 18.752 72.4636 18.288 72.0156 17.92C71.5836 17.536 71.0076 17.344 70.2876 17.344C69.6156 17.344 69.0156 17.528 68.4876 17.896C67.9756 18.248 67.5996 18.72 67.3596 19.312L64.7916 18.064C65.0476 17.376 65.4476 16.784 65.9916 16.288C66.5516 15.776 67.2076 15.376 67.9596 15.088C68.7116 14.8 69.5276 14.656 70.4076 14.656C71.4796 14.656 72.4236 14.856 73.2396 15.256C74.0556 15.64 74.6876 16.184 75.1356 16.888C75.5996 17.576 75.8316 18.384 75.8316 19.312V28H72.8556V25.768L73.5276 25.72C73.1916 26.28 72.7916 26.752 72.3276 27.136C71.8636 27.504 71.3356 27.792 70.7436 28C70.1516 28.192 69.4956 28.288 68.7756 28.288ZM78.7374 28V14.944H81.6894V17.848L81.4494 17.416C81.7534 16.44 82.2254 15.76 82.8654 15.376C83.5214 14.992 84.3054 14.8 85.2174 14.8H85.9854V17.584H84.8574C83.9614 17.584 83.2414 17.864 82.6974 18.424C82.1534 18.968 81.8814 19.736 81.8814 20.728V28H78.7374ZM93.906 28.288C92.562 28.288 91.386 27.984 90.378 27.376C89.37 26.768 88.586 25.944 88.026 24.904C87.466 23.864 87.186 22.712 87.186 21.448C87.186 20.136 87.466 18.976 88.026 17.968C88.602 16.944 89.378 16.136 90.354 15.544C91.346 14.952 92.45 14.656 93.666 14.656C94.69 14.656 95.586 14.824 96.354 15.16C97.138 15.496 97.802 15.96 98.346 16.552C98.89 17.144 99.306 17.824 99.594 18.592C99.882 19.344 100.026 20.16 100.026 21.04C100.026 21.264 100.01 21.496 99.978 21.736C99.962 21.976 99.922 22.184 99.858 22.36H89.778V19.96H98.082L96.594 21.088C96.738 20.352 96.698 19.696 96.474 19.12C96.266 18.544 95.914 18.088 95.418 17.752C94.938 17.416 94.354 17.248 93.666 17.248C93.01 17.248 92.426 17.416 91.914 17.752C91.402 18.072 91.01 18.552 90.738 19.192C90.482 19.816 90.386 20.576 90.45 21.472C90.386 22.272 90.49 22.984 90.762 23.608C91.05 24.216 91.466 24.688 92.01 25.024C92.57 25.36 93.21 25.528 93.93 25.528C94.65 25.528 95.258 25.376 95.754 25.072C96.266 24.768 96.666 24.36 96.954 23.848L99.498 25.096C99.242 25.72 98.842 26.272 98.298 26.752C97.754 27.232 97.106 27.608 96.354 27.88C95.618 28.152 94.802 28.288 93.906 28.288ZM102.673 28V10.12H109.345C110.561 10.12 111.633 10.344 112.561 10.792C113.505 11.224 114.241 11.864 114.769 12.712C115.297 13.544 115.561 14.56 115.561 15.76C115.561 16.944 115.289 17.96 114.745 18.808C114.217 19.64 113.489 20.28 112.561 20.728C111.633 21.176 110.561 21.4 109.345 21.4H105.937V28H102.673ZM105.937 18.52H109.393C109.985 18.52 110.497 18.408 110.929 18.184C111.361 17.944 111.697 17.616 111.937 17.2C112.177 16.784 112.297 16.304 112.297 15.76C112.297 15.2 112.177 14.72 111.937 14.32C111.697 13.904 111.361 13.584 110.929 13.36C110.497 13.12 109.985 13 109.393 13H105.937V18.52ZM122.628 28.288C121.62 28.288 120.74 28.064 119.988 27.616C119.252 27.168 118.684 26.544 118.284 25.744C117.9 24.944 117.708 24.008 117.708 22.936V14.944H120.852V22.672C120.852 23.216 120.956 23.696 121.164 24.112C121.388 24.512 121.7 24.832 122.1 25.072C122.516 25.296 122.98 25.408 123.492 25.408C124.004 25.408 124.46 25.296 124.86 25.072C125.26 24.832 125.572 24.504 125.796 24.088C126.02 23.672 126.132 23.176 126.132 22.6V14.944H129.276V28H126.3V25.432L126.564 25.888C126.26 26.688 125.756 27.288 125.052 27.688C124.364 28.088 123.556 28.288 122.628 28.288ZM132.198 28V9.832H135.342V28H132.198ZM143.213 28.288C141.821 28.288 140.605 27.96 139.565 27.304C138.541 26.632 137.837 25.728 137.453 24.592L139.805 23.464C140.141 24.2 140.605 24.776 141.197 25.192C141.805 25.608 142.477 25.816 143.213 25.816C143.789 25.816 144.245 25.688 144.581 25.432C144.917 25.176 145.085 24.84 145.085 24.424C145.085 24.168 145.013 23.96 144.869 23.8C144.741 23.624 144.557 23.48 144.317 23.368C144.093 23.24 143.845 23.136 143.573 23.056L141.437 22.456C140.333 22.136 139.493 21.648 138.917 20.992C138.357 20.336 138.077 19.56 138.077 18.664C138.077 17.864 138.277 17.168 138.677 16.576C139.093 15.968 139.661 15.496 140.381 15.16C141.117 14.824 141.957 14.656 142.901 14.656C144.133 14.656 145.221 14.952 146.165 15.544C147.109 16.136 147.781 16.968 148.181 18.04L145.781 19.168C145.557 18.576 145.181 18.104 144.653 17.752C144.125 17.4 143.533 17.224 142.877 17.224C142.349 17.224 141.933 17.344 141.629 17.584C141.325 17.824 141.173 18.136 141.173 18.52C141.173 18.76 141.237 18.968 141.365 19.144C141.493 19.32 141.669 19.464 141.893 19.576C142.133 19.688 142.405 19.792 142.709 19.888L144.797 20.512C145.869 20.832 146.693 21.312 147.269 21.952C147.861 22.592 148.157 23.376 148.157 24.304C148.157 25.088 147.949 25.784 147.533 26.392C147.117 26.984 146.541 27.448 145.805 27.784C145.069 28.12 144.205 28.288 143.213 28.288ZM156.765 28.288C155.421 28.288 154.245 27.984 153.237 27.376C152.229 26.768 151.445 25.944 150.885 24.904C150.325 23.864 150.045 22.712 150.045 21.448C150.045 20.136 150.325 18.976 150.885 17.968C151.461 16.944 152.237 16.136 153.213 15.544C154.205 14.952 155.309 14.656 156.525 14.656C157.549 14.656 158.445 14.824 159.213 15.16C159.997 15.496 160.661 15.96 161.205 16.552C161.749 17.144 162.165 17.824 162.453 18.592C162.741 19.344 162.885 20.16 162.885 21.04C162.885 21.264 162.869 21.496 162.837 21.736C162.821 21.976 162.781 22.184 162.717 22.36H152.637V19.96H160.941L159.453 21.088C159.597 20.352 159.557 19.696 159.333 19.12C159.125 18.544 158.773 18.088 158.277 17.752C157.797 17.416 157.213 17.248 156.525 17.248C155.869 17.248 155.285 17.416 154.773 17.752C154.261 18.072 153.869 18.552 153.597 19.192C153.341 19.816 153.245 20.576 153.309 21.472C153.245 22.272 153.349 22.984 153.621 23.608C153.909 24.216 154.325 24.688 154.869 25.024C155.429 25.36 156.069 25.528 156.789 25.528C157.509 25.528 158.117 25.376 158.613 25.072C159.125 24.768 159.525 24.36 159.813 23.848L162.357 25.096C162.101 25.72 161.701 26.272 161.157 26.752C160.613 27.232 159.965 27.608 159.213 27.88C158.477 28.152 157.661 28.288 156.765 28.288Z" fill="white" />
                                <defs>
                                    <filter id="filter0_dd_13001_399" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13001_399" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1.5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow_13001_399" result="effect2_dropShadow_13001_399" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_13001_399" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_13001_399" x1="19" y1="2" x2="19" y2="34" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" />
                                        <stop offset="1" stopColor="#D0D5DD" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_13001_399" x1="10.1989" y1="24.2137" x2="27.8347" y2="6.57791" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#0076C1" />
                                        <stop offset="0.0737" stopColor="#0B82C6" />
                                        <stop offset="0.2766" stopColor="#269ED3" />
                                        <stop offset="0.4546" stopColor="#36AFDA" />
                                        <stop offset="0.587" stopColor="#3CB5DD" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_13001_399" x1="10.1388" y1="24.2537" x2="27.8274" y2="6.56509" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#00A482" />
                                        <stop offset="1" stopColor="#79DD83" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_13001_399" x1="24.8608" y1="13.5073" x2="28.5288" y2="10.1132" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#00A482" />
                                        <stop offset="1" stopColor="#79DD83" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>

                    <div className="content">
                        <div className="heading">
                            <div className='text-4xl font-bold'>Welcome 👋</div>
                            <div className='text-xl font-medium text-color'>Let us know more about yourself</div>
                        </div>
                        {/* personal info */}
                        <div className="login-form my-12 flex flex-col gap-y-6">
                            <div className="text text-3xl font-bold">Personal Information</div>
                            <div className="flex flex-col">
                                <label htmlFor="name" className='text-color'>Full name</label>
                                <input type="text" className='bg border border-white/50 py-3 px-4 w-full' id="name" placeholder='ex: Adam' autoComplete='off'
                                    value={fname}
                                    onChange={e => setFname(e.target.value)} />
                                <p className="text-red-400">Please enter your name</p>
                            </div>
                            <div className="grid grid-cols-10 gap-4">
                                {/* left */}
                                <div className="col-span-5 flex flex-col gap-y-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className='text-color'>Email Address</label>
                                        <input type="email" id="email" className='bg border border-white/50 py-3 px-4 w-full' placeholder='adam@example.com' autoComplete='off'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                        <p className="text-red-400">Please enter your email</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="dob" className='text-color'>Date of birth</label>
                                        <DatePicker
                                            selected={dob}
                                            onChange={(date) => setDob(date)}
                                            placeholderText="Select your birth date"
                                            id="dob"
                                            className="bg border border-white/50 py-3 px-4 w-full"
                                        />
                                        <p className="text-red-400">Please select your date of birth</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="address" className='text-color'>Address</label>
                                        <input type="email" id="address" className='bg border border-white/50 py-3 px-4 w-full' placeholder='ex: 14 street, New York, NY-5101' autoComplete='off'
                                            value={address}
                                            onChange={e => setAddress(e.target.value)} />
                                        <p className="text-red-400">Please enter your address</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="emergency" className='text-color'>Emergency contact name</label>
                                        <input type="email" id="emergency" className='bg border border-white/50 py-3 px-4 w-full' placeholder="Guardian's name" autoComplete='off'
                                            value={emergencyName}
                                            onChange={e => setEmergencyName(e.target.value)} />
                                        <p className="text-red-400">Please enter emergency contact number
                                        </p>
                                    </div>
                                </div>

                                {/* right */}
                                <div className="col-span-5 flex flex-col gap-y-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="phone" className='text-color'>Phone number</label>
                                        <input type="tel" id="phone" className='bg border border-white/50 py-3 px-4 w-full' placeholder='Enter phone number' autoComplete='off'
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)} />
                                        <p className="text-red-400">Please enter your phone number</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="gender" className='text-color'>Gender</label>
                                        <div className="flex justify-between">
                                            <label className="bg border border-white/50 py-3 px-4 flex gap-4 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="option"
                                                    value="m"
                                                    checked={gender === 'm'}
                                                    className="w-4 cursor-pointer"
                                                    id="gender"
                                                    onChange={handleOptionChange}
                                                />
                                                Male
                                            </label>
                                            <label className="bg border border-white/50 py-3 px-4 flex gap-4 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="f"
                                                    value="female"
                                                    checked={gender === 'f'}
                                                    className="w-4 cursor-pointer"
                                                    onChange={handleOptionChange}
                                                />
                                                Female
                                            </label>
                                            <label className="bg border border-white/50 py-3 px-4 flex gap-4 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="other"
                                                    value="o"
                                                    checked={gender === 'o'}
                                                    className="w-4 cursor-pointer"
                                                    onChange={handleOptionChange}
                                                />
                                                Other
                                            </label>
                                        </div>
                                        <p className="text-red-400 h-6"></p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="Occupation" className='text-color'>Occupation</label>
                                        <input type="tel" id="Occupation" className='bg border border-white/50 py-3 px-4 w-full' placeholder='Software Engineer' autoComplete='off'
                                            value={occupation}
                                            onChange={e => setOccupation(e.target.value)} />
                                        <p className="text-red-400">Please enter your occupation</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="emergency-phone" className='text-color'>Phone number</label>
                                        <input type="tel" id="emergency-phone" className='bg border border-white/50 py-3 px-4 w-full' placeholder='Enter phone number' autoComplete='off'
                                            value={emergencyNum}
                                            onChange={e => setEmergencyNum(e.target.value)} />
                                        <p className="text-red-400">Please enter name</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* medical info */}
                        <div className="login-form my-12 flex flex-col gap-y-6">
                            <div className="text text-3xl font-bold">Medical Information</div>
                            <div className="flex flex-col">
                                <label htmlFor="primaryPhysician" className='text-color'>Primary care physician</label>
                                <select id="primaryPhysician" className="outline-none bg border border-white/50 py-3 px-4 w-full" defaultValue={primaryPhysician} onChange={e => setPrimaryPhysician(e.target.value)}>
                                    <option value="Dr. Amit">Dr. Amit</option>
                                    <option value="Dr. Chirag">Dr. Chirag</option>
                                    <option value="Dr. Pandey">Dr. Pandey</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-10 gap-4">
                                {/* left */}
                                <div className="col-span-5 flex flex-col gap-y-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="insurance-provider" className='text-color'>Insurance provider</label>
                                        <input type="text" id="insurance-provider" className='bg border border-white/50 py-3 px-4 w-full' placeholder='ex: BlueCross' autoComplete='off'
                                            value={insuranceProvider}
                                            onChange={e => setInsuranceProvider(e.target.value)} />
                                        <p className="text-red-400">Please enter insurance provider</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="allergies" className='text-color'>Allergies(if any)</label>

                                        <textarea id="allergies" className='bg border border-white/50 py-3 px-4 w-full h-24 resize-none' placeholder='ex: Peanuts, Penicillin, Pollen'
                                            value={allergies}
                                            onChange={e => setAllergies(e.target.value)} />
                                        <p className="text-red-400">Please enter your allergies</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="family-med-his" className='text-color'>Family medical history(if relevant)</label>
                                        <textarea id="family-med-his" className='bg border border-white/50 py-3 px-4 w-full h-24 resize-none' placeholder='ex: Mother had cancer'
                                            value={familyMedicalHistory}
                                            onChange={e => setFamilyMedicalHistory(e.target.value)} />
                                        <p className="text-red-400">Please enter your family medical history</p>
                                    </div>

                                </div>

                                {/* right */}
                                <div className="col-span-5 flex flex-col gap-y-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="ipn" className='text-color'>Insurancce policy number</label>
                                        <input type="tel" id="ipn" className='bg border border-white/50 py-3 px-4 w-full' placeholder='ex: ABC1234567' autoComplete='off'
                                            value={policyNumber}
                                            onChange={e => setPolicyNumber(e.target.value)} />
                                        <p className="text-red-400">Please enter policy number</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="cm" className='text-color'>Current medications</label>
                                        <textarea id="cm" className='bg border border-white/50 py-3 px-4 w-full h-24 resize-none' placeholder='ex: lbuprofen 200mg, Levothyroxine 50mcg'
                                            value={currentMedication}
                                            onChange={e => setCurrentMedication(e.target.value)} />
                                        <p className="text-red-400">Please enter your current medications</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="pmh" className='text-color'>Post medical history</label>
                                        <textarea id="pmh" className='bg border border-white/50 py-3 px-4 w-full h-24 resize-none' placeholder='ex: Asthma diagnosis in childhood'
                                            value={postMedicalHistory}
                                            onChange={e => setPostMedicalHistory(e.target.value)} />
                                        <p className="text-red-400">Please enter your medical history</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* identification and verification */}
                        <div className="login-form my-12 flex flex-col gap-y-6">
                            <div className="text text-3xl font-bold">Identification and Verfication</div>
                            <div className="flex flex-col">
                                <label htmlFor="" className='text-color'>Identification type</label>
                                <input type="text" className='bg border border-white/50 py-3 px-4 w-full' id="name" placeholder='ex: Adam' autoComplete='off'
                                    value={identificationType}
                                    onChange={e => setIdentificationType(e.target.value)} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="id-num" className='text-color'>Identification number</label>
                                <input type="text" className='bg border border-white/50 py-3 px-4 w-full' id="id-num" placeholder='ex: 123456' autoComplete='off'
                                    value={identificationNumber}
                                    onChange={e => setIdentificationNumber(e.target.value)} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="file" className='text-color'>Scanned Copy of Identification Document</label>

                                <div className="flex items-center justify-center w-full bg">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-stone-700 border-dashed rounded-lg cursor-pointer">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-green">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden"
                                            onChange={e => setIdCopy(e.target.value)} />
                                    </label>
                                </div>

                                {/*  */}
                            </div>
                        </div>

                        {/* terms */}
                        <div className="login-form my-12 flex flex-col gap-y-6">
                            <div className="text text-3xl font-bold">Consent and Privacy</div>
                            <div className="flex">
                                <input type="checkbox" className='bg border border-stone/50 mr-3 h-5 w-5' id="t1"
                                    checked={term1}
                                    onChange={e => setTerm1(!term1)} />
                                <label htmlFor="t1" className='text-color'>I consent to receive treatment for my health condition.</label>
                            </div>
                            <div className="flex">
                                <input type="checkbox" className='bg border border-stone/50 mr-3 h-5 w-5' id="t2"
                                    checked={term2}
                                    onChange={e => setTerm2(!term2)} />
                                <label htmlFor="t2" className='text-color'>I consent to the use and disclosure of my health information for treatment purposes.</label>
                            </div>
                            <div className="flex">
                                <input type="checkbox" className='bg border border-stone/50 mr-3 h-5 w-5' id="t3"
                                    checked={term3}
                                    onChange={e => setTerm3(!term3)} />
                                <label htmlFor="t3" className='text-color'>
                                    I acknowledge that I have reviewed and agree to the privacy policy
                                </label>
                            </div>
                        </div>


                    </div>
                    <div>
                        <button className='login-btn py-[6px] px-[10px] w-full rounded-md font-bold' onClick={handleSubmit}>Submit and continue</button>
                    </div>
                </div>
            </div>

            {/* main right */}
            <div className="col-span-3 w-full h-screen overflow-hidden">
                <Image src={illustrtion} alt="img" style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    )
}

export default patientForm
