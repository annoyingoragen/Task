
const nodemailer =require( 'nodemailer');
const sendEmail=async(options)=>{

    const  transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"bibliophilemuffie@gmail.com",
            pass:"bkcoaedzcvbonqen",
        }
    });
console.log(options)
    const mailOptions={
        from:"bibliophilemuffie@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions);
}


module.exports=sendEmail;