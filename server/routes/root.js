const express =require('express')
const router =express.Router()



router.get('^/$|/index.(html)?',(req,res) => {
    // res.sendFile(path.join(__dirname,'..','public',index.html))
    res.send('hello would')
})


module.exports = router