const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // change url to domain
    origin: ["http://localhost:3001"],
    credentials: true,
}));

// connect to mongoDB

mongoose.connect(process.env.MDB_CONNECT, {

},
    (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));

