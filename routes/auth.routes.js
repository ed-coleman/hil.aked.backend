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
  const { email, password } = req.body;

  // Check if the email or password or name is provided as an empty string 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }


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
      return User.create({ email, password: hashedPassword });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, _id } = createdUser;
    
      // Create a new object that doesn't expose the password
      const user = { email, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
});

module.exports = router;

 

// verify user


router.get ('/verify', isAuthenticated, (req, res) => {
  if (req.payload) {
    console.log(req.payload)
    res.json(req.payload)
  }
  })

router.post("/login", async (req, res) => {
  //Check username
  const matchedUserArr = await User.find({ userName: req.body.userName });

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
      res.json({ "token": token, userName: currentUser.userName })
    } else {
      res.status(403).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT
/* router.post('/login', (req, res, next) => {
  console.log('backend req.body: ', req.body)
  const { password, email } = req.body;
  

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
        const { _id, email } = foundUser;
        console.log('password correct')
        
        // Create an object that will be set as the token payload
        const payload = { _id, email };
        console.log('payload: ', payload)

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

*/



module.exports = router