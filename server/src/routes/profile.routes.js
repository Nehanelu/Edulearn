// import required modules
const express = require("express")
const router = express.Router()

//import required controllers and middleware
const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses } = require("../controllers/Profile.controller")


const {auth} = require("../middlewares/auth.middleware")


//  ******** Profile Routes  **********


//delete user a/c
router.delete("/deleteProfile",  deleteAccount)
//update profile
router.put("/updateProfile", auth, updateProfile)
//get user details
router.get("/getUserDetails", auth, getAllUserDetails)


//get Enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// update display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)


//export
module.exports = router