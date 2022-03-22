const router = require('express').Router()
const User = require('../models/User')
const cryptojs = require("crypto-js")
const verify = require('../verifyToken')

//1. Update a user: PUT method on localhost:5000/api/user/update/:id
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = cryptojs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//2. Delete a user: DELETE method on localhost:5000/api/user/delete/:id
router.delete("/delete/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//3. Get a user: GET method on localhost:5000/api/user/find/:id
router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json(error);
    }
  })

//4. Get all user: GET method on localhost:5000/api/user/alluser : Can only be access by Admin
router.get("/alluser", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(5)
          : await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  })

//5. Get user stats: GET method on localhost:5000/api/user/stats
router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  })

module.exports = router