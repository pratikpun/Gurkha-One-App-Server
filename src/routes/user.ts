import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Teams } from "../entity/Teams";
import bcrypt from "bcrypt";
const authCheck = require("../authCheck");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const saltRounds = 10;

router.get("/", (req, res) => {
  res.send("This is a home page.");
});

// gets all users from the database
// router.get("/api/users", async (req, res, error) => {
//   const data = await getRepository(User).find();
//   res.send(data);
// });

// get specific user from the login textInput.
router.post("/api/login", async (req, res, error) => {
  // const user = {
  //   email: req.body.email,
  //   password: req.body.password,
  // };

  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;

  const data = await getRepository(User).findOne({
    email: user.email,
  });

  //this compares the requested password and the responded password from the database.
  // const validPassword = await bcrypt.compare(data.password, req.body.password);
  // console.log(validPassword);

  // logic for login, any error will cause data to be undefined.
  if (data === undefined) {
    // console.log("User not found!");
    res.send({
      data: {
        success: false,
        msg: "User not found!",
      },
    });
    return;
  } else {
    // compare password given from user and the hash from the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    console.log(validPassword);
    //comapre data.email and validPassword then log in
    if (data.email && validPassword) {
      //console.log("Successfully Logged in");
      const token = jwt.sign(
        {
          userEmail: data.email,
        },
        "secretKey",
        { expiresIn: "2d" }
      );
      res.send({
        data: {
          token: token,
          success: true,
          msg: "Successfully logged in!",
        },
      });
      return;
    }
  }

  //res.send(data);
});

// register user
router.post("/api/register", async (req, res) => {
  // const user = {
  //   firstName: req.body.firstName,
  //   email: req.body.email,
  //   password: req.body.password,
  //   confirmPassword: req.body.confirmPassword,
  // };

  let user = new User();
  // hash and salt the password
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
  // const hashPasswordString = hashPassword.toString();

  user.firstName = req.body.firstName;
  user.email = req.body.email;
  user.password = hashPassword;
  //console.log(hashPasswordString);

  // get userData in the User database
  const userData = getRepository(User);

  // Logic for checking if email already exists in database
  const userEmail = await userData.findOne({ email: user.email });
  console.log(userEmail);

  if (!userEmail) {
    const savedData = await userData.save(user);
    res.send({
      msg: "success",
    });
    return;
  }
  if (userEmail) {
    res.send({
      msg: "exist",
    });
    return;
  }

  // find - shows all the users in the database
  // findOne - shows a specific user in the database
  // const userInDatabase = await userData.findOne(savedData);

  // // send the response data from the database to the client(front-end)
  // res.send(userInDatabase);
});

router.get("/api/dashboard", authCheck, async (req, res, error) => {
  const data = await getRepository(Teams).find();
  res.send(data);
});

module.exports = router;
