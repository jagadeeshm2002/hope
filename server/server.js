const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {logger} = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions =require('./config/corsOptions')


const PORT = process.env.PORT || 3500
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/",require("./routes/root"))
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })
app.use(errorHandler)
app.listen(PORT, () => {
    console.log("Listening on port ",PORT);
})