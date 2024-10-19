{/* appointments table*/}
<div className="appointment-table px-16">
<table className="w-[85vw]">
    <thead>
        <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Status</th>
            <th>Doctor</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr className="bg-dark">
            <td className="flex items-center gap-x-4">
                <div className="circle bg-green-800 p-2 rounded-full font-extrabold text-base">AK</div>
                <div className="text">Amit Kumar</div>
            </td>
            <td className=" text-sm">Oct 2, 2024</td>
            <td className="w-auto">
                <div className="flex items-center scheduled rounded-3xl w-36 px-2 gap-x-2">
                    <Image src={check} alt="status" width={25} />
                    <span className=" font-bold">Scheduled</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-x-4">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image src={img1} alt="img" className="w-full h-full" />
                    </div>
                    <span className="">Dr. Alex Remirez</span>
                </div>
            </td>
            <td>
                <div className="flex gap-x-4">
                    <button className="text-green-400" onClick={() => setIsOpen(true)}>Schedule</button>
                    <button className="text-red-400" onClick={() => setIsCancelTabOpen(true)}>Cancel</button>
                </div>
            </td>
        </tr>
        <tr className="bg-light">
            <td className="flex items-center gap-x-4">
                <div className="circle bg-blue-800 p-2 rounded-full font-extrabold text-base">YS</div>
                <div className="text">Yash Sharma</div>
            </td>
            <td className=" text-sm">Oct 2, 2024</td>
            <td className="w-auto">
                <div className="flex items-center pending rounded-3xl w-36 px-2 gap-x-2">
                    <Image src={pending} alt="status" width={25} />
                    <span className=" font-bold">Pending</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-x-4">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image src={img1} alt="img" className="w-full h-full" />
                    </div>
                    <span className="">Dr. Alex Remirez</span>
                </div>
            </td>
            <td>
                <div className="flex gap-x-4">
                    <button className="text-green-400">Schedule</button>
                    <button className="text-red-400">Cancel</button>
                </div>
            </td>
        </tr>
        <tr className="bg-dark">
            <td className="flex items-center gap-x-4">
                <div className="circle bg-green-800 p-2 rounded-full font-extrabold text-base">AT</div>
                <div className="text">Ansh Tiwari</div>
            </td>
            <td className=" text-sm">Oct 2, 2024</td>
            <td className="w-auto">
                <div className="flex items-center cancelled rounded-3xl w-36 px-2 gap-x-2">
                    <Image src={x} alt="status" width={25} />
                    <span className=" font-bold">Cancelled</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-x-4">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image src={img1} alt="img" className="w-full h-full" />
                    </div>
                    <span className="">Dr. Alex Remirez</span>
                </div>
            </td>
            <td>
                <div className="flex gap-x-4">
                    <button className="text-green-400">Schedule</button>
                    <button className="text-red-400">Cancel</button>
                </div>
            </td>
        </tr>
        <tr className="bg-dark">
            <td className="flex items-center gap-x-4">
                <div className="circle bg-green-800 p-2 rounded-full font-extrabold text-base">AK</div>
                <div className="text">Amit Kumar</div>
            </td>
            <td className=" text-sm">Oct 2, 2024</td>
            <td className="w-auto">
                <div className="flex items-center scheduled rounded-3xl w-36 px-2 gap-x-2">
                    <Image src={check} alt="status" width={25} />
                    <span className=" font-bold">Scheduled</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-x-4">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image src={img1} alt="img" className="w-full h-full" />
                    </div>
                    <span className="">Dr. Alex Remirez</span>
                </div>
            </td>
            <td>
                <div className="flex gap-x-4">
                    <button className="text-green-400">Schedule</button>
                    <button className="text-red-400">Cancel</button>
                </div>
            </td>
        </tr>
        <tr className="bg-light">
            <td className="flex items-center gap-x-4">
                <div className="circle bg-blue-800 p-2 rounded-full font-extrabold text-base">YS</div>
                <div className="text">Yash Sharma</div>
            </td>
            <td className=" text-sm">Oct 2, 2024</td>
            <td className="w-auto">
                <div className="flex items-center pending rounded-3xl w-36 px-2 gap-x-2">
                    <Image src={pending} alt="status" width={25} />
                    <span className=" font-bold">Pending</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-x-4">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image src={img1} alt="img" className="w-full h-full" />
                    </div>
                    <span className="">Dr. Alex Remirez</span>
                </div>
            </td>
            <td>
                <div className="flex gap-x-4">
                    <button className="text-green-400">Schedule</button>
                    <button className="text-red-400">Cancel</button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</div>