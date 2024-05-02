const express = require('express')
const app = express();

// import routes
const userRoutes = require("./routes/user.routes")
const profileRoutes = require("./routes/profile.routes")
const courseRoutes = require("./routes/course.routes")
const paymentRoutes = require("./routes/payment.routes")

const database = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload")
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// db connect
database.connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

//cloudinary connect
cloudinaryConnect();

// routes mount
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)


//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running...."
    })
})


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})