const route = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = "sm"
const saltRound = 10
let arr = []

route.post("/register", (req, res) => {
    const regData = req.body
    regData.pass = bcrypt.hashSync(regData.pass, saltRound)
    arr.push(regData)
    const token = jwt.sign({ user: regData.email }, secretKey, { expiresIn: 36000 })
    console.log(regData);
    return res.send({ msg: `user registered successfully with token ${token}` })
})

route.post("/login", (req, res) => {
    const loginData = req.body
    let findAcc = arr.find(item => item.email == loginData.email)
    if (!findAcc)
        return res.send({ msg: "User has not registered, please try again" })

    const validate = bcrypt.compareSync(loginData.pass, findAcc)
    if (validate)
        return res.send({ msg: "User successfully registered" })

    return res.send({ msg: "User details doesn't match" })
})

module.exports = route