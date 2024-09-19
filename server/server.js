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
// app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


app.use("/",require("./routes/root"))
app.use('/auth',require('./routes/authRoutes'))
app.use("/users",require('./routes/userRoutes'))
app.use('/products',require('./routes/productRoutes'))
app.use('/cart',require('./routes/cartRoutes'))
app.post('/webhook', (req, res) => {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    if (event === 'pull_request') {
        const action = payload.action;
        const pullRequest = payload.pull_request;

        console.log(`Pull Request ${action}: #${pullRequest.number} by ${pullRequest.user.login}`);

        // Check if the pull request body contains a bounty command
        if (pullRequest.body.includes('/bounty')) {
            console.log('Bounty found:', pullRequest.body);
            // Extract bounty information and process it here
        }
    }

    res.status(200).send('Webhook received');
});

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
