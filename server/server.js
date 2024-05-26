require('dotenv').config()
const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const {logger,logEvent} = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions =require('./config/corsOptions')
const connectDB = require('./config/db')
const mongoose =require('mongoose');



connectDB() 
const PORT = process.env.PORT || 3500
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


app.use("/",require("./routes/root"))
app.use('/auth',require('./routes/authRoutes'))
app.use("/users",require('./routes/userRoutes'))
app.use('/products',require('./routes/productRoutes'))
app.use('/cart',require('./routes/cartRoutes'))
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })
app.all('*', (req, res) => {
    res.status(404);
    res.type('txt').send("no access");
})

app.use(errorHandler)

mongoose.connection.once('open',()=> {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Listening on port ",PORT);
    })

})

mongoose.connection.on('error',err => {
    console.log(err);
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log' )
})
