const router = require('express').Router()
const User = require('../models/User')
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

//1. register a user: POST method on localhost:5000/api/auth/register
router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: cryptojs.AES.encrypt(req.body.password, process.env.SECRET_KEY)
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//2. Login a user using JWT_TOKEN: POST method on localhost:5000/api/auth/login
router.post("/login", async (req, res)=>{
    try {
        const user = await User.findOne({ email:req.body.email })
        if(!user){
            res.status(404).json("wrong email or password")
        }

        const decrypted = cryptojs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPass = decrypted.toString(cryptojs.enc.Utf8)
        if(originalPass!==req.body.password){
            res.status(404).json("wrong email or password")
        }

        const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn:"5d"})

        const { password, ...info }=user._doc
        res.status(200).json({...info, accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router