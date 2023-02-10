const Express =require( "express");
const {
    sendEmailOTP,
    emailOTPVerification,
    sendMobileOTP,
    mobileOTPVerification,
    registerUser,
    updateUser
}=
      require( "../controllers/userController.js");


const router=Express.Router();


router.route("/emailotp").post( sendEmailOTP);

router.route("/verifyemailotp").post(emailOTPVerification );


router.route("/mobileotp").post( sendMobileOTP);

router.route("/verifymobileotp").post(mobileOTPVerification );

router.route("/register").post( registerUser);
router.route("/updateUser/:id").put(updateUser)


module.exports=router;

