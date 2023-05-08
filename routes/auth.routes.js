const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt.middleware')
 

// verify user

router.get ("/verify", isAuthenticated, (req, res) => {
    if (req.payload) {
      console.log(req.payload)
      res.json(req.payload)
    }
    })

    router.post("/login", async (req, res) => {
        //Check username
        const matchedUserArr = await User.find({ username: req.body.username });
      
        if (matchedUserArr.length) {
          const currentUser = matchedUserArr[0];
          //Check password
          if (bcrypt.compareSync(req.body.passwordHash, currentUser.passwordHash)) {
         
      
            //Generate the JWT
       
            delete currentUser._doc.passwordHash
      
      
            const token = jwt.sign(
              {
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // makes sure the token will expire after a set time
                data: currentUser
              },
              process.env.TOKEN_SECRET
            ); // adds a secret to the .env
            res.json({ "token": token, username: currentUser.username })
          } else {
            res.status(403).json({ message: "Wrong password" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      });


module.exports = router