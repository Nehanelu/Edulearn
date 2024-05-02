// import required module
const express = require("express")
const router = express.Router()

// import required controllers and middlewares
const {login, signUp, sendOTP, changePassword} = require("../controllers/Auth.controller.js")
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword.controller.js")

const {auth} = require("../middlewares/auth.middleware")


// ROUTES


//    *********** Routes for Authentication  ***********

//route for user login
router.post("/login", login)

// route for user signup
router.post("/signup", signUp)

//route for sending otp to the user's mailId
router.post("/sendotp", sendOTP)

// route for changing the password
router.post("/changepassword", auth, changePassword)



//    ***********  Routes for Reset password   *************

//route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// route for resetting user password after verifying
router.post("/reset-password", resetPassword)



//  export the router
module.exports = router