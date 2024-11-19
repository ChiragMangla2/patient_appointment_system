import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

interface payloadType {
    _id: mongoose.Schema.Types.ObjectId;
    patientId: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    },
    drname: string;
    reasonForApp: string;
    note: string;
    selectedDate: string;
    status: string;
    reasonForCancellation:string;
}

const sendMail = (payload:payloadType):void => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.GMAIL}`,
            pass: `${process.env.GMAIL_PASSWORD}`
        }
    });

    const mailOptions = {
        from: `${process.env.GMAIL}`,
        to: `${payload.patientId.email}`,
        subject: payload.status == 'confirm' ? "Medical Appointment Confirmation" : "Medical Appointment Cancellation",
        // text: `Your appointment scheduled`
        html: payload.status == 'confirm' ?
            `Dear sir/mam,<br/><br/>We are pleased to confirm your medical appointment scheduled for:<br/><br/>Date: ${payload.selectedDate}.<br/><br/>If you have any questions or need to reschedule, please feel free to contact us at +91 9876543210. We look forward to seeing you.<br/><br/>Thank you,<br/><br/>CarePulse<br/><br/>+91 9876543210`
            :
            `Dear sir/mam,<br/><br/>We regret to inform you that your medical appointment request has been canceled due to ${payload.reasonForCancellation}.<br/><br/>We apologize for any inconvenience this may cause and will be happy to assist you in rescheduling. Please contact us at +91 9876543210 to arrange a new appointment at your earliest convenience.<br/><br/>Thank you for your understanding.<br/><br/>Best regards,<br/><br/>CarePulse<br/><br/>+91 9876543210`
    };

    transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email sent successfully');
        })
        .catch(error => {
            console.error('Error sending email', error);
        });

}

export default sendMail;