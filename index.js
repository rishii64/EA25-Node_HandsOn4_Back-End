const express = require("express")
const userRouter = require("./signupLogin")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(userRouter)
app.listen(5000,()=>{
    try{
        console.log("server started..")
    }
    catch{
        console.log("404 error !!")
    }
})