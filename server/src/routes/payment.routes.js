//import the required modules
const express = require("express");
const router = express.Router();


// import required controllers and middlewares
const { capturePayment, verifySignature} = require("../controllers/Payments.controller")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth.middleware")



//   *******  Routes for payment   *******
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)


// export
module.exports = router 