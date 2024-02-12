const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const userRouter = require('./routes/user');
require("dotenv").config()
const cors = require('cors');
const bikeRouter = require('./routes/bike');
const app = express()
const path = require('path')
app.use(cors({ origin: "*" }))

app.use(express.json())
app.use(multer().any())
app.use('/fileUploads', express.static(path.join(__dirname, 'fileUploads')));
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Mongo connected successfully"))
    .catch((err) => console.log(err))
app.use("/", userRouter)
app.use("/bike", bikeRouter)

app.listen(process.env.PORT, () => {
    console.log(`Node started at port ${process.env.PORT}`);
});