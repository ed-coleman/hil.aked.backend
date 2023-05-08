const express = require("express");
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt.middleware')

const saltRounds = 10

router.get('/users', async (req, res) => {
  try {
      const allUsers = await User.find()
      res.status(200).json(allUsers)
      console.log('all users fetched successfully: ', allUsers)
  } catch (error) {
      console.log(error)
  }
})

// routes/auth.routes.js

// ... all imports stay unchanged

// POST /auth/signup  - Creates a new user in the database
router.post('/addUser', (req, res, next) => {
  const { email, password, username } = req.body;

  // Check if the email or password or name is provided as an empty string 
  if (email === '' || password === '' || username === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Use regex to validate the email format
  /*const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }*/
  
  // Use regex to validate the password format
  /*const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }*/


  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then` 
      return User.create({ email, password: hashedPassword, username });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, username, _id } = createdUser;
    
      // Create a new object that doesn't expose the password
      const user = { email, username, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
});



// POST  /auth/login
// ...


// GET  /auth/verify
// ...

module.exports = router;

 

// verify user

router.get ("/verify", isAuthenticated, (req, res, next) => {
    if (req.payload) {
      console.log(req.payload)
      res.status(200).assignSocketjson(req.payload)
    }
    })

    /*router.post("/login", async (req, res) => {
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
      });*/

      // routes/auth.routes.js
// ...

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { username, password, email } = req.body;

  // Check if email or password are provided as empty string 
  if (username === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
    
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, username } = foundUser;
        console.log('password correct')
        
        // Create an object that will be set as the token payload
        const payload = { _id, username };

        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});


// ...



module.exports = router