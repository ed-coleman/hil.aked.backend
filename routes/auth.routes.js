const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");



router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
    console.log("all users fetched successfully: ", allUsers);
  } catch (error) {
    console.log(error);
  }
});

// routes/auth.routes.js

// ... all imports stay unchanged

// POST /auth/signup  - Creates a new user in the database
router.post("/addUser", (req, res, next) => {
  const { email, password } = req.body;

  // Check if the email or password or name is provided as an empty string
  if (email === "" || password === "") {
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

      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post('/newUser', async (req, res, next) => {
  const body = req.body
  console.log(req.body)
  try {
    const user = await User.create({...body})
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;

// verify user

router.get("/verify", isAuthenticated, (req, res) => {
  if (req.payload) {
    console.log(req.payload);
    res.json(req.payload);
  }
});

router.post("/login", async (req, res) => {
  //Check username
  const matchedUserArr = await User.find({ email: req.body.email });
  console.log(
    "email: ",
    req.body.email,
    "password: ",
    req.body.password,
    "matchedUserArr: ",
    matchedUserArr
  );

  if (matchedUserArr.length) {
    const currentUser = matchedUserArr[0];
    console.log("Current User: ", currentUser);
    //Check password
    if (req.body.password === currentUser.password) {
      //Generate the JWT

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // makes sure the token will expire after a set time
          data: currentUser,
        },
        process.env.TOKEN_SECRET
      ); // adds a secret to the .env
      res.status(201);
      res.json({ token: token, email: currentUser.email });
    } else {
      res.status(403).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


module.exports = router;
