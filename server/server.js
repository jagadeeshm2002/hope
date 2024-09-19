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
    console.log(`Received event: ${event}`);
    console.log(payload)

    if (event === 'issue_comment') {
        const comment = payload.comment.body;
        const issue = payload.issue;

        console.log(`New comment on issue #${issue.number}: ${comment}`);

        // Check if the comment contains the "/bounty" command
        if (comment.includes('/bounty')) {
            // Extract bounty information (you might want to improve this parsing)
            const bountyAmount = comment.match(/\/bounty\s*(\d+)/);
            if (bountyAmount) {
                console.log(`Bounty command detected: $${bountyAmount[1]}`);
                // Handle the bounty logic here (e.g., save to database, notify users)
            }
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
