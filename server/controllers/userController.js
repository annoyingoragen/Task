const userModel =require( "../models/userModel.js");
const sendEmail =require( "../utils/sendEmail.js");
const bcryptjs =require( "bcrypt");
const sendMessage = require("../utils/sendMessage.js");

exports.sendEmailOTP=async (req, res)=>{

const email = req.body.email;
const otp = Math.floor(100000 + Math.random() * 900000);

const message=`Your Email OTP is: ${otp}`;

  try {
    await sendEmail({
      email: email,
      subject: 'Email OTP Verification',
      message,
    });

   const emailToken=  await bcryptjs.hash(`${otp}`, 4);

res.status(200).json({
  success: true,
  message: `OTP sent successfully.`,
  emailToken
});

  } catch (error) {
    console.log(error.message);
   
    return res.status(500).json({
      success: false,
      message: error.message});
    }

}


exports.emailOTPVerification=async (req, res, next)=>{
  try {
    console.log(req.body)
    const userOTP = req.body.emailOTP;
    const emailToken=req.body.emailToken;
    console.log(`emailtoken ${emailToken}`);
    if (!emailToken) {
      return next( res.status(400).json({
        success: false,
        message: "Enter email again"}));
    }
    const isEmailOTPValid = await bcryptjs.compare(userOTP, emailToken);
    if(isEmailOTPValid){
     return res.status(200).json({
        success: true,
        message: `Email is verified.`,
        
      });
    }else{
      return res.status(500).json({
        success: false,
        message: `Invalid OTP.`,
        
      });
    }
    
  } catch (error) {
    console.log(`token finding error ${error}`);
  }
};






exports.sendMobileOTP=async (req, res)=>{

    
      const mobile = req.body.mobile;
      const otp = Math.floor(100000 + Math.random() * 900000);
      
      const message=`Your Mobile OTP is: ${otp}`;
      
        try {
          await sendMessage({
            body: message,
            to: mobile,
          
          });
      
         const mobileToken=  await bcryptjs.hash(`${otp}`, 4);
      
      res.status(200).json({
        success: true,
        message: `OTP sent successfully.`,
        mobileToken
      });
      
        } catch (error) {
          console.log(error.message);
         
          return res.status(500).json({
            success: false,
            message: error.message});
          }
      
      }


exports.mobileOTPVerification=async (req, res, next)=>{
        try {
          
          const userOTP = req.body.mobileOTP;
          const mobileToken=req.body.mobileToken;
          console.log(`userOTP ${userOTP}`);
          console.log(`mobiletoken ${mobileToken}`);
          if (!mobileToken) {
            return next( res.status(400).json({
              success: false,
              message: "Enter email again"}));
          }
          const isMobileOTPValid = await bcryptjs.compare(userOTP, mobileToken);
          if(isMobileOTPValid){
           return res.status(200).json({
              success: true,
              message: `Mobile Number is verified.`,
              
            });
          }else{
            return res.status(500).json({
              success: false,
              message: `Invalid OTP.`,
              
            });
          }
          
        } catch (error) {
          console.log(`token finding error ${error}`);
        }
      };

exports.registerUser=async (req, res)=>{
        try {
      
          const {name,
          email,
          mobile,
          password}=req.body;
          const mobileCheck = await userModel.findOne({ mobile });
          if (mobileCheck)
            return res.json({ message: "MobileNumber already used", success: false });
          const emailCheck = await userModel.findOne({ email });
          if (emailCheck)
            return res.json({ message: "Email already used", success: false });
          const hashedPassword=await bcryptjs.hash(password,10);
          const user=await userModel.create({
            name, email, password:hashedPassword,mobile
          });
          delete user.password
          res.status(200).json({
            success: true,
            user,
          });
          
      
        } catch (error) {
          // console.log(error)
          return res.status(400).json({
            success: false,
            message: error,
          });
        }
      };



exports.updateUser = async (req, res, next) => {
        try {
          console.log(req.body)
          const userId = req.params.id;
          const { name ,
            email ,
            
            mobile,} = req.body;
      
          const userData = await userModel.findByIdAndUpdate(
            userId,
            {
              
              
              name ,
            email ,
            
            mobile,
            },
            { new: true }
          );
      
          res.status(200).json({
            success: true,
            userData
          });
        } catch (error) {
          console.log(error)
          return res.status(400).json({
            success: false,
            message: error,
          });
        }
      };




